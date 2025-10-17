import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RestaurantMenu extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: [String], default: ['default-dish.jpg'] })
  images?: string[];

  @Prop({ default: true })
  is_available: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurant: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'MenuCategory', required: true })
  category: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MenuVariant' }], default: [] })
  variants: Types.ObjectId[];

  @Prop({ default: false })
  is_featured?: boolean;
}

export const RestaurantMenuSchema =
  SchemaFactory.createForClass(RestaurantMenu);
