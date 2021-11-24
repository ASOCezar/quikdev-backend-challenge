import { HttpException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { TokenService } from 'src/token/token.service';
import { MockTokenService } from 'src/token/__mocks__/token.service';
import userStub from 'src/users/test/stubs/user.stub';
import { UsersService } from 'src/users/users.service';
import { MockUsersService } from 'src/users/__mocks__/users.service';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../jwt.strategy';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: 'secretKey',
          signOptions: {
            expiresIn: '1d',
          },
        }),
      ],
      providers: [UsersService, TokenService, JwtStrategy, AuthService],
    })
      .overrideProvider(UsersService)
      .useValue(MockUsersService)
      .overrideProvider(TokenService)
      .useValue(MockTokenService)
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    tokenService = moduleRef.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(tokenService).toBeDefined();
  });

  describe('when validateUser called', () => {
    let ret: any;

    beforeEach(async () => {
      ret = await authService.validateUser(userStub.username, 'teste');
    });

    it('should throw an error if password does not match', () => {
      expect(
        authService.validateUser(userStub.username, 'throw an error'),
      ).rejects.toThrow(HttpException);
    });

    it('should return a user', () => {
      expect(ret).toEqual(userStub);
    });

    it('should call UsersService', () => {
      expect(usersService.getUserByUsername).toBeCalledWith(userStub.username);
    });
  });

  describe('when login called', () => {
    let ret: any;

    beforeEach(async () => {
      ret = await authService.login(userStub);
    });

    it('should return a user and an access token', () => {
      expect(ret).toHaveProperty('access_token');
      expect(ret).toHaveProperty('user');
    });

    it('should call Token Service', () => {
      expect(tokenService.save).toBeCalled();
    });
  });
});
