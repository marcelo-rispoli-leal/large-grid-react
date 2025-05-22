// Exports each Cell for import into the Grid component
export default function Cell({ id, name, age, backgroundColor, lower }) {
  return (
    <div
      id={id}
      style={{ backgroundColor }}
      className="3xl:rounded-[15px] 3xl:p-[5px] 3xl:text-[20px] 3xl:leading-[30px] 4xl:rounded-[18px] 4xl:p-[6px] 4xl:text-[24px] 4xl:leading-[36px] content-center rounded-[12px] p-[4px] leading-[24px] font-medium wrap-anywhere"
      role="listitem"
      aria-label={`User ${name}, ${age} years`}
      age={age}
      lower={lower}
    >{`${name}, ${age}`}</div>
  );
}
