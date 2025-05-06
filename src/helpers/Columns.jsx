import { useState, useEffect } from "react";

// Media Query for each breakpoint
const breakpoints = {
  "4xs": "(max-width: 255px)",
  "3xs": "(min-width: 256px) and (max-width: 383px)",
  "2xs": "(min-width: 384px) and (max-width: 511px)",
  xs: "(min-width: 512px) and (max-width: 639px)",
  sm: "(min-width: 640px) and (max-width: 767px)",
  md: "(min-width: 768px) and (max-width: 895px)",
  xm: "(min-width: 896px) and (max-width: 1023px)",
  lg: "(min-width: 1024px) and (max-width: 1279px)",
  xl: "(min-width: 1280px) and (max-width: 1535px)",
  "2xl": "(min-width: 1536px)",
};

// Columns quantity for each breakpoint
const columns = {
  "4xs": 1,
  "3xs": 2,
  "2xs": 3,
  xs: 4,
  sm: 4,
  md: 5,
  xm: 6,
  lg: 7,
  xl: 8,
  "2xl": 10,
};

export default function Columns() {
  const [breakpoint, setBreakpoint] = useState(null);

  useEffect(() => {
    // Creation of a list for listeners and media queries cleanup
    const cleanupFunctions = [];

    Object.entries(breakpoints).forEach(([name, query]) => {
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
