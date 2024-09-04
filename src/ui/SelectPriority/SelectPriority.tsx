import React, { FC } from "react";

type SelectPriorityProps = {
  id?: string;
  children: React.ReactNode;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

export const SelectPriority: FC<SelectPriorityProps> = ({
  id,
  children,
  onChange,
}) => {
  return (
    <select
      id={id}
      onChange={onChange}
      className="text-base sm:text-xl block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer dark:bg-zinc-800 dark:text-white"
    >
      {children}
    </select>
  );
};
