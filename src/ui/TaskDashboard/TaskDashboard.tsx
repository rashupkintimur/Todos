import React, { Dispatch, FC, SetStateAction } from "react";
import { TaskList } from "../TaskList";
import { ITask } from "../../types/ITask";
import { IError } from "../../types/IError";

type TaskDashboardProps = {
  tasks: ITask[];
  search: string;
  date: string;
  errors: IError;
  isOpen: boolean;
  changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changePrioritySort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  changeDateSort: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleModalEditTask: () => void;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  setErrors: Dispatch<SetStateAction<IError>>;
};

export const TaskDashboard: FC<TaskDashboardProps> = ({
  tasks,
  search,
  date,
  errors,
  isOpen,
  changeSearch,
  changePrioritySort,
  changeDateSort,
  toggleModalEditTask,
  setTasks,
  setErrors,
}) => {
  return (
    <div>
      <div className="mb-10 grid grid-cols-2 gap-10">
        <input
          onChange={changeSearch}
          value={search}
          className="p-3 rounded border border-gray-300 w-1/3 dark:bg-zinc-800 dark:text-white w-full"
          type="text"
          placeholder="Поиск..."
        />
        <div className="grid grid-cols-2 gap-10">
          <select
            onChange={changePrioritySort}
            className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer dark:bg-zinc-800 dark:text-white"
          >
            <option value="all">Все</option>
            <option value="high">Высокий</option>
            <option value="middle">Средний</option>
            <option value="low">Низкий</option>
          </select>
          <input
            onChange={changeDateSort}
            value={date}
            type="date"
            className="rounded p-2 text-slate-950 border border-gray-300 cursor-pointer dark:bg-zinc-800 dark:text-white"
          />
        </div>
      </div>
      <TaskList
        tasks={tasks}
        errors={errors}
        isOpen={isOpen}
        toggleModalEditTask={toggleModalEditTask}
        setTasks={setTasks}
        setErrors={setErrors}
      />
    </div>
  );
};
