import Users from "../components/Users";

const users = JSON.stringify(Users());

function App() {
  return (
    <div className="dark bg-gray-50 font-sans text-stone-900 dark:bg-stone-900 dark:text-gray-50 w-full  h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="pt-10 pb-6 text-5xl font-bold mx-auto text-center">Large Grid Vite React</h1>
        <div className="header">&nbsp;</div>
        <div className="main">{users}</div>
        <div className="container">
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
    </div>
  );
}

export default App;
