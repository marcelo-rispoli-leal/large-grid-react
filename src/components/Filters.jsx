import { BsSearch } from "react-icons/bs";

export default function Filter({ id, type, label, help, value, onChange }) {
  //change input event
  const handleChange = (event) => {
    onChange(event.target.value, event.target.type);
  };

  //return component
  return (
    <div className="inline-flex w-1/3 grid-rows-1 justify-stretch px-4 py-2">
      <form className="w-full">
        <div className="grid grid-cols-1 grid-rows-3 items-center">
          <input
            id={id}
            className={`peer order-3 col-start-1 row-2 block w-full appearance-none rounded-lg border border-neutral-500 bg-transparent py-2.5 pr-3 pl-12 text-sm text-neutral-900 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 focus:outline-none dark:text-neutral-100`}
            type={type}
            value={value}
            min={type === "number" ? "-1" : undefined}
            max={type === "number" ? "99" : undefined}
            onChange={handleChange}
          />
          <label className="order 1 col-start-1 row-1 text-neutral-900 peer-focus:text-cyan-600 dark:text-neutral-100">
            {label}
          </label>
          <BsSearch className="order-2 col-start-1 row-2 ml-4 text-2xl text-neutral-900 peer-focus:text-cyan-600 dark:text-neutral-100" />
          <span
            className={`order-4 col-start-1 row-3 text-sm leading-none text-neutral-900 peer-focus:text-cyan-600 dark:text-neutral-100`}
          >
            {help}
          </span>
        </div>
      </form>
    </div>
  );
}
