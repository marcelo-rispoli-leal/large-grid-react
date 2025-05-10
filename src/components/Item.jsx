export default function Item({ index, name, age, backgroundColor, lower }) {
  return (
    <div
      key={index}
      id={`user-${index}`}
      style={{ backgroundColor }}
      className="f-md content-center rounded-xl p-1 wrap-anywhere"
      age={age}
      lower={lower}
    >{`${name}, ${age}`}</div>
  );
}
