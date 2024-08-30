import { Dispatch, FC, SetStateAction } from "react";
import { ITask } from "../../types/ITask";
import { Task } from "../Task/Task";

type TaskListProps = {
  tasks: ITask[];
  isOpen: boolean;
  setIsOpen: () => void;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
};

export const TaskList: FC<TaskListProps> = ({
  tasks,
  isOpen,
  setIsOpen,
  setTasks,
}) => {
  return (
    <ul className="grid gap-5">
      {...tasks.map((task) => (
        <li>
          <Task
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            priority={task.priority}
            tasks={tasks}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setTasks={setTasks}
          />
        </li>
      ))}
    </ul>
  );
};
