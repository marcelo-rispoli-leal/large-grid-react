import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Theme from "../helpers/Theme";

export default function Toggle() {
  const { isDark, toggleTheme } = Theme();

  return (
    <button
      onClick={toggleTheme}
      className="b-std flex h-10 w-20 cursor-pointer items-center justify-between rounded-[0.75rem] bg-neutral-500 p-1"
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      <div
        className={`flex h-8 w-8 transform items-center justify-center rounded-[0.75rem] bg-white text-[1.5rem] text-yellow-500 shadow-md transition-transform ${
          isDark ? "translate-x-10 text-[1.25rem]" : "translate-x-0"
        } dark:bg-neutral-900 dark:text-neutral-100`}
      >
        {isDark ? <BsFillMoonFill /> : <BsFillSunFill />}
      </div>
    </button>
  );
}
