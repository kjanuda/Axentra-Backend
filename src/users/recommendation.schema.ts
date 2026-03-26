import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecommendationDocument = Recommendation & Document;

@Schema({ timestamps: true })
export class Recommendation {
  @Prop()
  userEmail: string; // who this is about

  @Prop()
  text: string; // recommendation text

  @Prop()
  authorName: string;

  @Prop()
  authorTitle: string; // university / company

  @Prop()
authorPhoto: string;
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);