import { BsSearch } from "react-icons/bs";

export default function Filter({ id, type, label, help, value, onChange }) {
  //change input event
  const handleChange = (event) => {
    onChange(event.target.value, event.target.type);
  };

  //return component
  return (
    <div className="m-4 inline-flex w-1/3 grid-rows-1 justify-stretch rounded-lg border border-neutral-500 px-4 py-2">
      <form className="w-full">
        <div className="grid grid-cols-1 grid-rows-3 items-center">
          <input
            id={id}
            className="peer text-md order-3 col-start-1 row-2 w-full rounded-lg border border-neutral-500 py-0 pr-0 pl-9 leading-7 font-medium focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 focus:outline-none"
            type={type}
            value={value}
            min={type === "number" ? "-1" : undefined}
            max={type === "number" ? "99" : undefined}
            onChange={handleChange}
          />
          <label
            htmlFor={id}
            className="order 1 col-start-1 row-1 peer-focus:text-cyan-600"
          >
            {label}
          </label>
          <BsSearch className="text-md order-2 col-start-1 row-2 ml-3 font-medium peer-focus:text-cyan-600" />
          <span className="order-4 col-start-1 row-3 text-sm leading-none peer-focus:text-cyan-600">
            {help}
          </span>
        </div>
      </form>
    </div>
  );
}
