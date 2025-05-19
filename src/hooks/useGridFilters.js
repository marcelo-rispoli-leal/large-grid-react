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

  // Ref para rastrear o allUsers.length para o qual um carregamento já foi iniciado
  const initiatedLoadForLengthRef = useRef(-1);

  // Get limits from environment variables
  const USERS_LIMIT = Number(import.meta.env.VITE_USERS_LIMIT) || 10000;
  const USERS_BATCH = Number(import.meta.env.VITE_USERS_BATCH) || 1000;

  useEffect(
    () => {
      if (allUsers.length >= USERS_LIMIT) {
        initiatedLoadForLengthRef.current = -1;
        return;
      }
      // Se o useEffect for executado novamente para o mesmo allUsers.length
      // (o que acontece no Strict Mode) antes que o estado allUsers.length seja atualizado,
      // e já marcamos que um carregamento foi iniciado para este length,
      // então pulamos esta execução para evitar duplicar o lote.
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
        // Se não há mais capacidade, resetamos a ref para permitir futuros carregamentos
        // se USERS_LIMIT mudar, por exemplo.
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
      // Gera um novo lote de usuários. O startIndex é o comprimento atual de allUsers.
      const newUsers = Users(batchSize, allUsers.length);

      // Antes de enfileirar a atualização do estado, marcamos que um carregamento
      // para o allUsers.length atual foi iniciado.
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
    },
    // Só carrega se ainda não atingimos o limite de usuários
    /* if (allUsers.length < USERS_LIMIT) {
      // Se o useEffect for executado novamente para o mesmo allUsers.length
      // (o que acontece no Strict Mode) antes que o estado allUsers.length seja atualizado,
      // e já marcamos que um carregamento foi iniciado para este length,
      // então pulamos esta execução para evitar duplicar o lote.
      if (allUsers.length === initiatedLoadForLengthRef.current) {
        console.log(
          "useEffect re-run for same allUsers.length (Strict Mode behavior). Skipping duplicate batch load for length:",
          allUsers.length,
        );
        return;
      }

      const remainingCapacity = USERS_LIMIT - allUsers.length;
      const batchSize = Math.min(USERS_BATCH, remainingCapacity);

      if (batchSize <= 0) {
        // Se não há mais capacidade, resetamos a ref para permitir futuros carregamentos
        // se USERS_LIMIT mudar, por exemplo.
        initiatedLoadForLengthRef.current = -1;
        return;
      }

      console.log(
        "Loading users. allUsers.length:",
        allUsers.length,
        "USERS_LIMIT:",
        USERS_LIMIT,
        "batchSize:",
        batchSize,
      );
      // Gera um novo lote de usuários. O startIndex é o comprimento atual de allUsers.
      const newUsers = Users(batchSize, allUsers.length);

      // Antes de enfileirar a atualização do estado, marcamos que um carregamento
      // para o allUsers.length atual foi iniciado.
      initiatedLoadForLengthRef.current = allUsers.length;

      setAllUsers((prevUsers) => {
        console.log(
          "Updating allUsers. Prev length:",
          prevUsers.length,
          "New users count:",
          newUsers.length,
        );
        return [...prevUsers, ...newUsers];
      });
    } else {
      // Limite de usuários atingido ou excedido. Resetamos a ref.
      initiatedLoadForLengthRef.current = -1;
    } */
    [allUsers.length, USERS_LIMIT, USERS_BATCH],
  );

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
    console.log("Applying filters. allUsers.length:", allUsers.length);
  }, [nameFilter, ageFilter, allUsers, applyFilters]);

  return {
    nameFilter,
    ageFilter,
    filteredUsers,
    handleFilterChange,
  };
}
