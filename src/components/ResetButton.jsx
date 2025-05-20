// Exports the Reset Button to import in the Filters
// prettier-ignore
import { DEFAULT_AGE_FILTER, DEFAULT_NAME_FILTER} from "../hooks/useGridFilters";
import { BsXLg } from "react-icons/bs";

export default function ResetButton({ value, type, onChange }) {
  const checkDefaultValue =
    (type === "number" && value === DEFAULT_AGE_FILTER) ||
    value === DEFAULT_NAME_FILTER;

  const handleResetFilter = () => {
    // prettier-ignore
    onChange(type === "number" ? DEFAULT_AGE_FILTER : DEFAULT_NAME_FILTER, type);
  };

  return (
    <div className="col-start-1 row-2 mr-3 grid w-5 justify-self-end">
      <button
        className="border-none bg-transparent p-0 align-middle transition-colors enabled:cursor-pointer enabled:hover:bg-cyan-700 disabled:text-neutral-600 dark:disabled:text-neutral-400"
        onClick={handleResetFilter}
        disabled={checkDefaultValue}
        aria-disabled={checkDefaultValue}
        aria-label="Reset filter"
      >
        <BsXLg className="h-5 w-5" />
      </button>
    </div>
  );
}
