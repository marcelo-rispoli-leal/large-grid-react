import { faker } from "@faker-js/faker/locale/pt_BR";

const getNames = () => {
  const limit = ~~Number(import.meta.env.VITE_USERS_LIMIT);
  const count = limit > 0 ? limit : 1000;
  return faker.helpers.multiple(
    () => faker.person.firstName() + " " + faker.person.lastName(),
    { count: count },
  );
};

export default function Names() {
  return getNames();
}
