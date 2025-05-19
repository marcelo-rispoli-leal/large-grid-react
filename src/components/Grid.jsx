// Exports the Grid to import in the App
import { BsArrowRepeat } from "react-icons/bs";
import { useGridMaxHeight } from "../hooks/useGridMaxHeight";
import Cell from "./Cell";

export default function Grid({ cells }) {
  const { gridRef, maxHeight } = useGridMaxHeight();

  // Classes for grid layout
  const gridLayoutClasses =
    "b-std bg-neutral-300 text-neutral-200 dark:bg-neutral-700 grid gap-3 overflow-y-auto p-3 max-3xs:grid-cols-1 3xs:grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 xm:grid-cols-6 3xl:grid-cols-15 4xl:grid-cols-20 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10";
  // Classes for spinner container layout
  const spinnerLayoutClasses = "flex justify-center items-center";

  return (
    <div
      ref={gridRef}
      style={{ maxHeight }}
      role={!maxHeight ? "status" : "list"}
      aria-label={!maxHeight ? "Loading users grid" : "Users grid"}
      className={!maxHeight ? spinnerLayoutClasses : gridLayoutClasses}
    >
      {!maxHeight ? (
        <BsArrowRepeat className="animate-spin text-5xl text-cyan-700" />
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
