import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Permission' }],
    required: true,
  })
  permissions: Types.ObjectId[];

  @Prop({ default: true })
  is_active: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
