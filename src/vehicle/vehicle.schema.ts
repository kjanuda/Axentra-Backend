import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop()
  userEmail: string;

  @Prop()
  deviceId: string;

  @Prop()
  name: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);