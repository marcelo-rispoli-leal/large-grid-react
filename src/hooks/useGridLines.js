import { useMemo } from "react";

// Named constants
const MIN_LINES = 0;
const MIN_COLUMNS = 0;
const REST_DIVISOR = 1;

export default function useGridLines(columns, itemsCount) {
  return useMemo(() => {
    const rest =
      columns > MIN_COLUMNS && itemsCount % columns > MIN_COLUMNS
        ? REST_DIVISOR
        : MIN_COLUMNS;
    const lines =
      columns > MIN_COLUMNS ? ~~(itemsCount / columns) + rest : MIN_LINES;
    return { lines };
  }, [columns, itemsCount]);
}
