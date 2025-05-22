// Filter dependencies
import ResetButton from "./ResetButton";
import SpinButtons from "./SpinButtons";
import { BsFunnelFill } from "react-icons/bs";
import { DEFAULT_AGE_FILTER } from "../hooks/useGridFilters";
// Constants to set the age filter limits
const limit = ~~Number(import.meta.env.VITE_AGE_LIMIT);
const ageMin = DEFAULT_AGE_FILTER;
const ageMax = limit >= 0 && limit <= 359 ? limit : 99;
// Exports each Filter to import in the App
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
      className="3xl:rounded-[15px] 3xl:px-[15px] 3xl:py-[5px] 4xl:rounded-[18px] 4xl:px-[18px] 4xl:py-[6px] b-std grid grid-rows-3 items-center rounded-[12px] bg-neutral-200 px-[12px] py-[4px] transition-colors dark:bg-neutral-800"
      role="group"
      aria-labelledby={`${id}-label`}
    >
      <input
        id={id}
        className="peer 3xl:my-[5px] 3xl:rounded-[15px] 3xl:pl-[45px] 3xl:text-[20px] 3xl:leading-[40px] 4xl:my-[6px] 4xl:rounded-[18px] 4xl:pl-[54px] 4xl:text-[24px] 4xl:leading-[48px] b-std col-start-1 row-2 my-[4px] w-full [appearance:textfield] rounded-[12px] bg-neutral-300 pl-[36px] text-[16px] leading-[32px] font-medium transition-colors [-moz-appearance:textfield] dark:bg-neutral-700 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
        className="3xl:text-[20px] 3xl:leading-[25px] 4xl:text-[24px] 4xl:leading-[30px] row-1 self-end leading-[20px] font-medium transition-colors peer-focus:text-teal-700"
      >
        {label}
      </label>
      <BsFunnelFill
        className="3xl:ml-[15px] 3xl:h-[25px] 3xl:w-[25px] 4xl:ml-[18px] 4xl:h-[30px] 4xl:w-[30px] col-start-1 row-2 ml-[12px] h-[20px] w-[20px] transition-colors peer-focus:text-teal-700"
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
        className="3xl:text-[20px] 3xl:leading-[25px] 4xl:text-[24px] 4xl:leading-[30px] row-3 self-start leading-[20px] transition-colors peer-focus:text-teal-700"
      >
        {help}
      </span>
    </div>
  );
}
