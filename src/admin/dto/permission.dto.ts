import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'Create User',
    description: 'The name of the permission',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'create_user',
    description: 'Unique key used in code-level checks',
  })
  @IsString()
  key: string;

  @ApiProperty({
    example: 'Allows creation of a new user account',
    description: 'Brief description of what this permission allows',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the permission is active',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;
}

export class UpdatePermissionDto {
  @ApiProperty({ example: 'Edit User', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'edit_user', required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({ example: 'Allows editing existing users', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
