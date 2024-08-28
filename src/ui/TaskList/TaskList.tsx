import { FC } from "react";
import { ITask } from "../../types/ITask";
import { Task } from "../Task/Task";

type TaskListProps = {
  tasks: ITask[];
};

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="grid gap-5">
      {...tasks.map((task) => (
        <li>
          <Task
            title={task.title}
            description={task.description}
            date={task.date}
            priority={task.priority}
          />
        </li>
      ))}
    </ul>
  );
};
