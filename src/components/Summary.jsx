// Exports the Summary for import into the App
export default function Summary({ loaded, progress, founded, lines }) {
  const loadedText = loaded.toLocaleString("en");
  const progressText = progress.toLocaleString("en");
  const foundedText = founded.toLocaleString("en");
  const linesText = lines.toLocaleString("en");
  const rowClasses = "3xl:text-[20px] 4xl:text-[24px]";
  // Returns the Summary component
  return (
    <div
      className="3xl:rounded-[15px] 3xl:p-[15px] 4xl:rounded-[18px] 4xl:p-[18px] b-std grid h-full grid-rows-3 items-center rounded-[12px] bg-teal-700 p-[12px] text-neutral-100"
      role="region"
      aria-label="Users Summary"
    >
      <div className={rowClasses}>
        Users Loaded:{" "}
        <strong aria-label={`${loadedText} users loaded (${progressText}%)`}>
          {`${loadedText} (${progressText}%)`}
        </strong>
      </div>
      <div className={rowClasses}>
        Users Founded:{" "}
        <strong aria-label={`${foundedText} users founded`}>
          {foundedText}
        </strong>
      </div>
      <div className={rowClasses}>
        Number of Lines:{" "}
        <strong aria-label={`${linesText} lines`}>{linesText}</strong>
      </div>
    </div>
  );
}
