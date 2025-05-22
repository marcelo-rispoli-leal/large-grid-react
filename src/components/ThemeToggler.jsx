// ThemeToggler dependencies
import { BsSun, BsMoon } from "react-icons/bs";
import { useThemeContext } from "../hooks/useThemeContext";
// Exports the ThemeToggler to import in the NavBar
export default function ThemeToggler() {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  // Returns the ThemeToggler component
  return (
    <button
      onClick={toggleTheme}
      className="3xl:w-[60px] 3xl:rounded-[15px] 3xl:p-[10px] 4xl:w-[72px] 4xl:rounded-[18px] 4xl:p-[12px] b-std h-full w-[48px] rounded-[12px] bg-neutral-300 p-[8px] transition-colors hover:bg-teal-700 dark:bg-neutral-700"
      role="switch"
      aria-label={
        isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {isDarkTheme ? (
        <BsSun className="h-full w-full" />
      ) : (
        <BsMoon className="h-full w-full" />
      )}
    </button>
  );
}
