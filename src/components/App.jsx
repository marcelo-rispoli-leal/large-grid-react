// Exports the App to import in the index.js
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NavBar from "./NavBar";
import Filter from "./Filter";
import Summary from "./Summary";
import Grid from "./Grid";
import useGridFilters from "../hooks/useGridFilters";
import useGridColumns from "../hooks/useGridColumns";
import useGridLines from "../hooks/useGridLines";

const vercel = import.meta.env.VITE_VERCEL;

export default function App() {
  const { nameFilter, ageFilter, filteredUsers, handleFilterChange } =
    useGridFilters();

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
      </div>
      {vercel && <Analytics />}
      {vercel && <SpeedInsights />}
    </div>
  );
}
