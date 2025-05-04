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
    <div className="max-3xs:3xs:grid-cols-1 3xs:max-2xs:grid-cols-2 2xs:max-xs:grid-cols-3 xs:max-sm:grid-cols-4 grid grid-cols-1 gap-2.5 sm:max-md:grid-cols-5 md:max-lg:grid-cols-6 lg:max-xl:grid-cols-7 xl:max-2xl:grid-cols-8 2xl:grid-cols-10">
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
