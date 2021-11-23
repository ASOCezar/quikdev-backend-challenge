import { UpdateUserDTO } from '../dto/UpdateUser.dto';
import { UserDocument } from '../schemas/user.schema';
import { databaseReturn } from './databaseReturn';

type DataType = {
  userId?: string;
  username?: string;
};

export default class MockUserRepository {
  public async findOne({
    userId,
    username,
  }: DataType): Promise<UserDocument | null> {
    const user = databaseReturn.filter((data: UserDocument) => {
      return userId
        ? data.userId === userId
        : username && data.username === username;
    })[0];

    if (!user) {
      return null;
    }

    return user;
  }

  public create(user: UserDocument) {
    databaseReturn.push(user);

    return user;
  }

  public findOneAndUpdate({ userId }: DataType, updateUserDto: UpdateUserDTO) {
    return databaseReturn.filter((data) => {
      if (data.userId === userId) {
        data = Object.assign(updateUserDto, data);
        return data;
      }
    })[0];
  }

  public async delete({ userId }: DataType) {
    databaseReturn.filter((data: UserDocument) => data.userId === userId);

    return;
  }
}
