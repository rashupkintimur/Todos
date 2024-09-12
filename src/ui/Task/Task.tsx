import { FC } from "react";
import { ITask } from "../../types/ITask";
import { TFunction } from "i18next";

type TaskProps = {
  task: ITask;
  toggleModalEditTask: () => void;
  isExpired: boolean;
  t: TFunction<"translation", undefined>;
};

export const Task: FC<TaskProps> = ({
  task,
  toggleModalEditTask,
  isExpired,
  t,
}) => {
  const { title, description, date, priority, isDone } = task;

  return (
    <div
      className={`py-4 px-5 rounded-md flex gap-3 items-start flex-col md:items-center md:justify-between md:flex-row text-slate-700 dark:text-white ${
        isExpired ? "bg-red-800 dark:bg-red-800 text-white" : ""
      } ${
        !isDone && isExpired
          ? "bg-red-500"
          : !isDone
          ? "bg-blue-100 dark:bg-zinc-800"
          : "bg-green-300 dark:bg-green-950"
      }`}
    >
      <div>
        <h4 className="text-2xl text-3xl font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h4>
        <p className="text-sm text-base font-light overflow-hidden whitespace-nowrap text-ellipsis">
          {description}
        </p>
      </div>
      <div className="flex gap-3 sm:gap-7 flex-col sm:flex-row sm:justify-between w-full md:w-auto">
        <div>
          <p className="text-base text-xl mb-4">
            {t("priority")}:{" "}
            {priority === "high" ? (
              <span className="text-red-500 font-medium">{t("high")}</span>
            ) : priority === "middle" ? (
              <span className="text-yellow-500 font-medium">{t("middle")}</span>
            ) : (
              <span className="text-green-500 font-medium">{t("low")}</span>
            )}
          </p>
          <h4 className="text-base text-xl">
            {t("dateOfEnd")}: <span className="font-light">{date}</span>
          </h4>
        </div>
        <button
          onClick={toggleModalEditTask}
          className="text-white rounded p-3 sm:px-7 text-base text-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 duration-150 focus:outline-none focus:ring focus:bg-emerald-700 focus:ring-emerald-500"
        >
          {t("edit")}
        </button>
      </div>
    </div>
  );
};
