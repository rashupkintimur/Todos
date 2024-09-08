import { Dispatch, FC, SetStateAction } from "react";
import { TaskList } from "../TaskList";
import { ITask } from "../../types/ITask";
import { IError } from "../../types/IError";
import { InputDate } from "../InputDate";
import { handleChange } from "../../utils/handleChange";
import { TPriority } from "../../types/TPriority";
import { SelectPriority } from "../SelectPriority";

type TaskDashboardProps = {
  tasks: ITask[];
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  expiredTasks: ITask[];
  unexpiredTasks: ITask[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  dateSort: string;
  setDateSort: Dispatch<SetStateAction<string>>;
  errors: IError;
  setErrors: Dispatch<SetStateAction<IError>>;
  isOpen: boolean;
  toggleModalEditTask: () => void;
  currentTask: ITask | undefined;
  setCurrentTask: Dispatch<SetStateAction<ITask | undefined>>;
  setPrioritySort: Dispatch<SetStateAction<TPriority>>;
  toggleModal: (task?: ITask) => void;
};

export const TaskDashboard: FC<TaskDashboardProps> = ({
  tasks,
  setTasks,
  expiredTasks,
  unexpiredTasks,
  search,
  setSearch,
  dateSort,
  setDateSort,
  errors,
  setErrors,
  isOpen,
  toggleModalEditTask,
  currentTask,
  setCurrentTask,
  setPrioritySort,
  toggleModal,
}) => {
  return (
    <div>
      <div className="mb-10 grid lg:grid-cols-2 gap-5 sm:gap-10">
        <input
          onChange={handleChange(setSearch)}
          value={search}
          className="text-base sm:text-xl p-3 rounded border border-gray-300 w-1/3 dark:bg-zinc-800 dark:text-white w-full"
          type="text"
          placeholder="Поиск..."
        />
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-10">
          <SelectPriority onChange={handleChange(setPrioritySort)}>
            <option value="all">Все</option>
            <option value="high">Высокий</option>
            <option value="middle">Средний</option>
            <option value="low">Низкий</option>
          </SelectPriority>
          <InputDate date={dateSort} onChange={handleChange(setDateSort)} />
        </div>
      </div>
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        expiredTasks={expiredTasks}
        unexpiredTasks={unexpiredTasks}
        errors={errors}
        setErrors={setErrors}
        isOpen={isOpen}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        toggleModalEditTask={toggleModalEditTask}
        toggleModal={toggleModal}
      />
    </div>
  );
};
