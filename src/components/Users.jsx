import { useState, useEffect } from "react";
import Colors from "../helpers/Colors";
import Names from "../helpers/Names";
import Columns from "../helpers/Columns";

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

export default function Users({ info }) {
  const [firstInfo, setFirstInfo] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [restUsers, setRestUsers] = useState([]);

  const columns = Columns();

  useEffect(() => {
    if (firstInfo) {
      // componentDidMount logic - runs only on initial render
      //console.log("Component did mount");
      const users = getUsers();
      setFirstInfo(false);
      setAllUsers(users);
      setRestUsers(users);
    } else {
      // componentDidUpdate logic - runs on subsequent renders
      //console.log("Component did update");
    }
    // This will run both on mount and update
    //console.log("This runs on every render");

    // Cleanup function (optional, for componentWillUnmount-like behavior)
    return () => {
      /* console.log(
        "Component will unmount or before re-render (if dependencies change)",
      ); */
      setAllUsers(undefined);
      setRestUsers(undefined);
    };
  }, [info]);

  return (
    <div
      id="users-container"
      columns={columns}
      className="3xs:max-2xs:grid-cols-2 2xs:max-xs:grid-cols-3 xs:max-md:grid-cols-4 md:max-xm:grid-cols-5 xm:max-lg:grid-cols-6 grid grid-cols-1 gap-3 lg:max-xl:grid-cols-7 xl:max-2xl:grid-cols-8 2xl:grid-cols-10"
    >
      {restUsers.map(({ index, name, age, backgroundColor, lower }) => (
        <div
          key={index}
          id={`user-${index}`}
          style={{ backgroundColor }}
          className="f-md content-center rounded-xl p-1 wrap-anywhere"
          age={age}
          lower={lower}
        >{`${name}, ${age}`}</div>
      ))}
    </div>
  );
}
