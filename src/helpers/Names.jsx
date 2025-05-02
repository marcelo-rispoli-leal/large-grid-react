import { faker } from '@faker-js/faker/locale/pt_BR';

const limit = Number(import.meta.env.VITE_USERS_LIMIT) | 1000;

export default function Names() {
  const names = faker.helpers.multiple(
    () => faker.person.firstName() + ' ' + faker.person.lastName(),
    { count: limit }
  );
  return names;
}

/* [
        index: i,
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
      
    ],
    { count: limit } */
