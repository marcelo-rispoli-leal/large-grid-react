import { useEffect, useRef, useState } from "react";

export function useGridMaxHeight() {
  const gridRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("");

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const updateMaxHeight = () => {
      const calcMaxHeight =
        window.innerHeight - grid.offsetTop - 24 >= 160
          ? window.innerHeight - grid.offsetTop - 24
          : 160;
      setMaxHeight(calcMaxHeight + "px");
    };

    updateMaxHeight();

    const maxHeightObserver = new ResizeObserver(updateMaxHeight);
    maxHeightObserver.observe(grid);

    return () => {
      maxHeightObserver.disconnect();
    };
  }, []);

  return { gridRef, maxHeight };
}
