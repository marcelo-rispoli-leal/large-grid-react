import { BsSearch } from "react-icons/bs";

export default function Filter({ id, type, label, help, value, onChange }) {
  //change input event
  const handleChange = (event) => {
    onChange(event.target.value, event.target.type);
  };

  //return component
  return (
    <div className="b-std p-3">
      <div className="grid items-center">
        <input
          id={id}
          className="peer f-md b-std order-3 col-start-1 row-2 my-1 w-full py-0 pr-0 pl-9 leading-7.5 focus:ring-1 focus:ring-cyan-600 focus:outline-0"
          type={type}
          value={value}
          min={type === "number" ? "-1" : undefined}
          max={type === "number" ? "99" : undefined}
          onChange={handleChange}
        />
        <label htmlFor={id} className="order 1 row-1 peer-focus:text-cyan-600">
          {label}
        </label>
        <BsSearch className="f-md order-2 col-start-1 row-2 ml-3 peer-focus:text-cyan-600" />
        <span className="order-4 row-3 text-sm peer-focus:text-cyan-600">
          {help}
        </span>
      </div>
    </div>
  );
}
