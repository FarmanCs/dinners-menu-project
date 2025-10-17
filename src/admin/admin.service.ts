import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from '../../models/user/userSchema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { QueryUserDto } from './dto/query-user.dto';

// to define a proper payload
interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Hash a plain password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  //  Compare plain password with hashed password
  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  //  Generate JWT access + refresh tokens
  private async generateTokens(userId: string, email: string) {
    const payload: JwtPayload = { sub: userId, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET')!,
      expiresIn:
        this.configService.get<string>('JWT_EXPIRATION') || ('15d' as any),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
      expiresIn:
        this.configService.get<string>('JWT_REFRESH_EXPIRATION') ||
        ('30d' as any),
    });

    return { accessToken, refreshToken };
  }

  //  Register new user
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) throw new ConflictException('Email already exists');

    if (createUserDto.phone) {
      const existingPhone = await this.userModel.findOne({
        phone: createUserDto.phone,
      });
      if (existingPhone)
        throw new ConflictException('Phone number already exists');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      is_active: true,
    });

    const tokens = await this.generateTokens(user._id.toString(), user.email);
    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, ...tokens };
  }

  //  Login user
  async login(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.is_active) throw new UnauthorizedException('Account is inactive');

    if (!user.password) throw new UnauthorizedException('Password not set');
    const isPasswordValid = await this.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user._id.toString(), user.email);
    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, ...tokens };
  }

  //  Refresh token
  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
        },
      );

      const user = await this.userModel.findById(payload.sub);
      if (!user || !user.is_active)
        throw new UnauthorizedException('User not found or inactive');

      return this.generateTokens(user._id.toString(), user.email);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  //  Admin: Create user
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) throw new ConflictException('Email already exists');

    const hashedPassword = await this.hashPassword(createUserDto.password);

    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      is_active: true,
    });
  }

  //  Get all users (pagination + search)
  async findAll(queryDto: QueryUserDto) {
    const { page = 1, limit = 10, search, role } = queryDto;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role) query.role = role;

    const [users, total] = await Promise.all([
      this.userModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.userModel.countDocuments(query),
    ]);

    return {
      users,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  //  Find one user
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID');
    const user = await this.userModel.findById(id).populate('role');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  //  Update user
  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('USER DTO FOR UPDATES:', updateUserDto);
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID');

    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({
        email: updateUserDto.email,
        _id: { $ne: id },
      });
      if (existingUser) throw new ConflictException('Email already exists');
    }

    // if (updateUserDto.phone) {
    //   const existingPhone = await this.userModel.findOne({
    //     phone: updateUserDto.phone,
    //     _id: { $ne: id },
    //   });
    //   if (existingPhone)
    //     throw new ConflictException('Phone number already exists');
    // }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  //  Delete user
  async remove(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID');

    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User not found');

    return { message: 'User deleted successfully' };
  }

  //  Get profile
  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
