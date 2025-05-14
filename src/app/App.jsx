import { useState, useCallback, useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";
import Summary from "../components/Summary";
import List from "../components/List";
import Columns from "../helpers/Columns";
import Users from "../helpers/Users";

const allUsers = Users();

// Named constants
const DEFAULT_AGE_FILTER = -1;
const DEFAULT_NAME_FILTER = "";
const MIN_LINES = 0;
const MIN_COLUMNS = 0;
const REST_DIVISOR = 1;

export default function App() {
  const [nameFilter, setNameFilter] = useState(DEFAULT_NAME_FILTER);
  const [ageFilter, setAgeFilter] = useState(DEFAULT_AGE_FILTER);
  const [restUsers, setRestUsers] = useState(allUsers);
  const columns = Columns();

  const handleFilterChange = useCallback(
    (newValue, inputType) => {
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

      // Returns all users when filters not applied
      if (
        filterAge === DEFAULT_AGE_FILTER &&
        filterName === DEFAULT_NAME_FILTER
      ) {
        return setRestUsers(allUsers);
      }

      // Otherwise, returns filtered users
      const users = allUsers.filter(
        ({ lower, age }) =>
          lower.includes(filterName) &&
          (filterAge === DEFAULT_AGE_FILTER || age === filterAge),
      );
      return setRestUsers(users);
    },
    [nameFilter, ageFilter],
  );

  // Calculate number of lines
  const { lines } = useMemo(() => {
    const rest =
      columns > MIN_COLUMNS && restUsers.length % columns > MIN_COLUMNS
        ? REST_DIVISOR
        : MIN_COLUMNS;
    const lines =
      columns > MIN_COLUMNS ? ~~(restUsers.length / columns) + rest : MIN_LINES;
    return { lines };
  }, [columns, restUsers.length]);

  return (
    <div className="max-h-full min-h-[100svh] w-full bg-neutral-200 py-6 font-sans text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
      <div className="mx-auto max-w-9/10 text-center sm:max-w-85/100 md:max-w-8/10 lg:max-w-3/4 xl:max-w-7/10 2xl:max-w-2/3">
        <div className="relative pb-10">
          <NavBar />
        </div>
        <h1 className="mt-6 text-5xl font-bold">{document.title}</h1>
        <div
          className="b-std my-9 grid w-full gap-3 p-3 md:grid-cols-3 md:grid-rows-1"
          role="region"
          aria-label="Filters and Summary"
        >
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
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
