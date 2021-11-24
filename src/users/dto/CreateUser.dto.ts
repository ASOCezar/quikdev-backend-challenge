import { IsNotEmpty, IsNotEmptyObject, Matches } from 'class-validator';

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

  @IsNotEmptyObject()
  address: {
    state?: string;
    city?: string;
    cep?: string;
    roadName?: string;
    houseNumber?: string;
  };

  @IsNotEmpty()
  @Matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/gm)
  primaryPhone: string;

  @IsNotEmpty()
  description: string;
}
