import { Test } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { MockUsersService } from '../__mocks__/users.service';
import userStub from './stubs/user.stub';

describe('UsersController', () => {
  let usersController: UsersController;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(MockUsersService)
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('when getUser called', () => {
    let user: User;

    beforeEach(async () => {
      user = await usersController.getUser(userStub.userId);
    });

    it('should call UsersService', () => {
      expect(MockUsersService.getUserById).toHaveBeenCalledWith(
        userStub.userId,
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub);
    });
  });

  describe('when createUser called', () => {
    let user: User;

    beforeEach(async () => {
      user = await usersController.createUser(userStub);
    });

    it('should call UsersService', () => {
      expect(MockUsersService.createUser).toHaveBeenCalledWith(userStub);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub);
    });
  });

  describe('when updateUser called', () => {
    let user: User;

    beforeEach(async () => {
      user = await usersController.updateUser(userStub.userId, {
        name: 'teste',
      });
    });

    it('should call UsersService', () => {
      expect(MockUsersService.updateUser).toHaveBeenCalledWith(
        userStub.userId,
        {
          name: 'teste',
        },
      );
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub);
    });
  });

  describe('when deleteUser called', () => {
    beforeEach(async () => {
      await usersController.deleteUser(userStub.userId);
    });

    it('should call UsersService', () => {
      expect(MockUsersService.deleteUser).toHaveBeenCalledWith(userStub.userId);
    });
  });
});
