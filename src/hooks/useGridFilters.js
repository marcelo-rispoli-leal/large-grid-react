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
  const [isLoading, setIsLoading] = useState(false);

  // Obter limites das variáveis de ambiente
  const USERS_LIMIT = Number(import.meta.env.VITE_USERS_LIMIT) || 10000;
  const USERS_BATCH = Number(import.meta.env.VITE_USERS_BATCH) || 1000;
  const TOTAL_BATCHES = Math.ceil(USERS_LIMIT / USERS_BATCH);

  // Função para aplicar filtros à lista de usuários
  const applyFilters = useCallback(
    (users) => {
      const filterName = nameFilter.toLowerCase();
      const filterAge = ageFilter;

      // Retorna todos os usuários quando filtros não aplicados
      if (
        filterAge === DEFAULT_AGE_FILTER &&
        filterName === DEFAULT_NAME_FILTER
      ) {
        return setFilteredUsers(users);
      }

      // Caso contrário, retorna usuários filtrados
      const filtered = users.filter(
        ({ lower, age }) =>
          lower.includes(filterName) &&
          (filterAge === DEFAULT_AGE_FILTER || age === filterAge),
      );
      return setFilteredUsers(filtered);
    },
    [nameFilter, ageFilter],
  );

  // Carregar usuários em lotes
  useEffect(() => {
    const loadBatch = () => {
      // Verifica se já atingimos o limite de usuários
      if (allUsers.length >= USERS_LIMIT) {
        return;
      }

      setIsLoading(true);

      // Calcula quantos usuários ainda podem ser carregados
      const remainingCapacity = USERS_LIMIT - allUsers.length;
      const batchSize = Math.min(USERS_BATCH, remainingCapacity);

      // Se não há mais capacidade, não carrega mais usuários
      if (batchSize <= 0) {
        setIsLoading(false);
        return;
      }

      // Gerar um novo lote de usuários com tamanho ajustado se necessário
      const newUsers = Users(batchSize, (currentBatch - 1) * USERS_BATCH);

      setAllUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, ...newUsers];

        // Aplicar filtros aos usuários atualizados
        applyFilters(updatedUsers);

        return updatedUsers;
      });

      setIsLoading(false);
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

  // Manipulador de mudança de filtro
  const handleFilterChange = useCallback(
    (newValue, inputType) => {
      // Define filtro de nome
      if (inputType !== "number") {
        setNameFilter(newValue);
      } else {
        // Define filtro de idade
        setAgeFilter(+newValue);
      }

      // Aplica os filtros atualizados
      setTimeout(() => applyFilters(allUsers), 0);
    },
    [allUsers, applyFilters],
  );

  // Carregar mais usuários
  const loadMoreUsers = useCallback(() => {
    // Verifica se o próximo lote ultrapassaria o limite de usuários
    // ou se já atingimos o último lote planejado
    if (currentBatch < TOTAL_BATCHES && allUsers.length < USERS_LIMIT) {
      // Verifica se este é o último lote necessário
      if ((currentBatch + 1) * USERS_BATCH > USERS_LIMIT) {
        // Calcula quantos usuários ainda faltam para atingir o limite exato
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
    loadMoreUsers,
    isLoading,
    progress: Math.min(100, (currentBatch / TOTAL_BATCHES) * 100),
    hasMoreUsers: currentBatch < TOTAL_BATCHES && allUsers.length < USERS_LIMIT,
  };
}
