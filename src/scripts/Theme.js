// Checks the user theme preferency
localStorage.theme === "dark" ||
(!("theme" in localStorage) &&
  window.matchMedia("(prefers-color-scheme: dark)").matches)
  ? document.documentElement.classList.add("dark")
  : document.documentElement.classList.remove("dark");
