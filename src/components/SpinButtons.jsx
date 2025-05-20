// Exports the Spin Buttons to import in the Age Filter
import Colors from "../scripts/Colors";
import { DEFAULT_AGE_FILTER } from "../hooks/useGridFilters";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

export default function SpinButtons({ value, onChange, min, max }) {
  const { ageMax } = Colors();
  const checkMinValue = value === DEFAULT_AGE_FILTER;
  const checkMaxValue = value === ageMax;

  const handleIncrement = () => {
    const newValue = value + 1;
    if (newValue <= max) {
      onChange(newValue, "number");
    }
  };

  const handleDecrement = () => {
    const newValue = value - 1;
    if (newValue >= min) {
      onChange(newValue, "number");
    }
  };

  return (
    <div className="col-start-1 row-2 mr-9 grid h-7.5 w-4 grid-cols-1 grid-rows-2 items-center justify-self-end bg-transparent p-0.5">
      <button
        className="transition-colors enabled:cursor-pointer enabled:hover:bg-cyan-700 disabled:text-neutral-600 dark:disabled:text-neutral-400"
        role="spinbutton"
        disabled={checkMaxValue}
        aria-disabled={checkMaxValue}
        aria-label="Increment"
        onClick={handleIncrement}
      >
        <BsFillCaretUpFill className="h-3 w-4 pr-1" />
      </button>

      <button
        className="transition-colors enabled:cursor-pointer enabled:hover:bg-cyan-700 disabled:text-neutral-600 dark:disabled:text-neutral-400"
        role="spinbutton"
        disabled={checkMinValue}
        aria-disabled={checkMinValue}
        aria-label="Decrement"
        onClick={handleDecrement}
      >
        <BsFillCaretDownFill className="h-3 w-4 pr-1" />
      </button>
    </div>
  );
}
