import { Test } from '@nestjs/testing';
import { CreateUserDTO } from '../dto/CreateUser.dto';
import { UpdateUserDTO } from '../dto/UpdateUser.dto';
import { User } from '../schemas/user.schema';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../../users.service.ts');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub()._id);
      });

      it('should call usersService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub()._id);
      });

      it('should return a User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser called', () => {
      let user: User;
      let createUserDTO: CreateUserDTO;

      beforeEach(async () => {
        createUserDTO = {
          name: userStub().name,
          username: userStub().username,
          password: userStub().password,
          address: userStub().adress,
          birthdate: userStub().birthdate,
          description: userStub().description,
          primaryPhone: userStub().primaryPhone,
        };

        user = await usersController.createUser(createUserDTO);
      });

      it('should call usersService', () => {
        expect(usersService.createUser).toBeCalledWith(createUserDTO);
      });

      it('should return a User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    let user: User;
    let updateUserDTO: UpdateUserDTO;

    describe('when updateUser called', () => {
      beforeEach(async () => {
        updateUserDTO = {
          name: 'Changed Name',
          username: 'Changed Username',
        };

        user = await usersController.updateUser(userStub()._id, updateUserDTO);
      });

      it('should call usersService', () => {
        expect(usersService.updateUser).toBeCalledWith(
          userStub()._id,
          updateUserDTO,
        );
      });

      it('should return a User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser called', () => {
      beforeEach(async () => {
        await usersController.deleteUser(userStub()._id);

        it('should call usersService', () => {
          expect(usersService.deleteUser).toBeCalledWith(userStub()._id);
        });
      });
    });
  });
});
