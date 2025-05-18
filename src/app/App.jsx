import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";
import Summary from "../components/Summary";
import Grid from "../components/Grid";
import useGridFilters from "../hooks/useGridFilters";
import useGridColumns from "../hooks/useGridColumns";
import useGridLines from "../hooks/useGridLines";
import { BsArrowDownCircle } from "react-icons/bs";

export default function App() {
  const {
    nameFilter,
    ageFilter,
    filteredUsers,
    handleFilterChange,
    loadMoreUsers,
    isLoading,
    progress,
    hasMoreUsers,
  } = useGridFilters();

  // Retrieve number of columns and lines
  const columns = useGridColumns();
  const { lines } = useGridLines(columns, filteredUsers.length);

  return (
    <div className="max-h-full min-h-[100svh] w-full bg-neutral-200 py-6 font-sans text-neutral-900 transition-colors dark:bg-neutral-800 dark:text-neutral-200">
      <div className="mx-auto max-w-9/10 text-center sm:max-w-85/100 md:max-w-8/10 lg:max-w-3/4 xl:max-w-7/10 2xl:max-w-2/3">
        <NavBar />
        <h1 className="mt-6 text-5xl font-bold">{document.title}</h1>
        <div
          className="b-std my-9 grid w-full gap-3 bg-neutral-300 p-3 transition-colors md:grid-cols-3 md:grid-rows-1 dark:bg-neutral-700"
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
          <Summary count={filteredUsers.length} lines={lines} />
        </div>
        {filteredUsers.length > 0 && <Grid cells={filteredUsers} />}

        {/* Indicador de progresso e botão para carregar mais */}
        {filteredUsers.length > 0 && (
          <div className="mt-4 flex flex-col items-center">
            {/* Barra de progresso */}
            <div className="mb-2 h-2.5 w-full max-w-md rounded-full bg-neutral-300 dark:bg-neutral-700">
              <div
                className="h-2.5 rounded-full bg-cyan-700 transition-all duration-500"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            {/* Botão para carregar mais usuários */}
            {hasMoreUsers && (
              <button
                onClick={loadMoreUsers}
                disabled={isLoading}
                className="mt-2 flex items-center gap-2 rounded-md bg-cyan-700 px-4 py-2 text-white transition-colors hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-50"
                aria-busy={isLoading}
              >
                <BsArrowDownCircle />
                {isLoading ? "Carregando..." : "Carregar mais usuários"}
              </button>
            )}
          </div>
        )}
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
