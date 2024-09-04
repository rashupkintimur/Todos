import { FC } from "react";

type InputDateProps = {
  id?: string;
  date: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

export const InputDate: FC<InputDateProps> = ({ id, date, onChange }) => {
  return (
    <input
      id={id}
      value={date}
      onChange={onChange}
      type="date"
      className="text-base sm:text-xl rounded p-2 text-slate-950 border border-gray-300 cursor-pointer dark:bg-zinc-800 dark:text-white"
    />
  );
};
