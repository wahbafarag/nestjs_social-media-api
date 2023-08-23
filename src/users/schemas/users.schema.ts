import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

export class Address {
  Country: string;
  City: string;
  Street: string;
  ZipCode: string;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, message: 'Name is required' })
  name: string;

  @Prop({
    type: String,
    required: [true, 'username is required'],
    unique: [true, 'username already exists'],
  })
  username: string;

  @Prop({
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    message: 'Password is required',
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Phone is required'],
    unique: [true, 'Phone already exists'],
  })
  phone: string;

  @Prop({ required: true, message: 'Address is required' })
  address: Address;

  @Prop({ type: Number, required: true, message: 'Age is required' })
  age: number;

  @Prop({
    default: UserRoles.USER,
  })
  role: UserRoles;

  // @Prop({ type: Boolean, default: false })
  // isDeleted: boolean; // delete it permanently , user no longer exists

  @Prop({ type: Boolean, default: true })
  isActive: boolean; // deactivate the user for a period of time ,  activate it again

  @Prop({ type: String })
  passwordResetToken: string;

  @Prop({ type: Date })
  passwordResetExpires: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
userSchema.index({ email: 1, username: 1, phone: 1 }, { unique: true });
userSchema.methods.createPasswordResetToken = function () {};
