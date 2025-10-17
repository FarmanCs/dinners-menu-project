import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class MenuVariant extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: true })
  is_available: boolean;

  @Prop({ type: Types.ObjectId, ref: 'RestaurantMenu', required: true })
  menuItem: Types.ObjectId;
}

export const MenuVariantSchema = SchemaFactory.createForClass(MenuVariant);
