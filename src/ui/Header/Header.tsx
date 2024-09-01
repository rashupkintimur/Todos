import { useContext } from "react";
import { ThemeButton } from "../ThemeButton";
import { ThemeContext } from "../../context/ThemeContext";

export const Header = () => {
  const themeData = useContext(ThemeContext);

  if (!themeData) return;

  const theme = themeData.theme;
  const setTheme = themeData.setTheme;

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="bg-white dark:bg-zinc-800 shadow-lg shadow-black/7">
      <div className="container mx-auto p-5 flex items-center justify-between">
        <h1 className="text-5xl font-mono font-bold text-slate-900 dark:text-white">
          Todos
        </h1>
        <ThemeButton theme={theme} changeTheme={changeTheme} />
      </div>
    </header>
  );
};
