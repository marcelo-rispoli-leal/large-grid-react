import React, { useState } from "react";
import Users from "../components/Users";
import Filter from "../components/Filters";
import Summary from "../components/Summary";

export default function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(-1);

  const handleChange = (newValue, inputType) => {
    //Set filters
    let filterName = nameFilter.toLowerCase();
    let filterAge = ageFilter;
    if (inputType === "number") {
      filterAge = +newValue;
      setAgeFilter(filterAge);
    } else {
      filterName = newValue.toLowerCase();
      setNameFilter(newValue);
    }

    //Set filtered users
    /* let users = [];
    if (filterAge === -1 && filterName === "") {
      users = allUsers;
    } else {
      users = allUsers.filter(({ nameLower, age }) => {
        return (
          nameLower.includes(filterName) &&
          (filterAge === -1 || age === filterAge)
        );
      });
    }
    setFilteredUsers(users); */
  };

  return (
    <div className="dark max-h-full min-h-screen w-full bg-neutral-100 py-9 font-sans text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="mx-auto max-w-9/10 text-center sm:max-w-85/100 md:max-w-8/10 lg:max-w-3/4 xl:max-w-7/10 2xl:max-w-2/3">
        <h1 className="text-5xl font-bold">{document.title}</h1>

        <div className="b-std my-9 grid w-full gap-3 p-3 md:grid-cols-3 md:grid-rows-1">
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
            help={`Age "-1" disables this filter`}
            value={ageFilter}
            onChange={handleChange}
          />
          <Summary />
        </div>
        <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-neutral-200 scrollbar-track-neutral-600 b-lr max-h-64 min-h-32 overflow-x-hidden overflow-y-auto p-3">
          <Users filterName={nameFilter} filterAge={ageFilter} />
        </div>
      </div>
    </div>
  );
}
