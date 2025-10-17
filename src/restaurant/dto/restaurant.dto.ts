import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsEmail,
} from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Foodie Paradise' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'contact@foodieparadise.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'Best restaurant in town', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Lahore', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: '+923001234567', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'restaurant_logo.png', required: false })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({ example: '652c7a893d8e3424d3f1c4f2' })
  @IsMongoId()
  owner: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
