import { useState, useEffect } from "react";
import { queries, columns } from "./Breakpoints";

export default function Columns() {
  const [breakpoint, setBreakpoint] = useState(null);

  useEffect(() => {
    // Creation of a list for listeners and media queries cleanup
    const cleanupFunctions = [];

    Object.entries(queries).forEach(([name, query]) => {
      const mediaQuery = window.matchMedia(query);

      // Function to handle breakpoint changes
      const handler = (event) => {
        if (event.matches) {
          setBreakpoint(name);
        }
      };

      // Add listener to detect breakpoint change
      mediaQuery.addEventListener("change", handler);

      // Check initial breakpoint
      if (mediaQuery.matches) {
        setBreakpoint(name);
      }

      // Store cleanup function
      cleanupFunctions.push(() => {
        mediaQuery.removeEventListener("change", handler);
      });
    });

    // Run listeners cleanup
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  // Returns the number of columns for the current breakpoint
  return columns[breakpoint];
}
