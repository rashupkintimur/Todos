import React, { Dispatch, FC, SetStateAction } from "react";
import Modal from "react-modal";
import { ButtonModalForm } from "../ButtonModalForm";
import { TButtonModal } from "../../types/TButtonModal";
import { TPriotity } from "../../types/TPriotity";
import { IError } from "../../types/IError";

type TaskModalProps = {
  title: string;
  description: string;
  date: string;
  priority: TPriotity;
  errors: IError;
  isOpen: boolean;
  typeModal: TButtonModal;
  toggleModalTask: () => void;
  setErrors: Dispatch<SetStateAction<IError>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDesciption: Dispatch<SetStateAction<string>>;
  setDate: Dispatch<SetStateAction<string>>;
  setPriority: Dispatch<SetStateAction<TPriotity>>;
  createTask?: () => void;
  editTask?: () => void;
  deleteTask?: () => void;
};

const customStyles = {
  content: {
    maxWidth: "700px",
    width: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "",
  },
};

const getErrorMessage = (error: string | undefined) =>
  error ? <p className="text-red-500">{error}</p> : null;

export const TaskModal: FC<TaskModalProps> = ({
  title,
  description,
  date,
  priority,
  errors,
  isOpen,
  typeModal,
  toggleModalTask,
  setErrors,
  setTitle,
  setDesciption,
  setDate,
  setPriority,
  createTask,
  editTask,
  deleteTask,
}) => {
  // изменение фона модального окна в зависимости от темы
  if (document.body.classList.contains("dark")) {
    customStyles.content.backgroundColor = "rgb(39 39 42)";
  } else {
    customStyles.content.backgroundColor = "rgb(255, 255, 255)";
  }

  // обработчик изменений
  const handleChange =
    (setter: Dispatch<SetStateAction<any>>) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setter(e.target.value);

  // Проверка формы
  const checkForm = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: IError = {};
    const currentDate = new Date();
    const dateUser = new Date(date);

    if (title.length < 4)
      newErrors.title = "Заголовок должен состоять не менее, чем из 4 символов";
    if (description.length < 4)
      newErrors.description =
        "Описание должно состоять не менее, чем из 4 символов";
    if (!date) newErrors.date = "Укажите точную дату окончания";
    if (
      currentDate.getFullYear() > dateUser.getFullYear() ||
      (currentDate.getFullYear() === dateUser.getFullYear() &&
        currentDate.getMonth() > dateUser.getMonth()) ||
      (currentDate.getFullYear() === dateUser.getFullYear() &&
        currentDate.getMonth() === dateUser.getMonth() &&
        currentDate.getDate() > dateUser.getDate())
    )
      newErrors.date = "Неверно указанная дата";
    if (!["high", "middle", "low"].includes(priority))
      newErrors.priority = "Указан неверный приоритет";

    if (!Object.keys(newErrors).length) {
      createTask?.();
      editTask?.();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <button
        onClick={toggleModalTask}
        className="absolute right-7 top-7 focus:outline-none focus:ring focus:ring-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-black dark:stroke-white"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <form className="py-5 px-5 grid gap-3" onSubmit={checkForm}>
        <div className="grid gap-3">
          <label
            htmlFor="title"
            className="text-2xl cursor-pointer dark:text-white"
          >
            Заголовок:
          </label>
          <input
            value={title}
            onChange={handleChange(setTitle)}
            type="text"
            className="p-2 text-slate-950 rounded border border-gray-300 dark:bg-zinc-800 dark:text-white"
          />
          {getErrorMessage(errors.title)}
        </div>
        <div className="grid gap-3">
          <label
            htmlFor="description"
            className="text-2xl cursor-pointer dark:text-white"
          >
            Описание:
          </label>
          <textarea
            value={description}
            onChange={handleChange(setDesciption)}
            className="p-2 text-slate-950 rounded border border-gray-300 resize-none h-28 dark:bg-zinc-800 dark:text-white"
          />
          {getErrorMessage(errors.description)}
        </div>
        <div className="grid gap-3">
          <label
            htmlFor="date"
            className="text-2xl cursor-pointer dark:text-white"
          >
            Дата окончания:
          </label>
          <input
            value={date}
            onChange={handleChange(setDate)}
            type="date"
            className="rounded p-2 text-slate-950 border border-gray-300 cursor-pointer dark:bg-zinc-800 dark:text-white"
          />
          {getErrorMessage(errors.date)}
        </div>
        <div className="grid gap-3 mb-4">
          <label
            htmlFor="priority"
            className="text-2xl cursor-pointer dark:text-white"
          >
            Приоритет:
          </label>
          <select
            onChange={handleChange(setPriority)}
            className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer dark:bg-zinc-800 dark:text-white"
          >
            <option selected={priority === "high" ? true : false} value="high">
              Высокий
            </option>
            <option
              selected={priority === "middle" ? true : false}
              value="middle"
            >
              Средний
            </option>
            <option selected={priority === "low" ? true : false} value="low">
              Низкий
            </option>
          </select>
          {getErrorMessage(errors.priority)}
        </div>
        <div className="flex gap-5">
          <ButtonModalForm type={typeModal} />
          {typeModal === "edit" ? (
            <ButtonModalForm onClick={deleteTask} type={"delete"} />
          ) : null}
        </div>
      </form>
    </Modal>
  );
};
