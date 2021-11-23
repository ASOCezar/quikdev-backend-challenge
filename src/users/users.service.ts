import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.usersRepository.findOne({ userId: id });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async createUser(data: CreateUserDTO): Promise<UserDocument> {
    let newUser: User;

    const userExists = await this.usersRepository.findOne({
      username: data.username,
    });

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          messasge: 'This username is already in use',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = (await hash(data.password, 8)) as string;

    newUser.address = data.address;
    newUser.name = data.name;
    newUser.username = data.username;
    newUser.description = data.description;
    newUser.password = hashedPassword;
    newUser.primaryPhone = data.primaryPhone;
    newUser.birthdate = data.birthdate;

    return await this.usersRepository.create(newUser);
  }

  async updateUser(userId: string, data: UpdateUserDTO): Promise<UserDocument> {
    const user = await this.usersRepository.findOne({ userId });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (data.name) {
      user.name = data.name;
    }

    if (data.username) {
      const usernameExists = await this.usersRepository.findOne({
        username: data.username,
      });

      if (usernameExists.userId !== user.userId) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'This username is already in use',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      user.username = data.username;
    }

    if (data.address) {
      if (data.address.cep) {
        user.address.cep = data.address.cep;
      }

      if (data.address.city) {
        user.address.city = data.address.city;
      }

      if (data.address.houseNumber) {
        user.address.houseNumber = data.address.houseNumber;
      }

      if (data.address.roadName) {
        user.address.roadName = data.address.roadName;
      }

      if (data.address.state) {
        user.address.state = data.address.state;
      }
    }

    if (data.username) {
      user.username = data.username;
    }

    if (data.description) {
      user.description = data.description;
    }

    if (data.newPassword) {
      if (data.newPassword !== data.confirmPassword) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Passwords does not match',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!data.oldPassword) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: 'Old password is required',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const checkPassword = await compare(data.oldPassword, user.password);

      if (!checkPassword) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: 'Old password do not match',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      user.password = data.newPassword;
    }

    return await this.usersRepository.findOneAndUpdate({ userId }, user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.usersRepository.delete({ userId });
  }
}
