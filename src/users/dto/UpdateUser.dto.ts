export type UpdateAddressType = {
  state?: string;
  city?: string;
  cep?: string;
  roadName?: string;
  houseNumber?: string;
};

export interface UpdateUserDTO {
  name?: string;
  username?: string;
  newPassword?: string;
  confirmPassword?: string;
  oldPassword?: string;
  birthdate?: string;
  address?: UpdateAddressType;
  primaryPhone?: string;
  description?: string;
}
