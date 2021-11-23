import { User, UserDocument } from '../schemas/user.schema';
import userStub from '../test/stubs/user.stub';

const newUserStub = new User();

newUserStub.userId = '107642fc-4ba41-11ec-81d3-0242ac130003';
newUserStub.address = {
  cep: '05159-250',
  state: 'São Paulo',
  city: 'São Paulo',
  roadName: 'Praça Luiz Gonzaga',
  houseNumber: '1171',
};
newUserStub.password =
  '$2a$08$rbDJe93vtSbwsOzHZpGbmeACf2SgR/RURO4wKaT2W9HtYfL9wXjHK';
newUserStub.birthdate = '1/20/1968';
newUserStub.name = 'Giovana G Barros';
newUserStub.username = 'Testing';
newUserStub.primaryPhone = '(11) 98765-4321';
newUserStub.description = 'Developer at Quikdev';
newUserStub.created_at = '2021-11-22T15=18=49.388Z';

export const databaseReturn = [
  {
    ...userStub,
  },
  {
    ...newUserStub,
  },
] as UserDocument[];
