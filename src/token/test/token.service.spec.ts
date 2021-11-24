import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import userStub from 'src/users/test/stubs/user.stub';
import { Token } from '../schemas/token.schema';
import { TokenRepository } from '../token.repository';
import { TokenService } from '../token.service';
import MockTokenRepository from '../__mocks__/token.repository';
import { TokenModel } from './support/token.model';

describe('TokenService', () => {
  let tokenService: TokenService;
  const tokenRepository = new MockTokenRepository();
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TokenService, TokenRepository, TokenModel],
    })
      .overrideProvider(TokenRepository)
      .useValue(tokenRepository)
      .compile();

    tokenService = moduleRef.get<TokenService>(TokenService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });

  describe('when findOne called', () => {
    let ret: Token;

    beforeEach(async () => {
      ret = await tokenService.findOne('hash');
    });

    it('should return a token', () => {
      expect(ret).toHaveProperty('hash');
    });

    it('should throw an error if token was not found', () => {
      expect(tokenService.findOne('throw an error')).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('when save called', () => {
    let ret: Token;

    it('should return a token', async () => {
      ret = await tokenService.save('hash', userStub.username, userStub.userId);
      expect(ret.hash).toEqual('hash');
    });

    it('should save if does not exists another token', async () => {
      ret = await tokenService.save('testing', 'username', 'userId');

      expect(ret).toEqual(null);
    });
  });
});
