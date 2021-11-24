import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import MockUserRepository from '../__mocks__/users.repository';
import userStub from './stubs/user.stub';
import { UserModel } from './support/user.model';

describe('UsersService', () => {
  let usersService: UsersService;
  const mockUserRepository = new MockUserRepository();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, UsersRepository, UserModel],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUserRepository)
      .compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return a array of users', async () => {
      const users = await usersService.find();

      expect(users[0]).toEqual(userStub);
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      const user = await usersService.getUserById(userStub.userId);

      expect(user).toEqual(userStub);
    });

    it('should return a error if user not found', async () => {
      expect(usersService.getUserById('its throw an error')).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      const user = await usersService.getUserByUsername(userStub.username);

      expect(user).toEqual(userStub);
    });

    it('should return a error if user not found', async () => {
      expect(
        usersService.getUserByUsername('its throw an error'),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('create', () => {
    it('should create and return the created user', async () => {
      const data = {
        username: 'new user',
      };

      const user = await usersService.createUser(Object.assign(userStub, data));

      expect(user.username).toEqual('new user');
      expect(user.password).not.toEqual(userStub.password);
    });

    it('should not to create two users with same username', async () => {
      expect(() => usersService.createUser(userStub)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('update', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should not save two users with same username', () => {
      expect(
        usersService.updateUser('107642fc-4ba41-11ec-81d3-0242ac130003', {
          username: 'GGB',
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an error if user not found', () => {
      expect(
        usersService.updateUser('invalid userId', { name: 'testing' }),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an error if user wants to change password but dont send old password', () => {
      expect(
        usersService.updateUser(userStub.userId, {
          newPassword: 'testing',
          confirmPassword: 'testing',
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an error if old password does not match', () => {
      expect(
        usersService.updateUser(userStub.userId, {
          newPassword: 'testing',
          confirmPassword: 'testing',
          oldPassword: 'testing',
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should throw an error if old password does not match', () => {
      expect(
        usersService.updateUser(userStub.userId, {
          newPassword: 'testing',
          confirmPassword: 'throw an error',
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should update user name, address, username and description', async () => {
      const data = {
        description: 'new description',
        name: 'Maria F Cardoso',
        username: 'MFC2',
        address: {
          cep: '72804-270',
          city: 'Luziânia',
          state: 'Goiás',
          roadName: 'Rua José Bonifácio',
          houseNumber: '12133',
        },
      };

      const result = await usersService.updateUser(userStub.userId, data);

      expect(result).toEqual(Object.assign(userStub, data));
    });

    it('should update password with newPassword, confirmPassword and correct oldPassword', async () => {
      const result = await usersService.updateUser(userStub.userId, {
        newPassword: 'testing',
        confirmPassword: 'testing',
        oldPassword: 'teste',
      });

      expect(result.userId).toEqual(userStub.userId);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = await usersService.deleteUser(userStub.userId);

      expect(result).toBe(undefined);
    });

    it('should throw an error if user not found', () => {
      expect(usersService.deleteUser('I throw an error')).rejects.toThrow(
        HttpException,
      );
    });
  });
});
