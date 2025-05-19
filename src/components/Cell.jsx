// Exports each Cell to import in the Grid
export default function Cell({ id, name, age, backgroundColor, lower }) {
  return (
    <div
      id={id}
      style={{ backgroundColor }}
      className="f-md content-center rounded-xl p-1 wrap-anywhere"
      role="listitem"
      aria-label={`User ${name}, ${age} years`}
      age={age}
      lower={lower}
    >{`${name}, ${age}`}</div>
  );
}
