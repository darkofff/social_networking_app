import { createContext, useContext, useEffect, useState } from "react";

import { ChildrenProp } from "../types/ChildrenProp";

interface Theme {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<Theme | null>(null);

function ThemeProvider({ children }: ChildrenProp) {
  const [theme, setTheme] = useState<string>(() => {
    // 1. Get info about theme preference from local storage
    let theme = localStorage.getItem("theme");
    if (theme === "dark" || theme === "light") return theme;

    // 2. If local storage doesn't exist get system prefered theme
    if (!theme) {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        theme = "dark";
      } else {
        theme = "light";
      }
    }

    // 3. Set theme to local storage
    localStorage.setItem("theme", theme);

    // 4. Set theme
    return theme;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme used outside ThemeProvider");
  return context;
}

export { ThemeProvider, useTheme };
