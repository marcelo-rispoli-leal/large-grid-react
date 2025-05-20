import Colors from "./Colors";
import { faker } from "@faker-js/faker/locale/pt_BR";

const { colors } = Colors();

export default function Users(batchSize = 0, startIndex = 0) {
  const users = [];

  // Generate names for this specific batch
  const names = faker.helpers.multiple(
    () => faker.person.firstName() + " " + faker.person.lastName(),
    { count: batchSize },
  );

  for (let i = 0; i < names.length; i++) {
    const age = ~~(Math.random() * colors.length);
    users.push({
      index: startIndex + i, // Use the given starting index + position in batch
      name: names[i],
      age,
      color: colors[age],
      lower: names[i].toLowerCase(),
    });
  }
  return users;
}
