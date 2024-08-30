import React, { Dispatch, FC, SetStateAction } from "react";
import { TaskList } from "../TaskList";
import { ITask } from "../../types/ITask";

type TaskDashboardProps = {
  tasks: ITask[];
  search: string;
  isOpen: boolean;
  changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsOpen: () => void;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
};

export const TaskDashboard: FC<TaskDashboardProps> = ({
  tasks,
  search,
  isOpen,
  changeSearch,
  setIsOpen,
  setTasks,
}) => {
  return (
    <div>
      <div className="mb-10">
        <input
          onChange={changeSearch}
          value={search}
          className="p-3 rounded border border-gray-300 w-1/3 dark:bg-zinc-800 dark:text-white"
          type="text"
          placeholder="Поиск..."
        />
      </div>
      <TaskList
        tasks={tasks}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setTasks={setTasks}
      />
    </div>
  );
};
