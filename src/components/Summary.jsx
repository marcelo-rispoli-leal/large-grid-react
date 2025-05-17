export default function Summary({ count, lines }) {
  return (
    <div
      className="b-std bg-cyan-700 p-3"
      role="region"
      aria-label="Users Summary"
    >
      <div className="grid h-full items-center text-neutral-200">
        <div>
          Users Founded:{" "}
          <strong aria-label={`${count.toLocaleString("en")} users founded`}>
            {count.toLocaleString("en")}
          </strong>
        </div>
        <div>
          Number of Lines:{" "}
          <strong aria-label={`${lines.toLocaleString("en")} lines`}>
            {lines.toLocaleString("en")}
          </strong>
        </div>
      </div>
    </div>
  );
}
