import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '../dto/permission.dto';
import { Permission } from '../../../models/user/permissionSchema';

@ApiTags('Admin - Permissions')
@Controller('admin/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'Permission created successfully.' })
  async create(@Body() dto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'List of permissions returned.' })
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permission by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the permission' })
  async findOne(@Param('id') id: string): Promise<Permission> {
    const permission = await this.permissionService.findOne(id);
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update permission by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the permission' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete permission by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ID of the permission' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.permissionService.remove(id);
    return { message: 'Permission deleted successfully' };
  }
}
