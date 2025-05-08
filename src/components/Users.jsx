import { useEffect, useRef, useState } from "react";

export default function Users({ users }) {
  const containerRef = useRef(null);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  // Check the visibility of the scroll bar
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateScrollbarVisibility = () => {
      const hasVerticalScroll = container.scrollHeight > container.clientHeight;
      setIsScrollbarVisible(hasVerticalScroll);
    };

    // Initial check
    updateScrollbarVisibility();

    // Observe size changes
    const resizeObserver = new ResizeObserver(updateScrollbarVisibility);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-neutral-100 scrollbar-track-neutral-500 ${isScrollbarVisible ? "b-lr" : "b-std"} max-h-64 overflow-x-hidden overflow-y-auto p-3`}
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

/* className={`scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-neutral-200 scrollbar-track-neutral-600 ${isScrollbarVisible ? "b-lr" : "b-std"} max-h-64 overflow-x-hidden overflow-y-auto p-3`} */
