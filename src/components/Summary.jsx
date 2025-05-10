export default function Summary({ count, lines }) {
  return (
    <div className="b-std bg-cyan-700 p-3">
      <div className="grid h-full items-center text-neutral-100">
        <div>
          Users Founded: <strong>{count}</strong>
        </div>
        <div>
          Number of Lines: <strong>{lines}</strong>
        </div>
      </div>
    </div>
  );
}
