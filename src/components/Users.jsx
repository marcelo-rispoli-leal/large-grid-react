import Colors from '../helpers/Colors';
import Names from '../helpers/Names';

const colors = Colors();
const names = Names();
const users = [];

const getUsers = () => {
  for (let i = 0; i < names.length; i++) {
    const age = ~~Math.random() * 100;
    users.push({
      index: i,
      name: names[i],
      age,
      color: colors[age].color,
      lower: names[i].toLowerCase(),
    });
  }
  return users;
};

export default function Users() {
  return getUsers();
}
