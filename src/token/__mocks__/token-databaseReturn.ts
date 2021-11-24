import userStub from 'src/users/test/stubs/user.stub';
import { TokenDocument } from '../schemas/token.schema';

export const tokenDatabaseReturn = [
  {
    username: userStub.username,
    hash: 'hash',
    userId: userStub.userId,
  },
] as TokenDocument[];
