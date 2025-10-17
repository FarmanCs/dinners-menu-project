import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from '../../../models/user/permissionSchema';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '../dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}

  async create(dto: CreatePermissionDto): Promise<Permission> {
    const exists = await this.permissionModel.findOne({ key: dto.key });
    if (exists) {
      throw new BadRequestException('Permission key already exists');
    }
    const created = new this.permissionModel(dto);

    return created.save();
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Permission | null> {
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: string, dto: UpdatePermissionDto): Promise<Permission> {
    const updated = await this.permissionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Permission not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.permissionModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Permission not found');
  }
}
