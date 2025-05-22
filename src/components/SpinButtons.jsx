// SpinButtons dependency
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
// Exports the Spin Buttons to import in the Age Filter
export default function SpinButtons({ value, onChange, min, max }) {
  // Checks if the filter has your min age to disable the decrement button
  const checkMinValue = value === min;
  // Checks if the filter has your max age to disable the increment button
  const checkMaxValue = value === max;
  // Returns the Spin Buttons component
  return (
    <div className="4xl:mr-[54px] 3xl:mr-[45px] 3xl:h-[35px] 4xl:h-[42px] 3xl:py-[2.5px] 4xl:py-[3px] 3xl:w-[20px] 4xl:w-[24px] col-start-1 row-2 mr-[36px] grid h-[28px] w-[16px] grid-cols-1 grid-rows-2 content-center justify-self-end py-[2px]">
      <button
        className="transition-colors enabled:cursor-pointer enabled:hover:bg-teal-700 disabled:text-neutral-600 dark:disabled:text-neutral-400"
        role="spinbutton"
        disabled={checkMaxValue}
        aria-disabled={checkMaxValue}
        aria-label="Increment"
        onClick={() => onChange(value + 1, "number")}
      >
        <BsFillCaretUpFill className="3xl:h-[15px] 4xl:h-[18px] h-[12px] w-full" />
      </button>
      <button
        className="transition-colors enabled:cursor-pointer enabled:hover:bg-teal-700 disabled:text-neutral-600 dark:disabled:text-neutral-400"
        role="spinbutton"
        disabled={checkMinValue}
        aria-disabled={checkMinValue}
        aria-label="Decrement"
        onClick={() => onChange(value - 1, "number")}
      >
        <BsFillCaretDownFill className="3xl:h-[15px] 4xl:h-[18px] h-[12px] w-full" />
      </button>
    </div>
  );
}
