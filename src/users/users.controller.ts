import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(id);

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

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.usersService.updateUser(id, data);

    return user.toJSON({
      transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
