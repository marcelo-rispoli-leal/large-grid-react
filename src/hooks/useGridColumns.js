import { useState, useEffect } from "react";
import { queries, columns } from "../helpers/Breakpoints";

export default function useGridColumns() {
  const [breakpoint, setBreakpoint] = useState(null);

  useEffect(() => {
    const cleanupFunctions = [];

    Object.entries(queries).forEach(([name, query]) => {
      const mediaQuery = window.matchMedia(query);

      const handler = (event) => {
        if (event.matches) {
          setBreakpoint(name);
        }
      };

      mediaQuery.addEventListener("change", handler);

      if (mediaQuery.matches) {
        setBreakpoint(name);
      }

      cleanupFunctions.push(() => {
        mediaQuery.removeEventListener("change", handler);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return columns[breakpoint];
}
