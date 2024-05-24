import { createContext, useContext, useEffect, useState } from "react";

import { ChildrenProp } from "../types/ChildrenProp";

enum ThemeTypes {
  DARK = "dark",
  LIGHT = "light",
  DEFAULT = "default",
}

interface Theme {
  theme: ThemeTypes;
  setTheme: React.Dispatch<React.SetStateAction<ThemeTypes>>;
}

const ThemeContext = createContext<Theme | null>(null);

function ThemeProvider({ children }: ChildrenProp) {
  const [theme, setTheme] = useState<ThemeTypes>(() => {
    // 1. Get info about theme preference from local storage
    let theme = localStorage.getItem("theme") as ThemeTypes | null;
    if (theme === ThemeTypes.DARK || theme === ThemeTypes.LIGHT) return theme;

    // 1.5. If prefered theme === DEFAULT
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (theme === ThemeTypes.DEFAULT) {
      if (darkThemeMq.matches) {
        localStorage.setItem("theme", ThemeTypes.DARK);
      } else {
        localStorage.setItem("theme", ThemeTypes.DARK);
      }
      return theme;
    }

    // 2. If local storage doesn't exist get system prefered theme
    if (!theme) {
      if (darkThemeMq.matches) {
        theme = ThemeTypes.DARK;
      } else {
        theme = ThemeTypes.LIGHT;
      }
    }

    // 3. Set theme to local storage
    localStorage.setItem("theme", theme);

    // 4. Set theme
    return theme;
  });

  useEffect(() => {
    if (theme === ThemeTypes.DEFAULT) {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) setTheme(ThemeTypes.DARK);
      if (!darkThemeMq.matches) setTheme(ThemeTypes.LIGHT);
    }
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
