// Exports the Theme Toggler to import in the NavBar
import { BsSun, BsMoon } from "react-icons/bs";
import { useThemeContext } from "../hooks/useThemeContext";

export default function ThemeToggler() {
  const { isDarkTheme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="b-std bg-neutral-300 p-2 transition-colors hover:bg-cyan-700 dark:bg-neutral-700"
      role="switch"
      aria-label={
        isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {isDarkTheme ? (
        <BsSun className="h-5 w-5" />
      ) : (
        <BsMoon className="h-5 w-5" />
      )}
    </button>
  );
}
