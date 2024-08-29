import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { TaskModal } from "../TaskModal";
import { ITask } from "../../types/ITask";
import { TPriotity } from "../../types/TPriotity";

type TaskProps = ITask & {
  id: number;
  isOpen: boolean;
  setIsOpen: () => void;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
};

export const Task: FC<TaskProps> = ({
  title,
  description,
  date,
  priority,
  id,
  isOpen,
  setIsOpen,
  setTasks,
}) => {
  const [titleTask, setTitleTask] = useState(title);
  const [descriptionTask, setDescriptionTask] = useState(description);
  const [dateTask, setDateTask] = useState(date);
  const [priorityTask, setPriorityTask] = useState<TPriotity>("high");

  const editTask = (event: React.FormEvent) => {
    event.preventDefault();

    setTasks((prevTasks) =>
      prevTasks.map((prevTask, index) => {
        if (index === id) {
          prevTask.title = titleTask;
          prevTask.description = descriptionTask;
          prevTask.date = dateTask;
          prevTask.priority = priorityTask;
        }

        return prevTask;
      })
    );

    setIsOpen();
  };

  return (
    <div className="py-4 px-5 bg-blue-100 rounded-md flex gap-3 justify-between items-center">
      <div>
        <h4 className="text-3xl text-slate-700 font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h4>
        <p className="text-base text-slate-700 font-light overflow-hidden whitespace-nowrap text-ellipsis">
          {description}
        </p>
      </div>
      <div className="flex gap-7">
        <div>
          <p className="text-xl mb-4 text-slate-700">
            Приоритет:{" "}
            {priority === "high" ? (
              <span className="text-red-500 font-light">Высокий</span>
            ) : priority === "middle" ? (
              <span className="text-yellow-500 font-light">Средний</span>
            ) : (
              <span className="text-green-500 font-light">Низкий</span>
            )}
          </p>
          <h4 className="text-xl text-slate-700">
            Дата окончания: <span className="font-light">{date}</span>
          </h4>
        </div>
        <button
          onClick={setIsOpen}
          className="text-white rounded px-7 text-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 duration-150"
        >
          Изменить
        </button>
      </div>
      <TaskModal
        title={titleTask}
        description={descriptionTask}
        date={dateTask}
        isOpen={isOpen}
        typeModal={"edit"}
        setIsOpen={setIsOpen}
        setTitle={setTitleTask}
        setDesciption={setDescriptionTask}
        setDate={setDateTask}
        setPriority={setPriorityTask}
        submitForm={editTask}
      />
    </div>
  );
};
