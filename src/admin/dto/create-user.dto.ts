import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
  IsMongoId,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'User password (min 6 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

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

  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Role ID' })
  @IsNotEmpty()
  @IsMongoId()
  role: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
