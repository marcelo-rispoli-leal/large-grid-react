import { useCallback, useState } from "react";
import Users from "../helpers/Users";

const allUsers = Users();

// Named constants
export const DEFAULT_AGE_FILTER = -1;
export const DEFAULT_NAME_FILTER = "";

export default function useGridFilters() {
  const [nameFilter, setNameFilter] = useState(DEFAULT_NAME_FILTER);
  const [ageFilter, setAgeFilter] = useState(DEFAULT_AGE_FILTER);
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

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
        return setFilteredUsers(allUsers);
      }

      // Otherwise, returns filtered users
      const users = allUsers.filter(
        ({ lower, age }) =>
          lower.includes(filterName) &&
          (filterAge === DEFAULT_AGE_FILTER || age === filterAge),
      );
      return setFilteredUsers(users);
    },
    [nameFilter, ageFilter],
  );

  return {
    nameFilter,
    ageFilter,
    filteredUsers,
    handleFilterChange,
    setNameFilter,
    setAgeFilter,
    setFilteredUsers,
  };
}
