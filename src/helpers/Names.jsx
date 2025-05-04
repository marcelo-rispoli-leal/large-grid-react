import { faker } from "@faker-js/faker/locale/pt_BR";

const getNames = () => {
  const limit = Number(import.meta.env.VITE_USERS_LIMIT) | 1000;
  return faker.helpers.multiple(
    () => faker.person.firstName() + " " + faker.person.lastName(),
    { count: limit },
  );
};

export default function Names() {
  return getNames();
}

/* [
        index: i,
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
      
    ],
    { count: limit } */
