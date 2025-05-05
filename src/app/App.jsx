import { useState } from "react";
import Users from "../components/Users";
import Filter from "../components/Filters";

function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(-1);

  const handleChange = (newValue, inputType) => {
    //show spinner
    //setIsVisibleSpinner(true);

    //sets filters
    let filterName = nameFilter.toLowerCase();
    let filterAge = ageFilter;
    if (inputType === "number") {
      filterAge = +newValue;
      setAgeFilter(filterAge);
    } else {
      filterName = newValue.toLowerCase();
      setNameFilter(newValue);
    }

    //sets filtered users
    /*let users = [];
    if (filterAge === -1 && filterName === '') {
      users = allUsers;
    } else {
      users = allUsers.filter(({ nameLower, age }) => {
        return (
          nameLower.includes(filterName) &&
          (filterAge === -1 || age === filterAge)
        );
      });
    }
    setFilteredUsers(users);

    //hides spinner after sets filtered users
    setIsVisibleSpinner(false);*/
  };

  return (
    <div className="dark h-screen w-full bg-neutral-100 font-sans text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-9/10 sm:max-w-8/10 lg:max-w-75/100 xl:max-w-7/10 2xl:max-w-2/3">
        <h1 className="leading-1.1 pt-10 pb-6 text-center text-5xl font-bold">
          Large Grid Vite React
        </h1>
        <div className="col-1 mb-5 flex flex-row justify-start rounded-xl border border-solid border-neutral-500 text-center">
          <Filter
            type="text"
            id="nameFilter"
            label="User Name Filter"
            help="This filter is case insensitive"
            value={nameFilter}
            onChange={handleChange}
          />
          <Filter
            type="number"
            id="ageFilter"
            label="User Age Filter"
            help="Age '-1' disables this filter"
            value={ageFilter}
            onChange={handleChange}
          />
        </div>
        <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-neutral-200 scrollbar-track-neutral-600 mb-5 max-h-80 min-h-60 overflow-x-hidden overflow-y-scroll rounded-xl border border-solid border-neutral-500 object-cover p-2.5 text-center">
          <Users />
        </div>
      </div>
    </div>
  );
}

export default App;
