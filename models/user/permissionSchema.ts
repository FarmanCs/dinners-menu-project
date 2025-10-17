import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Permission extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  key: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ default: true })
  is_active: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
