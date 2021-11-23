import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { TokenService } from 'src/token/token.service';

import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

type LoginResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByUsername(username);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User Not Found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid Password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toJSON({
      transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  async login(user: User): Promise<LoginResponse> {
    const payload = { name: user.name, email: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);

    await this.tokenService.save(token, user.username);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
