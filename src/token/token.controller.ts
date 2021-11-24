import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import RefreshTokenDTO from './dto/refresh-token.dto';
import { Token } from './schemas/token.schema';
import { TokenService } from './token.service';

type DataType = {
  hash: string;
};

@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async getUser(@Body() { hash }: DataType): Promise<User> {
    const existsToken = await this.tokenService.findOne(hash);

    const user = await this.userService.getUserById(existsToken.userId);

    return user.toJSON({
      transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  @Put('refresh')
  async refresh(@Body() data: RefreshTokenDTO): Promise<Token> {
    const existsToken = await this.tokenService.findOne(data.oldToken);

    const user = await this.userService.getUserById(existsToken.userId);

    const { access_token } = await this.authService.login(user);

    return await this.tokenService.save(
      access_token,
      user.username,
      user.userId,
    );
  }
}
