import { BsSearch } from "react-icons/bs";
import Stepper from "./Stepper";

const limit = ~~Number(import.meta.env.VITE_AGE_LIMIT);
const ageMin = -1;
const ageMax = limit >= 0 && limit <= 359 ? limit : 99;

export default function Filter({ id, type, label, help, value, onChange }) {
  //change input event
  const handleChange = ({ target }) => {
    const { type, value } = target;
    if (type !== "number" || (~~value >= ageMin && ~~value <= ageMax)) {
      onChange(type !== "number" ? value : ~~value, type);
    }
  };

  //return component
  return (
    <div className="b-std p-3 transition-all duration-300 ease-in-out" role="group" aria-labelledby={`${id}-label`}>
      <div className="grid items-center">
        <input
          id={id}
          className="peer f-md b-std order-3 col-start-1 row-2 my-1 w-full [appearance:textfield] py-0 pr-0 pl-9 leading-7.5 [-moz-appearance:textfield] focus:ring-1 focus:ring-cyan-700 focus:outline-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none transition-all duration-300 ease-in-out"
          type={type}
          value={value}
          min={type === "number" ? ageMin : undefined}
          max={type === "number" ? ageMax : undefined}
          onChange={handleChange}
          aria-describedby={`${id}-help`}
        />
        <label id={`${id}-label`} htmlFor={id} className="order 1 row-1 peer-focus:text-cyan-700 transition-colors duration-300">
          {label}
        </label>
        <BsSearch className="f-md order-2 col-start-1 row-2 ml-3 peer-focus:text-cyan-700 transition-colors duration-300" aria-hidden="true" />
        {type === "number" && (
          <Stepper
            value={value}
            onChange={onChange}
            min={ageMin}
            max={ageMax}
          />
        )}
        <span id={`${id}-help`} className="order-5 row-3 text-sm peer-focus:text-cyan-700 transition-colors duration-300">
          {help}
        </span>
      </div>
    </div>
  );
}
