import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RestaurantTable } from '../../../models/resturent/restaurant-table';
import {
  QueryTableDto,
  CreateTableDto,
  UpdateTableDto,
} from '../dto/table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(RestaurantTable.name)
    private readonly tableModel: Model<RestaurantTable>,
  ) {}

  //  Create a new table
  async create(createTableDto: CreateTableDto) {
    const table = await this.tableModel.create(createTableDto);
    return table;
  }

  //  Get all tables with pagination + filters
  async findAll(queryDto: QueryTableDto) {
    const { page = 1, limit = 10, search, status } = queryDto;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.tableNumber = { $regex: search, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    const [tables, total] = await Promise.all([
      this.tableModel
        .find(query)
        .populate('restaurant')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.tableModel.countDocuments(query),
    ]);

    return {
      tables,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  //  Get single table
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Table ID');
    }

    const table = await this.tableModel
      .findById(id)
      .populate('restaurant')
      .exec();

    if (!table) throw new NotFoundException('Table not found');
    return table;
  }

  //  Update table
  async update(id: string, updateDto: UpdateTableDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Table ID');
    }

    const updated = await this.tableModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('restaurant');

    if (!updated) throw new NotFoundException('Table not found');
    return updated;
  }

  //  Delete table
  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Table ID');
    }

    const deleted = await this.tableModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Table not found');

    return { message: 'Table deleted successfully' };
  }
}
