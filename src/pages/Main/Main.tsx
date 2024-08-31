import React, { FC, createContext, useEffect, useState } from "react";
import { ITask } from "../../types/ITask";
import { TaskModal } from "../../ui/TaskModal";
import { TaskDashboard } from "../../ui/TaskDashboard";
import { TPriotity } from "../../types/TPriotity";
import { IFormHandlerStates } from "../../types/IFormHandlerStates";
import { getRandomNumber } from "../../utils/getRandomNumber";
import { IError } from "../../types/IError";

type MainProps = {};

export const FormHandlersStates = createContext<IFormHandlerStates | null>(
  null
);

const storedTasks = localStorage.getItem("tasks");
const storageTasks: ITask[] = storedTasks ? JSON.parse(storedTasks) : [];

export const Main: FC<MainProps> = () => {
  const [tasks, setTasks] = useState<ITask[]>(storageTasks);
  const [filtedTasks, setFiltredTasks] = useState<ITask[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState<TPriotity>("high");
  const [errors, setErrors] = useState<IError>({});
  const [search, setSearch] = useState("");
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const modalCreateTaskHandler = () => {
    setModalCreateIsOpen((prevState) => !prevState);
    if (modalCreateIsOpen) {
      resetForm();
    }
  };

  const modalEditTaskHandler = () => {
    setModalEditIsOpen((prevState) => !prevState);
    resetForm();
  };

  const createTask = () => {
    const updatedTasks = [
      ...tasks,
      {
        id: getRandomNumber(1, 10000000),
        title,
        description,
        date,
        priority,
      } as ITask,
    ];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    modalCreateTaskHandler();
  };

  useEffect(() => {
    setFiltredTasks(
      tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setPriority("high");
    setErrors({});
  };

  return (
    <div className="container mx-auto px-5">
      {filtedTasks.length ? (
        <TaskDashboard
          tasks={filtedTasks}
          search={search}
          errors={errors}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          setIsOpen={modalEditTaskHandler}
          setTasks={setTasks}
          setErrors={setErrors}
        />
      ) : search.trim() ? (
        <TaskDashboard
          tasks={filtedTasks}
          search={search}
          errors={errors}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          setIsOpen={modalEditTaskHandler}
          setTasks={setTasks}
          setErrors={setErrors}
        />
      ) : tasks.length ? (
        <TaskDashboard
          tasks={tasks}
          search={search}
          errors={errors}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          setIsOpen={modalEditTaskHandler}
          setTasks={setTasks}
          setErrors={setErrors}
        />
      ) : (
        <h2 className="text-6xl text-center font-mono pt-10 font-bold text-slate-900 dark:text-white">
          Задач пока нет... 😥
        </h2>
      )}
      <button
        onClick={modalCreateTaskHandler}
        className="text-8xl text-white bg-black fixed bottom-16 right-24 rounded-full w-24 h-24 flex items-center justify-center bg-red-500 hover:bg-red-600 active:bg-red-700 duration-150"
      >
        +
      </button>
      <TaskModal
        title={title}
        description={description}
        date={date}
        priority={priority}
        errors={errors}
        isOpen={modalCreateIsOpen}
        typeModal={"create"}
        setIsOpen={modalCreateTaskHandler}
        setErrors={setErrors}
        setTitle={setTitle}
        setDesciption={setDescription}
        setDate={setDate}
        setPriority={setPriority}
        createTask={createTask}
      />
    </div>
  );
};
