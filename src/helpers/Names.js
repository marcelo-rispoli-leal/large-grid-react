//This function returns the random name for all users
import { faker } from "@faker-js/faker/locale/pt_BR";

export default function Names() {
  const USER_LIMIT = Number(import.meta.env.VITE_USERS_LIMIT) || 10000;
  const BATCH_SIZE = Math.min(
    Number(import.meta.env.VITE_USERS_FREQUENCY) || 1000,
    USER_LIMIT,
  );
  return faker.helpers.multiple(
    () => faker.person.firstName() + " " + faker.person.lastName(),
    { count: BATCH_SIZE },
  );
}
