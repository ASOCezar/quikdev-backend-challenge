import { Matches } from 'class-validator';

export type UpdateAddressType = {
  state?: string;
  city?: string;
  cep?: string;
  roadName?: string;
  houseNumber?: string;
};

export class UpdateUserDTO {
  name?: string;
  username?: string;
  newPassword?: string;
  confirmPassword?: string;
  oldPassword?: string;

  @Matches(/\d{2}\/\d{2}\/\d{4}/gm)
  birthdate?: string;

  address?: UpdateAddressType;

  @Matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/gm)
  primaryPhone?: string;
  description?: string;
}
