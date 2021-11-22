import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './__mocks__/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
