import React, { FC, useEffect, useState } from "react";
import { TTheme } from "../types/TTheme";
import { ThemeContext } from "../context/ThemeContext";

type ThemeProps = {
  children: React.ReactNode;
};

const themeFromStorage = localStorage.getItem("theme") || "light";

export const ThemeProvider: FC<ThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState(themeFromStorage);

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme, theme: theme as TTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
