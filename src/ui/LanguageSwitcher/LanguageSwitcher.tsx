import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type LanguageSwitcherProps = {};

export const LanguageSwitcher: FC<LanguageSwitcherProps> = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => changeLanguage("en")}
        className="text-slate-800 dark:text-white text-xl hover:text-red-500 active:text-red-700 focus:outline-none focus:ring focus:ring-red-500 duration-150"
      >
        {t("english")}
      </button>
      <button
        onClick={() => changeLanguage("ru")}
        className="text-slate-800 dark:text-white text-xl hover:text-red-500 active:text-red-700 focus:outline-none focus:ring focus:ring-red-500 duration-150"
      >
        {t("russian")}
      </button>
    </div>
  );
};
