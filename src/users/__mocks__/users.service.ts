import userStub from '../test/stubs/user.stub';

const mockUserStub = {
  ...userStub,
  toJSON() {
    return JSON.parse(JSON.stringify(userStub));
  },
};

export const MockUsersService = {
  getUserById: jest.fn().mockResolvedValue(mockUserStub),
  createUser: jest.fn().mockResolvedValue(mockUserStub),
  updateUser: jest.fn().mockResolvedValue(mockUserStub),
  deleteUser: jest.fn().mockResolvedValue({}),
};
