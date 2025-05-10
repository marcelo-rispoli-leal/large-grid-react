import Colors from "./Colors";
import Names from "./Names";

export default function Users() {
  const colors = Colors();
  const names = Names();
  const users = [];

  for (let i = 0; i < names.length; i++) {
    const age = ~~(Math.random() * colors.length);

    users.push({
      index: i,
      name: names[i],
      age,
      color: colors[age],
      lower: names[i].toLowerCase(),
    });
  }
  return users;
}
