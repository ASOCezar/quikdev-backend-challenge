import { IsNotEmpty } from 'class-validator';

export default class LoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
