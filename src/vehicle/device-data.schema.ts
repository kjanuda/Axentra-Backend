import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDataDocument = DeviceData & Document;

@Schema({ timestamps: true })
export class DeviceData {
  @Prop()
  deviceId: string;

  @Prop()
  status: string;

  @Prop()
  temperature: number;

  @Prop()
  location: string;
}

export const DeviceDataSchema = SchemaFactory.createForClass(DeviceData);