import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  })
  email: string;

  @Prop({ select: false })
  password?: string;

  @Prop({
    match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'],
  })
  phone?: string;

  @Prop({ default: false })
  is_phoneVerified: boolean;

  @Prop({ trim: true })
  address?: string;

  @Prop({ default: 'default-user.jpg' })
  image?: string;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role: Types.ObjectId;

  @Prop({ default: true })
  is_active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });
