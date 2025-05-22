// ResetButton dependencies
// prettier-ignore
import { DEFAULT_AGE_FILTER, DEFAULT_NAME_FILTER } from "../hooks/useGridFilters";
import { BsXLg } from "react-icons/bs";
// Exports the Reset Button to import in the Filters
export default function ResetButton({ value, type, onChange }) {
  // Checks if the filter has your default value to disable the button
  const checkDefaultValue =
    (type === "number" && value === DEFAULT_AGE_FILTER) ||
    value === DEFAULT_NAME_FILTER;
  // Handler to reset the filter with his default value
  const handleResetFilter = () => {
    // prettier-ignore
    onChange(type === "number" ? DEFAULT_AGE_FILTER : DEFAULT_NAME_FILTER, type);
  };
  // Returns the Reset Button component
  return (
    <div className="3xl:w-[25px] 4xl:w-[30px] 3xl:h-[25px] 4xl:h-[30px] 3xl:mr-[15px] 4xl:mr-[18px] col-start-1 row-2 mr-[12px] grid h-[20px] w-[20px] justify-self-end">
      <button
        className="transition-colors enabled:cursor-pointer enabled:hover:bg-teal-700 disabled:text-neutral-600 dark:disabled:text-neutral-400"
        onClick={handleResetFilter}
        disabled={checkDefaultValue}
        aria-disabled={checkDefaultValue}
        aria-label="Reset filter"
      >
        <BsXLg className="h-full w-full" />
      </button>
    </div>
  );
}
