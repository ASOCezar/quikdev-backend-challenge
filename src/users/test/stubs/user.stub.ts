import { User } from 'src/users/schemas/user.schema';

const userStub = new User();

userStub.userId = '107642fc-4ba6-11ec-81d3-0242ac130003';
userStub.address = {
  cep: '05159-250',
  state: 'São Paulo',
  city: 'São Paulo',
  roadName: 'Praça Luiz Gonzaga',
  houseNumber: '1171',
};
userStub.password =
  '$2a$08$rbDJe93vtSbwsOzHZpGbmeACf2SgR/RURO4wKaT2W9HtYfL9wXjHK';
userStub.birthdate = '1/20/1968';
userStub.name = 'Giovana G Barros';
userStub.username = 'GGB';
userStub.primaryPhone = '(11) 98765-4321';
userStub.description = 'Developer at Quikdev';
userStub.created_at = '2021-11-22T15=18=49.388Z';

export default userStub;
