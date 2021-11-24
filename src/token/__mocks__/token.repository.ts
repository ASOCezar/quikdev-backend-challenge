import { TokenDocument } from '../schemas/token.schema';
import { tokenDatabaseReturn } from './token-databaseReturn';

type DataType = {
  userId: string;
  username: string;
  hash: string;
};

type RefreshTokenType = {
  hash: string;
};

export default class MockTokenRepository {
  public findOne({ username, hash }: DataType): TokenDocument | null {
    const token = tokenDatabaseReturn.filter((data: TokenDocument) => {
      return username ? data.username === username : hash && data.hash === hash;
    })[0];

    if (!token) {
      return null;
    }

    return token;
  }

  public create(token: TokenDocument): TokenDocument {
    tokenDatabaseReturn.push(token);

    return token;
  }

  public findOneAndUpdate({ userId }: DataType, { hash }: RefreshTokenType) {
    return tokenDatabaseReturn.filter((data) => {
      if (data.userId === userId) {
        data = Object.assign(hash, data);
        return data;
      }
    })[0];
  }
}
