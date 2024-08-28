import { FC } from "react";
import { TPriotity } from "../../types/TPriotity";
import { formatDate } from "../../utils/formatDate";

type TaskProps = {
  title: string;
  description: string;
  date: Date;
  priority: TPriotity;
};

export const Task: FC<TaskProps> = ({ title, description, date, priority }) => {
  return (
    <div className="py-4 px-5 bg-blue-100 rounded-md flex gap-3 justify-between items-center">
      <div>
        <h4 className="text-3xl text-slate-700 font-semibold mb-2">{title}</h4>
        <p className="text-base text-slate-700 font-light">{description}</p>
      </div>
      <div>
        <p className="text-xl mb-4 text-slate-700">
          Приоритет:{" "}
          {priority === "high" ? (
            <span className="text-red-500">Высокий</span>
          ) : priority === "middle" ? (
            <span className="text-yellow-500">Средний</span>
          ) : (
            <span className="text-green-500">Низкий</span>
          )}
        </p>
        <h4 className="text-xl text-slate-700">
          Дата окончания: {formatDate(date)}
        </h4>
      </div>
    </div>
  );
};
