import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  ipAddress: string;

  @Prop()
  photo: string;

  @Prop()
university: string;

@Prop()
company: string;

@Prop({ default: "user" })
role: string; // "user" or "recommender"
}

export const UserSchema = SchemaFactory.createForClass(User);