import { Dispatch, FC, SetStateAction } from "react";
import { TaskList } from "../TaskList";
import { ITask } from "../../types/ITask";
import { IError } from "../../types/IError";
import { InputDate } from "../InputDate";
import { handleChange } from "../../utils/handleChange";
import { TPriority } from "../../types/TPriority";
import { SelectPriority } from "../SelectPriority";
import { TFunction } from "i18next";

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
  t: TFunction<"translation", undefined>;
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
  t,
}) => {
  return (
    <div>
      <div className="mb-10 grid lg:grid-cols-2 gap-5 sm:gap-10">
        <input
          onChange={handleChange(setSearch)}
          value={search}
          className="text-base text-xl p-3 rounded border border-gray-300 w-1/3 dark:bg-zinc-800 dark:text-white w-full"
          type="text"
          placeholder={t("search")}
        />
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-10">
          <SelectPriority onChange={handleChange(setPrioritySort)}>
            <option value="all">{t("all")}</option>
            <option value="high">{t("high")}</option>
            <option value="middle">{t("middle")}</option>
            <option value="low">{t("low")}</option>
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
        t={t}
      />
    </div>
  );
};
