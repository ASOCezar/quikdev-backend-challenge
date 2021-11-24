import { Token } from 'src/token/schemas/token.schema';
import userStub from 'src/users/test/stubs/user.stub';

export const tokenStub = new Token();

tokenStub.hash = 'hash';
tokenStub.userId = userStub.userId;
tokenStub.username = userStub.username;
