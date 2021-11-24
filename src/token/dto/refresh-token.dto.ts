import { IsNotEmpty } from 'class-validator';

export default class RefreshTokenDTO {
  @IsNotEmpty()
  oldToken: string;
}
