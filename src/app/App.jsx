import { useState } from "react";
import Users from "../components/Users";
import Filter from "../components/Filter";
import Summary from "../components/Summary";
import Columns from "../helpers/Columns";
import Colors from "../helpers/Colors";
import Names from "../helpers/Names";

const getUsers = () => {
  const colors = Colors();
  const names = Names();
  const users = [];

  for (let i = 0; i < names.length; i++) {
    const age = ~~(Math.random() * colors.length);

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

const allUsers = getUsers();

export default function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(-1);
  const [restUsers, setRestUsers] = useState(allUsers);
  const columns = Columns();

  const handleChange = (newValue, inputType) => {
    //Set filters
    let filterName = nameFilter.toLowerCase();
    let filterAge = ageFilter;
    if (inputType === "number") {
      filterAge = +newValue;
      setAgeFilter(filterAge);
    } else {
      filterName = newValue.toLowerCase();
      setNameFilter(newValue);
    }

    //Set filtered users
    if (filterAge === -1 && filterName === "") {
      setRestUsers(allUsers);
    } else {
      const users = allUsers.filter(({ lower, age }) => {
        return (
          lower.includes(filterName) && (filterAge === -1 || age === filterAge)
        );
      });
      setRestUsers(users);
    }
  };

  return (
    <div className="dark max-h-full min-h-screen w-full bg-neutral-100 py-9 font-sans text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-9/10 text-center sm:max-w-85/100 md:max-w-8/10 lg:max-w-3/4 xl:max-w-7/10 2xl:max-w-2/3">
        <h1 className="text-5xl font-bold">{document.title}</h1>
        <div className="b-std my-9 grid w-full gap-3 p-3 md:grid-cols-3 md:grid-rows-1">
          <Filter
            type="text"
            id="nameFilter"
            label="User Name Filter"
            help="This filter is case insensitive"
            value={nameFilter}
            onChange={handleChange}
          />
          <Filter
            type="number"
            id="ageFilter"
            label="User Age Filter"
            help="Age '-1' disables this filter"
            value={ageFilter}
            onChange={handleChange}
          />
          <Summary users={restUsers.length} columns={columns} />
        </div>
        <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-neutral-200 scrollbar-track-neutral-600 b-lr max-h-64 min-h-32 overflow-x-hidden overflow-y-auto p-3">
          <Users users={restUsers} />
        </div>
      </div>
    </div>
  );
}
