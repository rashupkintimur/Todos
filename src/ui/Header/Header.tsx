import { FC } from "react";

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  return (
    <header className="bg-white shadow-lg shadow-black/7">
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-mono font-bold text-slate-900">Todos</h1>
      </div>
    </header>
  );
};
