import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getUserById() {
    return 'It Should Query and Return an User';
  }
  async createUser() {
    return 'It Should Create an User';
  }

  async updateUser() {
    return 'It Should Update an User';
  }

  async deleteUser() {
    return 'It Should Delete a User';
  }
}
