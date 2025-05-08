import { useEffect, useRef, useState } from "react";

export default function Users({ users }) {
  const containerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("");

  // Calc max height of users container
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateMaxHeight = () => {
      const calcMaxHeight =
        window.innerHeight - container.offsetTop - 36 >= 96
          ? window.innerHeight - container.offsetTop - 36
          : 96;
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
      className="scrollbar-users-container b-std overflow-y-auto p-3"
    >
      <div className="3xs:max-2xs:grid-cols-2 2xs:max-xs:grid-cols-3 xs:max-md:grid-cols-4 md:max-xm:grid-cols-5 xm:max-lg:grid-cols-6 grid grid-cols-1 gap-3 lg:max-xl:grid-cols-7 xl:max-2xl:grid-cols-8 2xl:grid-cols-10">
        {users.map(({ index, name, age, backgroundColor, lower }) => (
          <div
            key={index}
            id={`user-${index}`}
            style={{ backgroundColor }}
            className="f-md content-center rounded-xl p-1 wrap-anywhere"
            age={age}
            lower={lower}
          >{`${name}, ${age}`}</div>
        ))}
      </div>
    </div>
  );
}
