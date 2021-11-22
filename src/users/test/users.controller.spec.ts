import { Test } from '@nestjs/testing';
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
        await usersController.getUser(userStub()._id);
      });

      it('should call usersService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub()._id);
      });
    });
  });
});
