import { tokenStub } from '../test/stub/tokenStub';

export const MockTokenService = {
  findOne: jest.fn().mockResolvedValue(tokenStub),
  save: jest.fn().mockResolvedValue(tokenStub),
};
