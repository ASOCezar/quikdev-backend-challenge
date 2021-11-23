import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: String })
  userId: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  username: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
