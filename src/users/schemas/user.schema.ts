import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export type UserDocment = User & Document;

export type AddressType = {
  state: string;
  city: string;
  cep: string;
  roadName: string;
  houseNumber: string;
};

@Schema()
export class User {
  @Prop({ type: String, default: uuidV4 })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  birthdate: string;

  @Prop({ required: true })
  adress: AddressType;

  @Prop({ required: true })
  primaryPhone: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, default: Date.now, immutable: true })
  created_at: string;
}
