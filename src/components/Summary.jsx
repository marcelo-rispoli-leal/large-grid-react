// Exports the Summary to import in the App
import { DEV_MODE } from "../hooks/useGridFilters";

export default function Summary({ count, lines }) {
  DEV_MODE && console.log(`Summary props: count=${count} lines=${lines}`);

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
