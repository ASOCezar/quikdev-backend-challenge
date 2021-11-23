import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDTO } from './dto/CreateUser.dto';
import jwtDecode from 'src/utils/jwt-decode';
import LoginDTO from './dto/Login.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() request: Request): Promise<User> {
    const { userId } = jwtDecode(request.headers['authorization']);

    const user = await this.usersService.getUserById(userId);

    return user.toJSON({
      transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<User> {
    const user = await this.usersService.createUser(data);

    return user.toJSON({
      transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  @Post('login')
  async login(@Body() data: LoginDTO) {
    const { username, password } = data;

    const user = await this.authService.validateUser(username, password);

    const { access_token } = await this.authService.login(user);

    return {
      user,
      access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(
    @Request() request: Request,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    const { userId } = jwtDecode(request.headers['authorization']);

    const user = await this.usersService.updateUser(userId, data);

    return user.toJSON({
      transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() request: Request): Promise<void> {
    const { userId } = jwtDecode(request.headers['authorization']);

    return await this.usersService.deleteUser(userId);
  }
}
