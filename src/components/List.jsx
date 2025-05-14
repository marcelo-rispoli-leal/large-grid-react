import { useEffect, useRef, useState } from "react";
import Item from "./Item";

export default function List({ items }) {
  const containerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("");

  // Calc max height of list container
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateMaxHeight = () => {
      const calcMaxHeight =
        window.innerHeight - container.offsetTop - 36 >= 240
          ? window.innerHeight - container.offsetTop - 36
          : 240;
      setMaxHeight(calcMaxHeight + "px");
    };

    // Initial calc
    updateMaxHeight();

    // Observe size changes
    const maxHeightObserver = new ResizeObserver(updateMaxHeight);
    maxHeightObserver.observe(container);

    return () => {
      maxHeightObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ maxHeight }}
      className="b-std overflow-y-auto p-3 transition-all duration-300 ease-in-out"
      role="list"
      aria-label="Users list"
    >
      <div className="max-3xs:grid-cols-1 3xs:grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 xm:grid-cols-6 3xl:grid-cols-15 4xl:grid-cols-20 grid gap-3 text-neutral-200 transition-all duration-300 ease-in-out md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10">
        {items.map(({ index, name, age, color, lower }) => (
          <Item
            key={index}
            name={name}
            age={age}
            backgroundColor={color}
            lower={lower}
          />
        ))}
      </div>
    </div>
  );
}
