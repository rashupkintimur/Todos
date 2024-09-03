import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { ButtonModalForm } from "../ButtonModalForm";
import { TButtonModal } from "../../types/TButtonModal";
import { IError } from "../../types/IError";
import { InputDate } from "../InputDate";
import { handleChange } from "../../utils/handleChange";
import { SelectPriority } from "../SelectPriority";
import { ITask } from "../../types/ITask";
import { nanoid } from "../../pages/Main";
import { TPriority } from "../../types/TPriority";

type TaskModalProps = {
  currentTask: ITask | undefined;
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  errors: IError;
  setErrors: Dispatch<SetStateAction<IError>>;
  isOpen: boolean;
  toggleModalTask: () => void;
  typeModal: TButtonModal;
};

const getErrorMessage = (error: string | undefined) =>
  error ? <p className="text-red-500">{error}</p> : null;

export const TaskModal: FC<TaskModalProps> = ({
  currentTask,
  tasks,
  setTasks,
  errors,
  setErrors,
  isOpen,
  toggleModalTask,
  typeModal,
}) => {
  if (!isOpen) return null;

  const [titleTask, setTitleTask] = useState(currentTask?.title || "");
  const [descriptionTask, setDescriptionTask] = useState(
    currentTask?.description || ""
  );
  const [dateTask, setDateTask] = useState(currentTask?.date || "");
  const [priorityTask, setPriorityTask] = useState<TPriority>(
    currentTask?.priority || "high"
  );

  // функция для создания новых заданий
  const createTask = () => {
    const newTask: ITask = {
      id: parseInt(nanoid(), 10),
      title: titleTask,
      description: descriptionTask,
      date: dateTask,
      priority: priorityTask,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toggleModalTask();
    resetForm();
  };

  // редактируем задание
  const editTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask?.id
        ? {
            ...task,
            title: titleTask,
            description: descriptionTask,
            date: dateTask,
            priority: priorityTask,
          }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toggleModalTask();
    resetForm();
  };

  // удаляем задание
  const deleteTask = () => {
    if (currentTask) {
      const updatedTasks = tasks.filter((task) => task.id !== currentTask.id);

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      toggleModalTask();
      resetForm();
    }
  };

  // сброс данных в форме
  const resetForm = () => {
    setTitleTask("");
    setDescriptionTask("");
    setDateTask("");
    setPriorityTask("high");
    setErrors({});
  };

  // Проверка формы
  const checkForm = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: IError = {};
    const currentDate = new Date();
    const dateUser = new Date(dateTask);

    if (titleTask.length < 4)
      newErrors.title = "Заголовок должен состоять не менее, чем из 4 символов";
    if (descriptionTask.length < 4)
      newErrors.description =
        "Описание должно состоять не менее, чем из 4 символов";
    if (!dateTask) newErrors.date = "Укажите точную дату окончания";
    if (
      currentDate.getFullYear() > dateUser.getFullYear() ||
      (currentDate.getFullYear() === dateUser.getFullYear() &&
        currentDate.getMonth() > dateUser.getMonth()) ||
      (currentDate.getFullYear() === dateUser.getFullYear() &&
        currentDate.getMonth() === dateUser.getMonth() &&
        currentDate.getDate() > dateUser.getDate())
    )
      newErrors.date = "Неверно указанная дата";
    if (!["high", "middle", "low"].includes(priorityTask))
      newErrors.priority = "Указан неверный приоритет";

    if (!Object.keys(newErrors).length) {
      if (typeModal === "create") createTask();
      else if (typeModal === "edit") editTask();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-full sm:w-3/5 p-6">
        <button
          onClick={toggleModalTask}
          className="absolute right-7 top-7 focus:outline-none focus:ring focus:ring-red-500"
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
        <form className="sm:py-5 sm:px-5 grid gap-3" onSubmit={checkForm}>
          <div className="grid gap-3">
            <label
              htmlFor="title"
              className="text-2xl cursor-pointer dark:text-white"
            >
              Заголовок:
            </label>
            <input
              value={titleTask}
              onChange={handleChange(setTitleTask)}
              id="title"
              type="text"
              className="w-full p-2 text-xl text-slate-950 rounded border border-gray-300 dark:bg-zinc-800 dark:text-white"
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
              value={descriptionTask}
              id="decription"
              onChange={handleChange(setDescriptionTask)}
              className="p-2 text-xl text-slate-950 rounded border border-gray-300 resize-none h-28 dark:bg-zinc-800 dark:text-white"
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
            <InputDate
              id={"date"}
              date={dateTask}
              onChange={handleChange(setDateTask)}
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
            <SelectPriority
              id={"priority"}
              onChange={handleChange(setPriorityTask)}
            >
              <option
                selected={priorityTask === "high" ? true : false}
                value="high"
              >
                Высокий
              </option>
              <option
                selected={priorityTask === "middle" ? true : false}
                value="middle"
              >
                Средний
              </option>
              <option
                selected={priorityTask === "low" ? true : false}
                value="low"
              >
                Низкий
              </option>
            </SelectPriority>
            {getErrorMessage(errors.priority)}
          </div>
          <div className="flex gap-5">
            <ButtonModalForm type={typeModal} />
            {typeModal === "edit" ? (
              <ButtonModalForm onClick={deleteTask} type={"delete"} />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};
