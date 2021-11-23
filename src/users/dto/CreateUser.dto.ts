import { IsNotEmpty, Matches } from 'class-validator';
import { AddressType } from '../schemas/user.schema';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Matches(/\d{2}\/\d{2}\/\d{4}/gm)
  birthdate: string;

  @IsNotEmpty()
  address: AddressType;

  @IsNotEmpty()
  @Matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/gm)
  primaryPhone: string;

  @IsNotEmpty()
  description: string;
}
