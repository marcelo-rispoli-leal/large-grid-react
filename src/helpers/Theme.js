import { useState, useEffect } from "react";

export default function Theme() {
  const [isDark, setIsDark] = useState(false);

  // Inicializa o tema com base na classe 'dark' no elemento HTML
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Atualiza a classe no elemento HTML e salva a preferência no localStorage
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return { isDark, toggleTheme };
}
