import { AddressType } from '../schemas/user.schema';

export interface CreateUserDTO {
  name: string;
  username: string;
  password: string;
  birthdate: string;
  address: AddressType;
  primaryPhone: string;
  description: string;
}
