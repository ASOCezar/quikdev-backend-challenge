import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Token, TokenDocument } from './schemas/token.schema';

@Injectable()
export class TokenRepository extends EntityRepository<TokenDocument> {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {
    super(tokenModel);
  }
}
