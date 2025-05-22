// ThemeProvider dependencies
import { ThemeContext } from "../hooks/useThemeContext.js";
import { useThemeProvider } from "../hooks/useThemeProvider.js";
// Exports the ThemeProvider for import into the page index component
export function ThemeProvider({ children }) {
  // Retrieves isDarkTheme state and toggleTheme function to pass to the App
  const { isDarkTheme, toggleTheme } = useThemeProvider();
  // Returns the ThemeProvider component
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
