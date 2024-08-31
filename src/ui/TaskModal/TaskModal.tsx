import React, { Dispatch, FC, SetStateAction } from "react";
import Modal from "react-modal";
import { FormButton } from "../FormButton";
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
  setIsOpen: () => void;
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

export const TaskModal: FC<TaskModalProps> = ({
  title,
  description,
  date,
  priority,
  errors,
  isOpen,
  typeModal,
  setIsOpen,
  setErrors,
  setTitle,
  setDesciption,
  setDate,
  setPriority,
  createTask,
  editTask,
  deleteTask,
}) => {
  if (document.body.classList.contains("dark")) {
    customStyles.content.backgroundColor = "rgb(39 39 42)";
  } else {
    customStyles.content.backgroundColor = "rgb(255, 255, 255)";
  }

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesciption(event.target.value);
  };

  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const changePriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value as TPriotity);
  };

  const checkForm = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: IError = {};
    const currentDate = new Date();

    if (title.length < 4) {
      newErrors.title = "Заголовок должен состоять не менее, чем из 3 символов";
    }

    if (description.length < 4) {
      newErrors.description =
        "Описание должно состоять не менее, чем из 3 символов";
    }

    if (!date.length) {
      newErrors.date = "Укажите точную дату окончания";
    }

    if (currentDate > new Date(date)) {
      newErrors.date = "Неверно указанная дата";
    }

    if (priority !== "high" && priority !== "middle" && priority !== "low") {
      newErrors.priority = "Указан неверный приоритет";
    }

    if (!(newErrors.title || newErrors.description || newErrors.date)) {
      if (createTask) {
        createTask();
      } else if (editTask) {
        editTask();
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <button onClick={setIsOpen} className="absolute right-7 top-7">
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
            onChange={changeTitle}
            id="title"
            type="text"
            className="p-2 text-slate-950 rounded border border-gray-300 dark:bg-zinc-800 dark:text-white"
          />
          {errors.title ? <p className="text-red-500">{errors.title}</p> : null}
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
            onChange={changeDescription}
            id="description"
            className="p-2 text-slate-950 rounded border border-gray-300 resize-none h-28 dark:bg-zinc-800 dark:text-white"
          />
          {errors.description ? (
            <p className="text-red-500">{errors.description}</p>
          ) : null}
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
            onChange={changeDate}
            id="date"
            type="date"
            className="rounded p-2 text-slate-950 border border-gray-300 cursor-pointer dark:bg-zinc-800 dark:text-white"
          />
          {errors.date ? <p className="text-red-500">{errors.date}</p> : null}
        </div>
        <div className="grid gap-3 mb-4">
          <label
            htmlFor="priority"
            className="text-2xl cursor-pointer dark:text-white"
          >
            Приоритет:
          </label>
          <select
            onChange={changePriority}
            id="priority"
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
          {errors.priority ? (
            <p className="text-red-500">{errors.priority}</p>
          ) : null}
        </div>
        <div className="flex gap-5">
          <FormButton type={typeModal} />
          {typeModal === "edit" ? (
            <FormButton onClick={deleteTask} type={"delete"} />
          ) : null}
        </div>
      </form>
    </Modal>
  );
};
