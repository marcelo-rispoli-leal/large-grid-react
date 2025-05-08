export default function Summary({ users, columns }) {
  const rest = columns > 0 && users % columns > 0 ? 1 : 0;
  const lines = columns > 0 ? ~~(users / columns) + rest : 0;

  return (
    <div className="b-std bg-cyan-700 p-3">
      <div className="grid h-full items-center text-neutral-100">
        <div>
          Users Founded: <strong>{users}</strong>
        </div>
        <div>
          Number of Lines: <strong>{lines}</strong>
        </div>
      </div>
    </div>
  );
}
