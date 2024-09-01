import { Dispatch, FC, SetStateAction } from "react";
import { ITask } from "../../types/ITask";
import { Task } from "../Task/Task";
import { IError } from "../../types/IError";

type TaskListProps = {
  tasks: ITask[];
  errors: IError;
  isOpen: boolean;
  toggleModalEditTask: () => void;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  setErrors: Dispatch<SetStateAction<IError>>;
};

export const TaskList: FC<TaskListProps> = ({
  tasks,
  errors,
  isOpen,
  toggleModalEditTask,
  setTasks,
  setErrors,
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
            errors={errors}
            isOpen={isOpen}
            toggleModalEditTask={toggleModalEditTask}
            setTasks={setTasks}
            setErrors={setErrors}
          />
        </li>
      ))}
    </ul>
  );
};
