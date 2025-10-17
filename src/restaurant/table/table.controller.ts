import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TableService } from './table.service';
import {
  CreateTableDto,
  QueryTableDto,
  UpdateTableDto,
} from '../dto/table.dto';

@ApiTags('Restaurant - Tables')
@Controller('restaurant/tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new restaurant table' })
  @ApiResponse({ status: 201, description: 'Table created successfully' })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all restaurant tables with filters' })
  findAll(@Query() query: QueryTableDto) {
    return this.tableService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific restaurant table by ID' })
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update restaurant table details' })
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(id, updateTableDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant table' })
  remove(@Param('id') id: string) {
    return this.tableService.remove(id);
  }
}
