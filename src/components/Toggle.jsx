import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

export default function Toggle() {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="b-std p-2 transition-all duration-300 ease-in-out hover:bg-cyan-700"
      aria-label={isDarkTheme ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {isDarkTheme ? (
        <BsSun className="h-5 w-5 transition-all duration-300 ease-in-out" />
      ) : (
        <BsMoon className="h-5 w-5 transition-all duration-300 ease-in-out" />
      )}
    </button>
  );
}
