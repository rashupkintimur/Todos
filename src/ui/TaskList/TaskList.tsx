import { Dispatch, FC, SetStateAction } from "react";
import { ITask } from "../../types/ITask";
import { Task } from "../Task/Task";
import { IError } from "../../types/IError";
import { TaskModal } from "../TaskModal";

type TaskListProps = {
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  expiredTasks: ITask[];
  unexpiredTasks: ITask[];
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
  expiredTasks,
  unexpiredTasks,
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
        {unexpiredTasks.map((task) => (
          <li key={task.id}>
            <Task
              task={task}
              toggleModalEditTask={() => toggleModal(task)}
              isExpired={false}
            />
          </li>
        ))}
      </ul>
      {expiredTasks.length ? (
        <div className="mt-5">
          <h3 className="text-slate-700 dark:text-slate-200 text-4xl mb-5 font-bold">
            Истёкшие невыполенные задачи:
          </h3>
          <ul className="grid gap-5">
            {expiredTasks.map((task) => (
              <li key={task.id}>
                <Task
                  task={task}
                  toggleModalEditTask={() => toggleModal(task)}
                  isExpired={true}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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
