// Exports each Filter to import in the App
import { BsFunnelFill } from "react-icons/bs";
import SpinButtons from "./SpinButtons";
import ResetButton from "./ResetButton";

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
    <div
      className="b-std bg-neutral-200 p-3 transition-colors dark:bg-neutral-800"
      role="group"
      aria-labelledby={`${id}-label`}
    >
      <div className="grid items-center transition-colors">
        <input
          id={id}
          className="peer f-md b-std col-start-1 row-2 my-1 w-full [appearance:textfield] bg-neutral-300 py-0 pr-0 pl-9 leading-7.5 transition-colors [-moz-appearance:textfield] focus:ring-1 focus:ring-cyan-700 focus:outline-0 dark:bg-neutral-700 dark:text-neutral-200 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type={type}
          value={value}
          min={type === "number" ? ageMin : undefined}
          max={type === "number" ? ageMax : undefined}
          onChange={handleChange}
          aria-describedby={`${id}-help`}
        />
        <label
          id={`${id}-label`}
          htmlFor={id}
          className="row-1 transition-colors peer-focus:text-cyan-700"
        >
          {label}
        </label>
        <BsFunnelFill
          className="f-md col-start-1 row-2 ml-3 h-5 w-5 transition-colors peer-focus:text-cyan-700"
          aria-hidden="true"
        />
        {type === "number" && (
          <SpinButtons
            value={value}
            onChange={onChange}
            min={ageMin}
            max={ageMax}
          />
        )}
        <ResetButton value={value} type={type} onChange={onChange} />
        <span
          id={`${id}-help`}
          className="row-3 text-sm transition-colors peer-focus:text-cyan-700"
        >
          {help}
        </span>
      </div>
    </div>
  );
}
