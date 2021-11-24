import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { MockModel } from 'src/database/test/support/mock.model';
import RefreshTokenDTO from '../dto/refresh-token.dto';
import { Token, TokenDocument } from '../schemas/token.schema';
import { TokenRepository } from '../token.repository';
import { tokenStub } from './stub/tokenStub';
import { TokenModel } from './support/token.model';

describe('TokenRepository', () => {
  let tokenRepository: TokenRepository;
  let tokenModel: TokenModel;
  let tokenFilterQuery: FilterQuery<TokenDocument>;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TokenRepository,
        {
          provide: getModelToken(Token.name),
          useClass: TokenModel,
        },
      ],
    }).compile();

    tokenRepository = moduleRef.get<TokenRepository>(TokenRepository);
    tokenModel = moduleRef.get<TokenModel>(getModelToken(Token.name));
    tokenFilterQuery = {
      userId: tokenStub.userId,
    };
  });

  it('should be defined', () => {
    expect(tokenRepository).toBeDefined();
    expect(tokenModel).toBeDefined();
    expect(tokenFilterQuery).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let token: TokenDocument;

      beforeEach(async () => {
        jest.spyOn(tokenModel, 'findOne');
        token = await tokenRepository.findOne(tokenFilterQuery);
      });

      it('should call the tokenModel', () => {
        expect(tokenModel.findOne).toBeCalledWith(tokenFilterQuery, {
          _id: 0,
          __v: 0,
        });
      });

      it('should return a token', () => {
        expect(token).toEqual(tokenStub);
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let token: TokenDocument;
      let updatetokenData: RefreshTokenDTO;

      beforeEach(async () => {
        updatetokenData = {
          oldToken: tokenStub.hash,
        };
        jest.spyOn(tokenModel, 'findOneAndUpdate');
        token = await tokenRepository.findOneAndUpdate(
          tokenFilterQuery,
          updatetokenData,
        );
      });

      it('should call the tokenModel', () => {
        expect(tokenModel.findOneAndUpdate).toBeCalledWith(
          tokenFilterQuery,
          updatetokenData,
          {
            new: true,
          },
        );
      });

      it('should return a token', () => {
        expect(token).toEqual(tokenStub);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let token: TokenDocument;
      let saveSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(MockModel.prototype, 'create');
        token = await tokenRepository.create(tokenStub);
      });

      it('should call the tokenModel', () => {
        expect(saveSpy).toHaveBeenCalled();
      });

      it('should return a token', () => {
        expect(token).toEqual(tokenStub);
      });
    });
  });
});
