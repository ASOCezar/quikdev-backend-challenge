import { MockModel } from 'src/database/test/support/mock.model';
import { Token } from 'src/token/schemas/token.schema';
import { tokenStub } from '../stub/tokenStub';

export class TokenModel extends MockModel<Token> {
  protected entityStub = tokenStub;
}
