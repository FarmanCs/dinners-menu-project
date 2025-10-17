import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from 'models/resturent/restaurant';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const created = new this.restaurantModel(createRestaurantDto);
    return created.save();
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().populate('owner').exec();
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel
      .findById(id)
      .populate('owner')
      .exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }
    return restaurant;
  }

  async update(
    id: string,
    updateDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const updated = await this.restaurantModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.restaurantModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }
    return { message: 'Restaurant deleted successfully' };
  }
}
