import { FC } from "react";
import { TModal } from "../../types/TModal";

type FormButtonProps = {
  type: TModal;
};

export const FormButton: FC<FormButtonProps> = ({ type }) => {
  return (
    <button
      className={`${
        type === "create" ? "bg-red-500" : "bg-emerald-500"
      } text-lg text-white px-4 py-2 rounded justify-self-start`}
    >
      {type === "create" ? "Создать" : "Изменить"}
    </button>
  );
};
