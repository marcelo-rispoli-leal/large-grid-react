import Users from "../components/Users";

const users = JSON.stringify(Users());

function App() {
  return (
    <div className="dark bg-gray-50 font-sans text-stone-900 dark:bg-stone-900 dark:text-gray-50">
      <div>
        <h1 className="pt-10 pb-6 text-4xl">Large Grid Vite React</h1>
      </div>
      <div className="container">
        <div className="header">&nbsp;</div>
        <div className="main">{users}</div>
        {/* {Timing(2) ? (
            <div className="preLoader">
              <Spinner />
            </div>
          ) : (
            <div className="main">
              <Users />
            </div>
          )} */}
      </div>
    </div>
  );
}

export default App;
