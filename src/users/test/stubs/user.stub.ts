import { User } from 'src/users/schemas/user.schema';

export const userStub = (): User => {
  return {
    userId: '107642fc-4ba6-11ec-81d3-0242ac130003',
    address: {
      cep: '05159-250',
      state: 'São Paulo',
      city: 'São Paulo',
      roadName: 'Praça Luiz Gonzaga',
      houseNumber: '1171',
    },
    password: 'teste',
    birthdate: '1/20/1968',
    name: 'Giovana G Barros',
    username: 'GGB',
    primaryPhone: '(11) 98765-4321',
    description: 'Developer at Quikdev',
    created_at: '2021-11-22T15:18:49.388Z',
  };
};
