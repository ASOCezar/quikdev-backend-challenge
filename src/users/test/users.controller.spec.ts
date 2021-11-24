import { Test } from '@nestjs/testing';
import { AuthService, LoginResponse } from 'src/auth/auth.service';
import { MockAuthService } from 'src/auth/__mocks__/auth.service';
import { User } from '../schemas/user.schema';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { MockUsersService } from '../__mocks__/users.service';
import userStub from './stubs/user.stub';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, AuthService],
    })
      .overrideProvider(UsersService)
      .useValue(MockUsersService)
      .overrideProvider(AuthService)
      .useValue(MockAuthService)
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getAllUsers', () => {
    let retUsers: User[];
    beforeEach(async () => {
      retUsers = await usersController.getAllUsers();
    });
    it('should get an array of user', async () => {
      expect(retUsers[0]).toEqual(userStub);
    });
    it('should call UsersService', () => {
      expect(usersService.find).toBeCalled();
    });
  });

  describe('getUser', () => {
    let retUser: User;
    beforeEach(async () => {
      retUser = await usersController.getUser(userStub.userId);
    });
    it('should get an user', async () => {
      expect(retUser).toEqual(userStub);
    });
    it('should call UsersService', () => {
      expect(usersService.getUserById).toBeCalledWith(userStub.userId);
    });
  });
  describe('createUser', () => {
    let retUser: User;
    beforeEach(async () => {
      retUser = await usersController.createUser(userStub);
    });
    it('should create a new user', () => {
      expect(retUser).toEqual(userStub);
    });
    it('should call UsersService', () => {
      expect(usersService.createUser).toBeCalledWith(userStub);
    });
  });
  describe('login', () => {
    let retLogin: LoginResponse;
    beforeEach(async () => {
      retLogin = await usersController.login({
        username: 'GGB',
        password: 'teste',
      });
    });
    it('should login a user', () => {
      expect(retLogin).toEqual({ user: userStub, access_token: 'hash' });
    });
    it('should call AuthService', () => {
      expect(authService.login).toBeCalled();
      expect(authService.validateUser).toBeCalled();
    });
  });
  describe('updateUser', () => {
    let retUser: User;
    beforeEach(async () => {
      retUser = await usersController.updateUser(
        { user: userStub, access_token: 'hash' },
        {
          username: 'changing username',
        },
      );
    });
    it('should update a user', () => {
      expect(retUser).toEqual(userStub);
    });
    it('should call UsersService', () => {
      expect(usersService.updateUser).toBeCalledWith(userStub.userId, {
        username: 'changing username',
      });
    });
  });
  describe('deleteUser', () => {
    beforeEach(async () => {
      await usersController.deleteUser({
        user: userStub,
        access_token: 'hash',
      });
    });
    it('should call UsersService', () => {
      expect(usersService.deleteUser).toBeCalledWith(userStub.userId);
    });
  });
});
