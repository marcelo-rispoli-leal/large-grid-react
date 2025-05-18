import Colors from "./Colors";
import Names from "./Names";
import { faker } from "@faker-js/faker/locale/pt_BR";

export default function Users(batchSize = 0, startIndex = 0) {
  const colors = Colors();
  const users = [];

  // Se batchSize não for fornecido, use o valor padrão da variável de ambiente
  const size = batchSize || Number(import.meta.env.VITE_USERS_BATCH) || 1000;

  // Gerar nomes para este lote específico
  const names = faker.helpers.multiple(
    () => faker.person.firstName() + " " + faker.person.lastName(),
    { count: size },
  );

  for (let i = 0; i < names.length; i++) {
    const age = ~~(Math.random() * colors.length);

    users.push({
      index: startIndex + i, // Usar o índice inicial fornecido + posição no lote
      name: names[i],
      age,
      color: colors[age],
      lower: names[i].toLowerCase(),
    });
  }
  return users;
}
