import { useContext } from "react";
import { ThemeButton } from "../ThemeButton";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageSwitcher } from "../LanguageSwitcher";

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
      <div className="container mx-auto lg:p-5 p-3 grid gap-5 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-5xl justify-self-center font-mono font-bold text-slate-900 dark:text-white">
          Todos
        </h1>
        <div className="justify-self-center flex items-center gap-5 sm:gap-20">
          <LanguageSwitcher />
          <ThemeButton theme={theme} changeTheme={changeTheme} />
        </div>
      </div>
    </header>
  );
};
