import { Dispatch, FC, SetStateAction } from "react";
import { ITask } from "../../types/ITask";
import { Task } from "../Task/Task";
import { IError } from "../../types/IError";
import { TaskModal } from "../TaskModal";
import { TFunction } from "i18next";

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
  t: TFunction<"translation", undefined>;
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
  t,
}) => {
  return (
    <div>
      {unexpiredTasks.length ? (
        <ul className="grid gap-5 mb-5">
          {unexpiredTasks.map((task) => (
            <li key={task.id}>
              <Task
                task={task}
                toggleModalEditTask={() => toggleModal(task)}
                isExpired={false}
                t={t}
              />
            </li>
          ))}
        </ul>
      ) : null}
      {expiredTasks.length ? (
        <div>
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
                  t={t}
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
          t={t}
        />
      )}
    </div>
  );
};
