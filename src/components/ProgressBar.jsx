import useUnmountProgressBar from "../hooks/useUnmountProgressBar";

export default function ProgressBar({ current, max }) {
  const progress = Math.round((current / max) * 100);
  const show = useUnmountProgressBar(progress);

  if (!show) return null;

  return (
    <div role="region" aria-label="Loading progress ">
      <div className="grid h-full grid-rows-1 items-center text-neutral-200">
        <div className="h-5 w-full rounded-full bg-neutral-500">
          <div
            className="h-5 rounded-full bg-cyan-700 transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span className="sr-only">{progress}% loaded</span>
          </div>
        </div>
        <div className="mt-[-1.5rem] h-4 text-sm font-bold">
          Loaded: {current.toLocaleString("en")} / {max.toLocaleString("en")} (
          {progress}%){" "}
        </div>
      </div>
    </div>
  );
}
