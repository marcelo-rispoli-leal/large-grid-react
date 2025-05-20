import { useRef, useState, useEffect, useCallback } from "react";
import Users from "../scripts/Users";

// Named constants from environment variables
const { DEV, VITE_USERS_BATCH, VITE_USERS_LIMIT } = import.meta.env;
export const DEV_MODE = DEV;
export const USERS_LIMIT = ~~Number(VITE_USERS_LIMIT) || 10000;
const BATCH_SIZE = ~~Number(VITE_USERS_BATCH) > 0 && ~~Number(VITE_USERS_BATCH);
const USERS_BATCH = Math.min(BATCH_SIZE || USERS_LIMIT, USERS_LIMIT);
// Default named constants
export const DEFAULT_AGE_FILTER = -1;
export const DEFAULT_NAME_FILTER = "";
const DEFAULT_LENGTH_REF = -1;

export default function useGridFilters() {
  const [nameFilter, setNameFilter] = useState(DEFAULT_NAME_FILTER);
  const [ageFilter, setAgeFilter] = useState(DEFAULT_AGE_FILTER);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Ref to track allUsers.length for which a load has already started
  const loadStartedForLengthRef = useRef(DEFAULT_LENGTH_REF);

  useEffect(() => {
    // Checks if useEffect already reached the limit
    if (allUsers.length >= USERS_LIMIT) {
      loadStartedForLengthRef.current = DEFAULT_LENGTH_REF;
      return;
    }
    // Checks if useEffect is triggered for the same allUsers.length
    // (Strict Mode behavior) to skip execution and avoid batch duplication
    if (allUsers.length === loadStartedForLengthRef.current) {
      // Dev log for the skipped re-run
      DEV_MODE &&
        console.log(
          "useEffect re-run for same allUsers.length (Strict Mode behavior). Skipping duplicate batch load for length:",
          allUsers.length,
        );
      return;
    }
    // Calculates the remaining capacity and current the batch size
    const remainingCapacity = USERS_LIMIT - allUsers.length;
    const batchSize = Math.min(USERS_BATCH, remainingCapacity);

    if (batchSize <= 0) {
      // If there is no more capacity, the ref is reset to allow future loads.
      loadStartedForLengthRef.current = DEFAULT_LENGTH_REF;
      return;
    }
    // Dev log for the current state of the load process
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
    loadStartedForLengthRef.current = allUsers.length;

    setAllUsers((prevUsers) => {
      // Dev log for the state update
      DEV_MODE &&
        console.log(
          "Updating allUsers. Prev length:",
          prevUsers.length,
          "New users count:",
          newUsers.length,
        );
      return [...prevUsers, ...newUsers];
    });

    // Cleanup function for the user loading effect
    return () => {
      // NOTE: loadStartedForLengthRef.current is intentionally NOT reset here.
      // This ref's purpose is to prevent duplicate batch loads if the effect
      // re-runs for the same allUsers.length (e.g., due to Strict Mode)
      // before the state update from the first run has completed.
      // Resetting it here would negate that protection and could lead to
      // duplicate data generation.
      // The ref will naturally reset if the component unmounts and remounts.
      DEV_MODE &&
        console.log(
          "Cleanup: User loading effect (allUsers.length changed or unmount). loadStartedForLengthRef is not reset by this cleanup.",
        );
    };
  }, [allUsers.length]);

  // Function to apply filters to the user list
  const applyFilters = useCallback(
    (usersToFilter) => {
      // Dev log for the current state of the filter process
      DEV_MODE &&
        console.log(
          "applyFilters called with usersToFilter length:",
          usersToFilter.length,
        );
      // Filters constants
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

      // Otherwise, returns filtered users
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
    // Set filters
    inputType !== "number" ? setNameFilter(newValue) : setAgeFilter(+newValue);
  }, []);

  // Effect to apply filters when filters or users change
  useEffect(() => {
    let isMounted = true; // Flag to track mounted state

    if (isMounted) {
      applyFilters(allUsers);
      // Dev log for the current state of the filter effect
      DEV_MODE &&
        console.log("Applying filters. allUsers.length:", allUsers.length);
    }
    // Cleanup function for the filter applying effect
    return () => {
      isMounted = false; // Set flag to false when component unmounts or dependencies change
      DEV_MODE &&
        console.log(
          "Cleanup: Filter applying effect (dependencies changed or unmount).",
        );
    };
  }, [nameFilter, ageFilter, allUsers, applyFilters]);

  return {
    nameFilter,
    ageFilter,
    allUsers,
    filteredUsers,
    handleFilterChange,
  };
}
