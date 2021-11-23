import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { MockModel } from 'src/database/test/support/mock.model';
import { UpdateUserDTO } from '../dto/UpdateUser.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UsersRepository } from '../users.repository';
import userStub from './stubs/user.stub';
import { UserModel } from './support/user.model';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let userModel: UserModel;
  let userFilterQuery: FilterQuery<UserDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    userModel = moduleRef.get<UserModel>(getModelToken(User.name));
    userFilterQuery = {
      userId: userStub.userId,
    };

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: UserDocument;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOne');
        user = await usersRepository.findOne(userFilterQuery);
      });

      it('should call the userModel', () => {
        expect(userModel.findOne).toBeCalledWith(userFilterQuery, {
          _id: 0,
          __v: 0,
        });
      });

      it('should return a user', () => {
        expect(user).toStrictEqual(userStub);
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let user: UserDocument;
      let updateUserData: UpdateUserDTO;

      beforeEach(async () => {
        updateUserData = {
          name: userStub.name,
        };
        jest.spyOn(userModel, 'findOneAndUpdate');
        user = await usersRepository.findOneAndUpdate(
          userFilterQuery,
          updateUserData,
        );
      });

      it('should call the userModel', () => {
        expect(userModel.findOneAndUpdate).toBeCalledWith(
          userFilterQuery,
          updateUserData,
          {
            new: true,
          },
        );
      });

      it('should return a user', () => {
        expect(user).toStrictEqual(userStub);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: UserDocument;
      let saveSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(MockModel.prototype, 'create');
        user = await usersRepository.create(userStub);
      });

      it('should call the userModel', () => {
        expect(saveSpy).toHaveBeenCalled();
      });

      it('should return a user', () => {
        expect(user).toStrictEqual(userStub);
      });
    });
  });

  describe('delete', () => {
    let deleteSpy: jest.SpyInstance;

    describe('when delete is called', () => {
      beforeEach(async () => {
        deleteSpy = jest.spyOn(MockModel.prototype, 'findOneAndDelete');
        await usersRepository.delete(userFilterQuery);
      });

      it('should call the userModel', () => {
        expect(deleteSpy).toHaveBeenCalled();
      });
    });
  });
});
