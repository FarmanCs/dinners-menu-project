import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiAcceptedResponse,
} from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // REGISTER
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User registered successfully.' })
  @ApiBadRequestResponse({
    description: 'Invalid input data or validation error.',
  })
  @ApiConflictResponse({ description: 'Email or phone number already exists.' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.adminService.register(createUserDto);
  }

  // LOGIN
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login as a user' })
  @ApiOkResponse({
    description: 'Login successful. Returns access & refresh tokens.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password.' })
  @ApiBadRequestResponse({
    description: 'Validation failed or missing fields.',
  })
  login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  // REFRESH TOKEN
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ description: 'Access token refreshed successfully.' })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token.' })
  @ApiBody({ type: RefreshTokenDto })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.adminService.refreshToken(refreshTokenDto.refreshToken);
  }

  // VIEW PROFILE
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get logged-in user profile' })
  @ApiOkResponse({ description: 'Profile fetched successfully.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or invalid JWT token.',
  })
  getProfile(@Request() req) {
    return this.adminService.getProfile(req.user.sub);
  }

  // CREATE USER (Admin only)
  @Post('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiConflictResponse({ description: 'Email or phone number already exists.' })
  @ApiBadRequestResponse({
    description: 'Validation failed or missing fields.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.adminService.create(createUserDto);
  }

  // GET ALL USERS
  @Get('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users with pagination and filters' })
  @ApiOkResponse({ description: 'Users fetched successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access.' })
  findAll(@Query() queryDto: QueryUserDto) {
    return this.adminService.findAll(queryDto);
  }

  // GET USER BY ID
  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiOkResponse({ description: 'User found successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access.' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  // UPDATE USER
  @Patch('users/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user details by ID' })
  @ApiAcceptedResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiConflictResponse({ description: 'Email or phone number already exists.' })
  @ApiBadRequestResponse({ description: 'Invalid user ID or input data.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.update(id, updateUserDto);
  }

  // DELETE USER
  @Delete('users/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Invalid user ID.' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
