import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export type UserDocument = User & Document;

export type AddressType = {
  state: string;
  city: string;
  cep: string;
  roadName: string;
  houseNumber: string;
};

@Schema()
export class User {
  @Prop({ type: String, default: uuidV4() })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  birthdate: string;

  @Prop({
    required: true,
    type: {
      state: String,
      city: String,
      cep: String,
      roadName: String,
      houseNumber: String,
    },
  })
  adress: AddressType;

  @Prop({ required: true })
  primaryPhone: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, default: Date.now })
  created_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
