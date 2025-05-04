import Colors from "../helpers/Colors";
import Names from "../helpers/Names";

const getUsers = () => {
  const colors = Colors();
  const names = Names();
  const users = [];

  for (let i = 0; i < names.length; i++) {
    const age = ~~(Math.random() * 100);

    users.push({
      index: i,
      name: names[i],
      age,
      backgroundColor: colors[age],
      lower: names[i].toLowerCase(),
    });
  }
  return users;
};

export default function Users() {
  const users = getUsers();
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {users.map(({ index, name, age, backgroundColor, lower }) => (
        <div
          key={index}
          id={`user${index}`}
          style={{ backgroundColor }}
          className="content-center rounded-xl p-1 font-medium wrap-anywhere"
          idx={index}
          lower={lower}
        >{`${name}, ${age}`}</div>
      ))}
    </div>
  );
}

//className={`bg-(--${color})`}
