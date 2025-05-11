import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

export default function Stepper({ value, onChange, min, max }) {
  const handleIncrement = () => {
    const newValue = value + 1;
    if (newValue <= max) {
      onChange(newValue, "number");
    }
  };

  const handleDecrement = () => {
    const newValue = value - 1;
    if (newValue >= min) {
      onChange(newValue, "number");
    }
  };

  return (
    <div className="order-4 col-start-1 row-2 mr-2 grid h-7.5 w-4 grid-cols-1 grid-rows-2 items-center gap-0.5 justify-self-end bg-transparent p-0.5">
      <button
        className="cursor-pointer border-none bg-transparent p-0 transition-colors hover:bg-cyan-700"
        aria-label="Increment"
        onClick={handleIncrement}
      >
        <BsFillCaretUpFill className="h-3 w-4 pr-1" />
      </button>

      <button
        className="cursor-pointer border-none bg-transparent p-0 transition-colors hover:bg-cyan-700"
        aria-label="Decrement"
        onClick={handleDecrement}
      >
        <BsFillCaretDownFill className="h-3 w-4 pr-1" />
      </button>
    </div>
  );
}
