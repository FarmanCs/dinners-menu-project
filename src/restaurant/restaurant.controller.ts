import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiCreatedResponse({ description: 'Restaurant created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({
    status: 200,
    description: 'List of restaurants returned successfully',
  })
  async findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Restaurant returned successfully' })
  @ApiNotFoundResponse({ description: 'Restaurant not found' })
  async findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Restaurant updated successfully' })
  @ApiNotFoundResponse({ description: 'Restaurant not found' })
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Restaurant deleted successfully' })
  @ApiNotFoundResponse({ description: 'Restaurant not found' })
  async remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
