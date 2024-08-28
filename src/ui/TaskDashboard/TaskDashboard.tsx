import React, { FC } from "react";
import { TaskList } from "../TaskList";
import { ITask } from "../../types/ITask";

type TaskDashboardProps = {
  tasks: ITask[];
  search: string;
  changeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TaskDashboard: FC<TaskDashboardProps> = ({
  tasks,
  search,
  changeSearch,
}) => {
  return (
    <div>
      <div className="mb-10">
        <input
          onChange={changeSearch}
          value={search}
          className="p-3 rounded border border-gray-300 w-1/3"
          type="text"
          placeholder="Поиск..."
        />
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};
