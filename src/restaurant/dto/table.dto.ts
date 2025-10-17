import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsEnum,
  Min,
} from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ example: 'T1', description: 'Unique table number or name' })
  @IsString()
  tableNumber: string;

  @ApiProperty({ example: 4, description: 'Seating capacity of the table' })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: 'Near window', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '652d6e6d89b72a4fecd9a1a5',
    description: 'Restaurant ID (MongoDB ObjectId)',
  })
  @IsMongoId()
  restaurant: string;

  @ApiProperty({
    example: 'available',
    enum: ['available', 'reserved', 'occupied', 'maintenance'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['available', 'reserved', 'occupied', 'maintenance'])
  status?: string;

  @ApiProperty({
    example: 'indoor',
    enum: ['indoor', 'outdoor'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['indoor', 'outdoor'])
  tableType?: string;
}

export class UpdateTableDto extends PartialType(CreateTableDto) {}

export class QueryTableDto {
  @ApiPropertyOptional({ description: 'Search by table number' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ['available', 'reserved', 'occupied', 'maintenance'],
  })
  @IsOptional()
  @IsEnum(['available', 'reserved', 'occupied', 'maintenance'])
  status?: string;

  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ description: 'Limit per page', example: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
