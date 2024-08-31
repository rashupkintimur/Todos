import { FC } from "react";
import { TButtonModal } from "../../types/TButtonModal";

type FormButtonProps = {
  type: TButtonModal;
  onClick?: () => void;
};

const createAndDeleteClass = "bg-red-500 hover:bg-red-600 active:bg-red-700";
const editClass = "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700";

export const FormButton: FC<FormButtonProps> = ({
  type,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        type === "edit" ? editClass : createAndDeleteClass
      } text-lg text-white px-4 py-2 rounded justify-self-start`}
    >
      {type === "create" ? "Создать" : type === "edit" ? "Изменить" : "Удалить"}
    </button>
  );
};
