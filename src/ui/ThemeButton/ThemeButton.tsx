import { FC } from "react";
import { TTheme } from "../../types/TTheme";

type ThemeButtonProps = {
  theme: TTheme;
  changeTheme: () => void;
};

export const ThemeButton: FC<ThemeButtonProps> = ({ theme, changeTheme }) => {
  return (
    <button
      onClick={changeTheme}
      aria-label="Смена темы"
      className="focus:outline-none focus:ring focus:ring-red-500"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${theme === "dark" ? "hidden" : ""}`}
      >
        <circle cx="12" cy="12" r="5" fill="none" className="fill-slate-900" />
        <g stroke="none" className="stroke-slate-900" strokeWidth="2">
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </g>
      </svg>
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${theme === "light" ? "hidden" : ""}`}
      >
        <path
          d="M21 12.79C20.85 12.79 20.7 12.79 20.54 12.79C15.8 12.79 12 8.99 12 4.25C12 4.09 12 3.94 12 3.79C9.39 4.81 7.5 7.42 7.5 10.5C7.5 14.09 10.41 17 14 17C17.08 17 19.69 15.11 20.71 12.5C20.56 12.5 20.42 12.5 20.27 12.5H21Z"
          fill="none"
          className="fill-white"
        />
      </svg>
    </button>
  );
};
