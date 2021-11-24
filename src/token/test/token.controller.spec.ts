import { Test } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token.service';
import { TokenController } from '../token.controller';
import { MockTokenService } from '../__mocks__/token.service';
import { MockUsersService } from 'src/users/__mocks__/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { MockAuthService } from 'src/auth/__mocks__/auth.service';
import userStub from 'src/users/test/stubs/user.stub';
import { Token } from '../schemas/token.schema';

describe('TokenController', () => {
  let tokenService: TokenService;
  let usersService: UsersService;
  let tokenController: TokenController;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [TokenService, UsersService, AuthService],
    })
      .overrideProvider(TokenService)
      .useValue(MockTokenService)
      .overrideProvider(UsersService)
      .useValue(MockUsersService)
      .overrideProvider(AuthService)
      .useValue(MockAuthService)
      .compile();

    tokenService = moduleRef.get<TokenService>(TokenService);
    usersService = moduleRef.get<UsersService>(UsersService);
    tokenController = moduleRef.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(tokenController).toBeDefined();
    expect(tokenService).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('when getUser called', () => {
    let user: User;

    beforeEach(async () => {
      user = await tokenController.getUser({ hash: 'hash' });
    });

    it('should call usersService', () => {
      expect(usersService.getUserById).toBeCalled();
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub);
    });
  });

  describe('when refresh called', () => {
    let ret: Token;

    beforeEach(async () => {
      ret = await tokenController.refresh({ oldToken: 'hash' });
    });

    it('should call token and users service', () => {
      expect(usersService.getUserById).toBeCalled();
      expect(tokenService.findOne).toBeCalledWith('hash');
    });

    it('should return a token', () => {
      expect(ret).toHaveProperty('hash');
    });
  });
});
