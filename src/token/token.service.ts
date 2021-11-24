import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Token, TokenDocument } from './schemas/token.schema';

import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async findOne(hash: string): Promise<Token> {
    const validToken = await this.tokenRepository.findOne({ hash: hash });

    if (!validToken) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, message: 'Invalid or Expired Token' },
        HttpStatus.FORBIDDEN,
      );
    }

    return validToken;
  }

  async save(
    hash: string,
    username: string,
    userId: string,
  ): Promise<TokenDocument> {
    const savedToken = await this.tokenRepository.findOne({ username });

    if (!savedToken) {
      await this.tokenRepository.create({
        hash,
        username,
        userId,
      });
    } else {
      await this.tokenRepository.findOneAndUpdate(
        { userId: savedToken.userId },
        {
          hash,
        },
      );
    }

    return savedToken;
  }
}
