// App dependencies
import NavBar from "./NavBar";
import Filter from "./Filter";
import Summary from "./Summary";
import Grid from "./Grid";
import useGridFilters, { USERS_LIMIT } from "../hooks/useGridFilters";
import useGridColumns from "../hooks/useGridColumns";
import useGridLines from "../hooks/useGridLines";
// Exports the App for import into the page index component
export default function App() {
  // Retrieves users data and filters values and handlers
  const { allUsers, filteredUsers, nameFilter, ageFilter, handleFilterChange } =
    useGridFilters();
  // Calculates the progress of the data loading
  const progress = Math.round((allUsers.length / USERS_LIMIT) * 100);
  // Runs scripts to get the number of columns and rows in the Grid to show in the Summary
  const columns = useGridColumns();
  const { lines } = useGridLines(columns, filteredUsers.length);
  // Returns the App component
  return (
    <div className="3xl:py-[30px] 4xl:py-[36px] max-h-full min-h-[100svh] w-full bg-neutral-200 py-[24px] font-sans text-neutral-900 transition-colors dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mx-auto max-w-9/10 text-center sm:max-w-85/100 md:max-w-8/10 lg:max-w-3/4 xl:max-w-7/10 2xl:max-w-2/3">
        <NavBar />
        <h1 className="3xl:mt-[30px] 3xl:text-[60px] 4xl:mt-[36px] 4xl:text-[72px] text-[48px] font-bold">
          {document.title}
        </h1>
        <div
          className="3xl:my-[45px] 3xl:gap-[15px] 3xl:rounded-[15px] 3xl:p-[15px] 4xl:my-[54px] 4xl:gap-[18px] 4xl:rounded-[18px] 4xl:p-[18px] b-std rows-3 my-[36px] grid w-full grid-cols-1 gap-[12px] rounded-[12px] bg-neutral-300 p-[12px] transition-colors md:grid-cols-3 md:grid-rows-1 dark:bg-neutral-700"
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
          <Summary
            loaded={allUsers.length}
            progress={progress}
            founded={filteredUsers.length}
            lines={lines}
          />
        </div>
        {filteredUsers.length > 0 && <Grid cells={filteredUsers} />}
      </div>
    </div>
  );
}
