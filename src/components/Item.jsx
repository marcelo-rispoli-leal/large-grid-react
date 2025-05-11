export default function Item({ index, name, age, backgroundColor, lower }) {
  return (
    <div
      key={index}
      id={`user-${index}`}
      style={{ backgroundColor }}
      className="f-md content-center rounded-xl p-1 wrap-anywhere transition-all duration-300 ease-in-out"
      role="listitem"
      aria-label={`Usuário ${name}, ${age} anos`}
      age={age}
      lower={lower}
    >{`${name}, ${age}`}</div>
  );
}
