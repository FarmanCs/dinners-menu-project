import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TableStatus = 'available' | 'reserved' | 'occupied' | 'maintenance';

@Schema({ timestamps: true })
export class RestaurantTable extends Document {
  @Prop({ required: true })
  tableNumber: string;

  @Prop({ required: true, min: 1 })
  capacity: number;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurant: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['available', 'reserved', 'occupied', 'maintenance'],
    default: 'available',
  })
  status: TableStatus;

  @Prop({ default: null })
  qrCode?: string;

  @Prop({ enum: ['indoor', 'outdoor'], default: 'indoor' })
  tableType?: string;
}

export const RestaurantTableSchema =
  SchemaFactory.createForClass(RestaurantTable);
