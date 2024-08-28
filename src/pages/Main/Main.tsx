import { FC, useState } from "react";
import { ITask } from "../../types/ITask";
import { TaskModal } from "../../ui/TaskModal";

type MainProps = {};

const storedTasks = localStorage.getItem("tasks");
const storageTasks: ITask[] = storedTasks ? JSON.parse(storedTasks) : [];

export const Main: FC<MainProps> = () => {
  const [tasks, setTasks] = useState(storageTasks);
  const [modalIsOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto px-4">
      {tasks.length ? null : (
        <h2 className="text-6xl text-center font-mono pt-10 font-bold text-slate-900">
          Задач пока нет... 😥
        </h2>
      )}
      <button
        onClick={modalHandler}
        className="text-8xl text-white bg-black fixed bottom-16 right-24 rounded-full w-24 h-24 flex items-center justify-center bg-red-500 hover:bg-red-600 active:bg-red-700 duration-150 shadow-lg shadow-bg-slate-950"
      >
        +
      </button>
      <TaskModal isOpen={modalIsOpen} setIsOpen={modalHandler} />
    </div>
  );
};
