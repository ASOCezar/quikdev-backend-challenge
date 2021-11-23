import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenController } from './token.controller';
import { TokenRepository } from './token.repository';

import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [TokenController],
  providers: [TokenRepository, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
