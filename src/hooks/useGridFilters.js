import { useCallback, useState, useEffect, useRef } from "react";
import Users from "../helpers/Users";

// Named constants
export const DEFAULT_AGE_FILTER = -1;
export const DEFAULT_NAME_FILTER = "";
export const DEV_MODE = import.meta.env.DEV;

export default function useGridFilters() {
  const [nameFilter, setNameFilter] = useState(DEFAULT_NAME_FILTER);
  const [ageFilter, setAgeFilter] = useState(DEFAULT_AGE_FILTER);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Ref to track allUsers.length for which a load has already started
  const initiatedLoadForLengthRef = useRef(-1);

  // Get limits from environment variables
  const USERS_LIMIT = Number(import.meta.env.VITE_USERS_LIMIT) || 10000;
  const USERS_BATCH = Number(import.meta.env.VITE_USERS_BATCH) || 1000;

  useEffect(() => {
    if (allUsers.length >= USERS_LIMIT) {
      initiatedLoadForLengthRef.current = -1;
      return;
    }
    // If useEffect is executed again for the same allUsers.length
    // (which happens in Strict Mode) before the allUsers.length state is updated
    // it is marked that loading has started for this length
    // and then the new execution is skipped to avoid duplicating the batch.
    if (allUsers.length === initiatedLoadForLengthRef.current) {
      DEV_MODE &&
        console.log(
          "useEffect re-run for same allUsers.length (Strict Mode behavior). Skipping duplicate batch load for length:",
          allUsers.length,
        );
      return;
    }

    const remainingCapacity = USERS_LIMIT - allUsers.length;
    const batchSize = Math.min(USERS_BATCH, remainingCapacity);

    if (batchSize <= 0) {
      // If there is no more capacity, the ref is reset to allow future loads.
      initiatedLoadForLengthRef.current = -1;
      return;
    }

    DEV_MODE &&
      console.log(
        "Loading users. allUsers.length:",
        allUsers.length,
        "USERS_LIMIT:",
        USERS_LIMIT,
        "batchSize:",
        batchSize,
      );
    // Generates a new batch of users. The startIndex is the current length of allUsers.
    const newUsers = Users(batchSize, allUsers.length);

    // Before queuing the state update, it is marked that a load for the
    // current allUsers.length has started.
    initiatedLoadForLengthRef.current = allUsers.length;

    setAllUsers((prevUsers) => {
      DEV_MODE &&
        console.log(
          "Updating allUsers. Prev length:",
          prevUsers.length,
          "New users count:",
          newUsers.length,
        );
      return [...prevUsers, ...newUsers];
    });
  }, [allUsers.length, USERS_LIMIT, USERS_BATCH]);

  // Function to apply filters to the user list
  const applyFilters = useCallback(
    (usersToFilter) => {
      DEV_MODE &&
        console.log(
          "applyFilters called with usersToFilter length:",
          usersToFilter.length,
        );
      const filterName = nameFilter.toLowerCase();
      const filterAge = ageFilter;

      // Returns all users when filters are not applied
      if (
        filterAge === DEFAULT_AGE_FILTER &&
        filterName === DEFAULT_NAME_FILTER
      ) {
        setFilteredUsers(usersToFilter);
        return;
      }

      // Otherwise, return filtered users
      const filtered = usersToFilter.filter(
        ({ lower, age }) =>
          lower.includes(filterName) &&
          (filterAge === DEFAULT_AGE_FILTER || age === filterAge),
      );
      setFilteredUsers(filtered);
    },
    [nameFilter, ageFilter],
  );

  // Filter change handler
  const handleFilterChange = useCallback((newValue, inputType) => {
    // Set name filter
    if (inputType !== "number") {
      setNameFilter(newValue);
    } else {
      // Set name filter
      setAgeFilter(+newValue);
    }
  }, []);

  // Effect to apply filters when filters or users change
  useEffect(() => {
    applyFilters(allUsers);
    DEV_MODE &&
      console.log("Applying filters. allUsers.length:", allUsers.length);
  }, [nameFilter, ageFilter, allUsers, applyFilters]);

  return {
    nameFilter,
    ageFilter,
    filteredUsers,
    handleFilterChange,
  };
}
