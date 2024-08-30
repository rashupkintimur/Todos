import React, { FC, createContext, useEffect, useState } from "react";
import { ITask } from "../../types/ITask";
import { TaskModal } from "../../ui/TaskModal";
import { TaskDashboard } from "../../ui/TaskDashboard";
import { TPriotity } from "../../types/TPriotity";
import { IFormHandlerStates } from "../../types/IFormHandlerStates";
import { getRandomNumber } from "../../utils/getRandomNumber";

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
  };

  return (
    <div className="container mx-auto px-5">
      {filtedTasks.length ? (
        <TaskDashboard
          tasks={filtedTasks}
          search={search}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          setIsOpen={modalEditTaskHandler}
          setTasks={setTasks}
        />
      ) : search.trim() ? (
        <TaskDashboard
          tasks={filtedTasks}
          search={search}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          setIsOpen={modalEditTaskHandler}
          setTasks={setTasks}
        />
      ) : tasks.length ? (
        <TaskDashboard
          tasks={tasks}
          search={search}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          setIsOpen={modalEditTaskHandler}
          setTasks={setTasks}
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
        isOpen={modalCreateIsOpen}
        typeModal={"create"}
        setIsOpen={modalCreateTaskHandler}
        setTitle={setTitle}
        setDesciption={setDescription}
        setDate={setDate}
        setPriority={setPriority}
        createTask={createTask}
      />
    </div>
  );
};
