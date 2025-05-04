import Users from "../components/Users";

//const users = JSON.stringify(Users());

function App() {
  return (
    <div className="dark h-screen w-full bg-stone-100 font-sans text-stone-900 dark:bg-stone-900 dark:text-stone-100">
      <div className="mx-auto max-w-9/10 sm:max-w-8/10 lg:max-w-75/100 xl:max-w-7/10 2xl:max-w-2/3">
        <h1 className="leading-1.1 pt-10 pb-6 text-center text-5xl font-bold">
          Large Grid Vite React
        </h1>
        <div className="mb-5 rounded-xl border border-solid border-neutral-500 text-center">
          0
        </div>
        <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-neutral-200 scrollbar-track-neutral-600 mb-5 max-h-80 min-h-60 overflow-x-hidden overflow-y-scroll rounded-l-xl border-y border-l border-solid border-neutral-500 object-cover p-2.5 text-center">
          <Users />
          {/* {users} */}
        </div>
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
