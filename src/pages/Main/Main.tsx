import React, { FC, useEffect, useState } from "react";
import { ITask } from "../../types/ITask";
import { TaskModal } from "../../ui/TaskModal";
import { TaskDashboard } from "../../ui/TaskDashboard";

type MainProps = {};

const storedTasks = localStorage.getItem("tasks");
const storageTasks: ITask[] = storedTasks ? JSON.parse(storedTasks) : [];

export const Main: FC<MainProps> = () => {
  const [tasks, setTasks] = useState<ITask[]>(storageTasks);
  const [filtedTasks, setFiltredTasks] = useState<ITask[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  const changePriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value);
  };

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const modalHandler = () => {
    setIsOpen((prevState) => !prevState);
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

  return (
    <div className="container mx-auto px-4">
      {filtedTasks.length ? (
        <TaskDashboard
          tasks={filtedTasks}
          search={search}
          changeSearch={changeSearch}
        />
      ) : tasks.length ? (
        <TaskDashboard
          tasks={tasks}
          search={search}
          changeSearch={changeSearch}
        />
      ) : (
        <h2 className="text-6xl text-center font-mono pt-10 font-bold text-slate-900">
          Задач пока нет... 😥
        </h2>
      )}
      <button
        onClick={modalHandler}
        className="text-8xl text-white bg-black fixed bottom-16 right-24 rounded-full w-24 h-24 flex items-center justify-center bg-red-500 hover:bg-red-600 active:bg-red-700 duration-150"
      >
        +
      </button>
      <TaskModal
        title={title}
        description={description}
        isOpen={modalIsOpen}
        setIsOpen={modalHandler}
        changeTitle={changeTitle}
        changeDescription={changeDescription}
        changeDate={changeDate}
        changePriority={changePriority}
      />
    </div>
  );
};
