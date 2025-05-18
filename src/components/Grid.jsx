import { useGridMaxHeight } from "../hooks/useGridMaxHeight";
import Cell from "./Cell";

export default function Grid({ cells }) {
  const { gridRef, maxHeight } = useGridMaxHeight();

  return (
    <div
      ref={gridRef}
      style={{ maxHeight }}
      role="list"
      aria-label="Users grid"
      className={`b-std max-3xs:grid-cols-1 3xs:grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 xm:grid-cols-6 3xl:grid-cols-15 4xl:grid-cols-20 grid gap-3 overflow-y-auto bg-neutral-300 p-3 text-neutral-200 transition-colors md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 dark:bg-neutral-700 ${!maxHeight && "invisible"}`}
    >
      {cells.map(({ index, name, age, color, lower }) => (
        <Cell
          key={`${index}-${name}`}
          name={name}
          age={age}
          backgroundColor={color}
          lower={lower}
        />
      ))}
    </div>
  );
}
