// Grid dependencies
import { BsArrowRepeat } from "react-icons/bs";
import { useGridMaxHeight } from "../hooks/useGridMaxHeight";
import Cell from "./Cell";
// Exports the Grid for import into the App
export default function Grid({ cells }) {
  // Runs script to get the max height and reference of the Grid
  const { gridRef, maxHeight } = useGridMaxHeight();
  // Classes for Grid and preloader Spinner
  const spinnerClasses = "flex items-center justify-center";
  const gridClasses =
    "max-3xs:grid-cols-1 3xs:grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 xm:grid-cols-6 3xl:grid-cols-10 3xl:gap-[15px] 3xl:rounded-[15px] 3xl:p-[15px] 4xl:gap-[18px] 4xl:rounded-[18px] 4xl:p-[18px] b-std grid gap-[12px] overflow-y-auto rounded-[12px] bg-neutral-300 p-[12px] text-neutral-100 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 dark:bg-neutral-700";
  // Returns the Grid component
  return (
    <div
      id="grid"
      ref={gridRef}
      style={{ maxHeight }}
      role={!maxHeight ? "status" : "list"}
      aria-label={!maxHeight ? "Loading users grid" : "Users grid"}
      className={!maxHeight ? spinnerClasses : gridClasses}
    >
      {!maxHeight ? (
        <BsArrowRepeat className="3xl:text-[60px] 4xl:text-[72px] animate-spin text-[48px] text-teal-700" />
      ) : (
        cells.map(({ index, name, age, color, lower }) => (
          <Cell
            key={index}
            id={`user-${index}`}
            name={name}
            age={age}
            backgroundColor={color}
            lower={lower}
          />
        ))
      )}
    </div>
  );
}
