import React, { useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Spinner from './components/Spinner';
import Filter from './components/Filter';
import css from './App.module.css';

export default function App() {
  //sets use states constants
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState(-1);
  const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

  //inicial effect
  useEffect(() => {
    //sets random light color to age
    function getRandomColor() {
      const color = 'hsl(' + parseInt(Math.random() * 360) + ', 100%, 75%)';
      return color;
    }

    const getUsers = async () => {
      //show spinner
      setIsVisibleSpinner(true);

      //load api data
      const res = await fetch('https://random-persons.herokuapp.com/users');
      const json = await res.json();

      //temporay arrays
      const ages = [];
      const users = [];
      const colors = [];

      //read all json loaded
      for (let i = 0; i < json.data.length; i++) {
        const { name, age } = json.data[i];
        let color = '';

        //gets the color age if defined, or sets it random
        const j = ages.indexOf(age);
        if (j !== -1) {
          color = colors[j].color;
        } else {
          ages.push(age);
          color = getRandomColor();
          colors.push({ age, color });
        }

        //adds user to array
        users.push({
          idx: i,
          name,
          age,
          color,
          nameLower: name.toLowerCase(),
        });
      }

      //hides spinner
      setIsVisibleSpinner(false);

      //sets this initial states
      setAllUsers(users);
      setFilteredUsers(users);
    };

    //triggers the initial effect
    getUsers();
  }, []);

  //change filter event
  const handleChangeFilter = (newValue, inputType) => {
    //show spinner
    setIsVisibleSpinner(true);

    //sets filters
    let filterName = nameFilter.toLowerCase();
    let filterAge = ageFilter;
    if (inputType === 'number') {
      filterAge = +newValue;
      setAgeFilter(filterAge);
    } else {
      filterName = newValue.toLowerCase();
      setNameFilter(newValue);
    }

    //sets filtered users
    let users = [];
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
    setIsVisibleSpinner(false);
  };

  //user visible component
  const User = ({ rowIndex, columnIndex, style }) => (
    <div
      className={5 * rowIndex + columnIndex < filteredUsers.length && css.user}
      style={{
        ...style,
        top: style.top + 5,
        left: style.left + 5,
        width: style.width - 10,
        height: style.height - 10,
        backgroundColor:
          5 * rowIndex + columnIndex < filteredUsers.length &&
          filteredUsers[5 * rowIndex + columnIndex].color,
      }}
    >
      {5 * rowIndex + columnIndex < filteredUsers.length
        ? `${filteredUsers[5 * rowIndex + columnIndex].name}, ` +
          `${filteredUsers[5 * rowIndex + columnIndex].age}`
        : ``}
    </div>
  );

  //users visible window
  const Users = () => (
    <AutoSizer>
      {({ width }) => (
        <Grid
          className={`center row col s12 ${css.divBorder}`}
          columnCount={5}
          columnWidth={(width - 30) / 5}
          height={360}
          rowCount={
            parseInt(filteredUsers.length / 5) +
            (filteredUsers.length % 5 === 0 ? 0 : 1)
          }
          rowHeight={50}
          width={width}
        >
          {User}
        </Grid>
      )}
    </AutoSizer>
  );

  //return app
  return (
    <div>
      <h1 className="center">Large Grid React</h1>
      <div className="container">
        {/* filter and summary region */}
        <div
          className={`row col s12 ${css.divBorder}`}
          style={{ padding: '20px 30px 0 10px' }}
        >
          <Filter
            type="text"
            id="name_filter"
            label="User Name Filter"
            help="This filter is case insensitive"
            value={nameFilter}
            onChangeFilter={handleChangeFilter}
          />
          <Filter
            type="number"
            id="age_filter"
            label="User Age Filter"
            help="Age '-1' disables this filter"
            value={ageFilter}
            onChangeFilter={handleChangeFilter}
          />
          {/* summary */}
          <div className={`col s12 m4 ${css.flexCenter}`}>
            <div className={`col s11 ${css.flexSummary}`}>
              <div style={{ paddingTop: '12px', paddingBottom: '9px' }}>
                Users Founded:
                <strong style={{ paddingLeft: '10px' }}>
                  {filteredUsers.length.toLocaleString('pt-BR')}
                </strong>
              </div>

              <div style={{ paddingTop: '9px', paddingBottom: '12px' }}>
                Number of Lines:
                <strong style={{ paddingLeft: '10px' }}>
                  {(
                    parseInt(filteredUsers.length / 5) +
                    (filteredUsers.length % 5 !== 0 ? 1 : 0)
                  ).toLocaleString('pt-BR')}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* users list or spinner */}
        {!isVisibleSpinner && <Users />}
        {isVisibleSpinner && <Spinner />}
      </div>
    </div>
  );
}
