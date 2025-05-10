import { useState } from "react";
import List from "../components/List";
import Filter from "../components/Filter";
import Summary from "../components/Summary";
import Columns from "../helpers/Columns";
import Users from "../helpers/Users";

const allUsers = Users();

export default function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(-1);
  const [restUsers, setRestUsers] = useState(allUsers);
  const columns = Columns();
  const rest = columns > 0 && restUsers.length % columns > 0 ? 1 : 0;
  const lines = columns > 0 ? ~~(restUsers.length / columns) + rest : 0;

  const handleFilterChange = (newValue, inputType) => {
    // Sets name filter
    let filterName = nameFilter.toLowerCase();
    if (inputType !== "number") {
      filterName = newValue.toLowerCase();
      setNameFilter(newValue);
    }

    // Sets age filter
    let filterAge = ageFilter;
    if (inputType === "number") {
      filterAge = +newValue;
      setAgeFilter(filterAge);
    }

    // Returns all users when filters not aplied
    if (filterAge === -1 && filterName === "") {
      return setRestUsers(allUsers);
    }

    // Otherwise, returns filtered users
    const users = allUsers.filter(
      ({ lower, age }) =>
        lower.includes(filterName) && (filterAge === -1 || age === filterAge),
    );
    return setRestUsers(users);
  };

  return (
    <div className="dark max-h-full min-h-[100svh] w-full bg-neutral-100 py-9 font-sans text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-9/10 text-center sm:max-w-85/100 md:max-w-8/10 lg:max-w-3/4 xl:max-w-7/10 2xl:max-w-2/3">
        <h1 className="text-5xl font-bold">{document.title}</h1>
        <div className="b-std my-9 grid w-full gap-3 p-3 md:grid-cols-3 md:grid-rows-1">
          <Filter
            type="text"
            id="nameFilter"
            label="User Name Filter"
            help="This filter is case insensitive"
            value={nameFilter}
            onChange={handleFilterChange}
          />
          <Filter
            type="number"
            id="ageFilter"
            label="User Age Filter"
            help="Age '-1' disables this filter"
            value={ageFilter}
            onChange={handleFilterChange}
          />
          <Summary count={restUsers.length} lines={lines} />
        </div>
        {restUsers.length > 0 && <List items={restUsers} />}
      </div>
    </div>
  );
}
