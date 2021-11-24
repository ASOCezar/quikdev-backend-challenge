import userStub from 'src/users/test/stubs/user.stub';

export const MockAuthService = {
  validateUser: jest.fn().mockResolvedValue(userStub),
  login: jest.fn().mockResolvedValue({ access_token: 'hash' }),
};
