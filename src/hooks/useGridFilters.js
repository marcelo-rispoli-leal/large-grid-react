import { useCallback, useState, useEffect } from "react";
import Users from "../helpers/Users";

// Named constants
export const DEFAULT_AGE_FILTER = -1;
export const DEFAULT_NAME_FILTER = "";

export default function useGridFilters() {
  const [nameFilter, setNameFilter] = useState(DEFAULT_NAME_FILTER);
  const [ageFilter, setAgeFilter] = useState(DEFAULT_AGE_FILTER);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(1);

  // Get limits from environment variables
  const USERS_LIMIT = Number(import.meta.env.VITE_USERS_LIMIT) || 10000;
  const USERS_BATCH = Number(import.meta.env.VITE_USERS_BATCH) || 1000;
  const TOTAL_BATCHES = Math.ceil(USERS_LIMIT / USERS_BATCH);

  // Function to apply filters to the user list
  const applyFilters = useCallback(
    (users) => {
      const filterName = nameFilter.toLowerCase();
      const filterAge = ageFilter;

      // Returns all users when filters are not applied
      if (
        filterAge === DEFAULT_AGE_FILTER &&
        filterName === DEFAULT_NAME_FILTER
      ) {
        return setFilteredUsers(users);
      }

      // Otherwise, return filtered users
      const filtered = users.filter(
        ({ lower, age }) =>
          lower.includes(filterName) &&
          (filterAge === DEFAULT_AGE_FILTER || age === filterAge),
      );
      return setFilteredUsers(filtered);
    },
    [nameFilter, ageFilter],
  );

  // Upload users in batches
  useEffect(() => {
    const loadBatch = () => {
      // Check user limit has been reached
      if (allUsers.length >= USERS_LIMIT) {
        return;
      }

      // Calculates how many users can still be loaded
      const remainingCapacity = USERS_LIMIT - allUsers.length;
      const batchSize = Math.min(USERS_BATCH, remainingCapacity);

      // If there is no more capacity, it cannot carry more users
      if (batchSize <= 0) {
        return;
      }

      // Generate a new batch of users with adjusted size if necessary
      const newUsers = Users(batchSize, (currentBatch - 1) * USERS_BATCH);

      setAllUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, ...newUsers];

        // Apply filters to updated users
        applyFilters(updatedUsers);
        return updatedUsers;
      });

      return;
    };

    if (currentBatch <= TOTAL_BATCHES && allUsers.length < USERS_LIMIT) {
      loadBatch();
    }
  }, [
    currentBatch,
    applyFilters,
    USERS_BATCH,
    TOTAL_BATCHES,
    USERS_LIMIT,
    allUsers.length,
  ]);

  // Filter change handler
  const handleFilterChange = useCallback((newValue, inputType) => {
    // Define filtro de nome
    if (inputType !== "number") {
      setNameFilter(newValue);
    } else {
      // Define filtro de idade
      setAgeFilter(+newValue);
    }
  }, []);

  // Effect to apply filters when filters or users change
  useEffect(() => {
    applyFilters(allUsers);
  }, [nameFilter, ageFilter, allUsers, applyFilters]);

  // Load more users
  useCallback(() => {
    // Checks if the next batch would exceed the user limit
    // or if the last batch has been reached
    if (currentBatch < TOTAL_BATCHES && allUsers.length < USERS_LIMIT) {
      // Check if this is the last batch needed
      if ((currentBatch + 1) * USERS_BATCH > USERS_LIMIT) {
        // Calculates how many users are left to reach the exact limit
        const remainingUsers = USERS_LIMIT - allUsers.length;
        if (remainingUsers <= 0) {
          return; // Já atingimos o limite, não carrega mais
        }
      }
      setCurrentBatch((prev) => prev + 1);
    }
  }, [currentBatch, TOTAL_BATCHES, allUsers.length, USERS_BATCH, USERS_LIMIT]);

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
