import { Dispatch, FC, SetStateAction } from "react";
import { ITask } from "../../types/ITask";
import { Task } from "../Task/Task";
import { IError } from "../../types/IError";
import { TaskModal } from "../TaskModal";

type TaskListProps = {
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  errors: IError;
  setErrors: Dispatch<SetStateAction<IError>>;
  isOpen: boolean;
  toggleModalEditTask: () => void;
  currentTask: ITask | undefined;
  setCurrentTask: Dispatch<SetStateAction<ITask | undefined>>;
  toggleModal: (task?: ITask) => void;
};

export const TaskList: FC<TaskListProps> = ({
  tasks,
  setTasks,
  errors,
  setErrors,
  isOpen,
  toggleModalEditTask,
  currentTask,
  toggleModal,
}) => {
  return (
    <div>
      <ul className="grid gap-5">
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} toggleModalEditTask={() => toggleModal(task)} />
          </li>
        ))}
      </ul>
      {isOpen && currentTask && (
        <TaskModal
          currentTask={currentTask}
          tasks={tasks}
          setTasks={setTasks}
          errors={errors}
          setErrors={setErrors}
          isOpen={isOpen}
          toggleModalTask={toggleModalEditTask}
          typeModal={"edit"}
        />
      )}
    </div>
  );
};
