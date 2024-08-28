import { FC } from "react";
import { Header } from "../Header";
import { Main } from "../../pages/Main";

type LayoutProps = {};

export const Layout: FC<LayoutProps> = () => {
  return (
    <div>
      <Header />
      <main className="pt-10 pb-10">
        <Main />
      </main>
    </div>
  );
};
