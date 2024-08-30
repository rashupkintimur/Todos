import { Dispatch, SetStateAction, createContext } from "react";
import { TTheme } from "../types/TTheme";

interface IThemeContext {
  theme: TTheme;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
