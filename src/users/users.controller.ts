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
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param() id: string) {
    return 'Should Return a User';
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return 'Should Create a User';
  }

  @Put(':id')
  async updateUser(@Param() id: string, @Body() data: UpdateUserDTO) {
    return 'Should Update a User';
  }

  @Delete(':id')
  async deleteUser(@Param() id: string) {
    return 'Should Delete a User';
  }
}
