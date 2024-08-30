import { FC } from "react";
import { Header } from "../Header";
import { Main } from "../../pages/Main";
import { ThemeProvider } from "../../providers/ThemeProvider";

type LayoutProps = {};

export const Layout: FC<LayoutProps> = () => {
  return (
    <ThemeProvider>
      <Header />
      <main className="pt-10 pb-10 dark:bg-zinc-950 flex-grow">
        <Main />
      </main>
    </ThemeProvider>
  );
};
