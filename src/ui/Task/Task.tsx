import { FC } from "react";
import { ITask } from "../../types/ITask";

type TaskProps = {
  task: ITask;
  toggleModalEditTask: () => void;
};

export const Task: FC<TaskProps> = ({ task, toggleModalEditTask }) => {
  const { title, description, date, priority } = task;

  return (
    <div className="py-4 px-5 bg-blue-100 dark:bg-zinc-800 rounded-md flex gap-3 justify-between items-center">
      <div>
        <h4 className="text-3xl text-slate-700 dark:text-white font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h4>
        <p className="text-base text-slate-700 dark:text-white font-light overflow-hidden whitespace-nowrap text-ellipsis">
          {description}
        </p>
      </div>
      <div className="flex gap-7">
        <div>
          <p className="text-xl mb-4 text-slate-700 dark:text-white">
            Приоритет:{" "}
            {priority === "high" ? (
              <span className="text-red-500 font-medium">Высокий</span>
            ) : priority === "middle" ? (
              <span className="text-yellow-500 font-medium">Средний</span>
            ) : (
              <span className="text-green-500 font-medium">Низкий</span>
            )}
          </p>
          <h4 className="text-xl text-slate-700 dark:text-white">
            Дата окончания:{" "}
            <span className="font-light dark:text-white">{date}</span>
          </h4>
        </div>
        <button
          onClick={toggleModalEditTask}
          className="text-white rounded px-7 text-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 duration-150 focus:outline-none focus:ring focus:bg-emerald-700 focus:ring-emerald-500"
        >
          Изменить
        </button>
      </div>
    </div>
  );
};
