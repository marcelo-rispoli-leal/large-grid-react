// Exports the Theme Provider to import in the index.js
import { ThemeContext } from "../hooks/useThemeContext.js";
import { useThemeProvider } from "../hooks/useThemeProvider.js";

export function ThemeProvider({ children }) {
  const { isDarkTheme, toggleTheme } = useThemeProvider();

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
