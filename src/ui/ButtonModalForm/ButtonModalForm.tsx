import { FC } from "react";
import { TButtonModal } from "../../types/TButtonModal";
import { TFunction } from "i18next";

type ButtonModalFormProps = {
  type: TButtonModal;
  onClick?: () => void;
  t: TFunction<"translation", undefined>;
};

const createAndDeleteClass =
  "bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:bg-red-700 focus:ring-red-500 duration-150";
const markDoneClass =
  "bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:bg-violet-700 focus:ring-violet-500 duration-150";
const editClass =
  "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:ring focus:bg-emerald-700 focus:ring-emerald-500 duration-150";

export const ButtonModalForm: FC<ButtonModalFormProps> = ({
  type,
  onClick = () => {},
  t,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        type === "delete" || type === "create"
          ? createAndDeleteClass
          : type === "markDone"
          ? markDoneClass
          : editClass
      } text-lg text-white px-4 py-2 rounded justify-self-start`}
    >
      {type === "create"
        ? t("create")
        : type === "edit"
        ? t("edit")
        : type === "markDone"
        ? t("mark")
        : t("delete")}
    </button>
  );
};
