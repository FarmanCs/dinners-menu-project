import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Restaurant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop()
  description?: string;

  @Prop()
  city?: string;

  @Prop()
  phone?: string;

  @Prop({ default: 'default.jpg' })
  logo?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ default: true })
  is_active: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
