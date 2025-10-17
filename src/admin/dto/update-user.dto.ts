import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  Matches,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'User full name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'User password (min 6 characters)',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'Phone number (10-15 digits)',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10,15}$/, { message: 'Please enter a valid phone number' })
  phone?: string;

  @ApiPropertyOptional({
    example: '123 Main St, City',
    description: 'User address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'user-profile.jpg',
    description: 'User profile image',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'Role ID',
  })
  @IsOptional()
  @IsMongoId()
  role?: string;

  @ApiPropertyOptional({ example: true, description: 'User active status' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
