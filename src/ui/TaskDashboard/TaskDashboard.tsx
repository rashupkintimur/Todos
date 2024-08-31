import React, { Dispatch, FC, SetStateAction } from "react";
import { TaskList } from "../TaskList";
import { ITask } from "../../types/ITask";
import { IError } from "../../types/IError";

type TaskDashboardProps = {
  tasks: ITask[];
  search: string;
  errors: IError;
  isOpen: boolean;
  changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsOpen: () => void;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  setErrors: Dispatch<SetStateAction<IError>>;
};

export const TaskDashboard: FC<TaskDashboardProps> = ({
  tasks,
  search,
  errors,
  isOpen,
  changeSearch,
  setIsOpen,
  setTasks,
  setErrors,
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
        errors={errors}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setTasks={setTasks}
        setErrors={setErrors}
      />
    </div>
  );
};
