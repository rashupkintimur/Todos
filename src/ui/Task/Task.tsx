import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { TaskModal } from "../TaskModal";
import { ITask } from "../../types/ITask";
import { TPriotity } from "../../types/TPriotity";

type TaskProps = ITask & {
  id: number;
  tasks: ITask[];
  isOpen: boolean;
  setIsOpen: () => void;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
};

export const Task: FC<TaskProps> = ({
  id,
  title,
  description,
  date,
  priority,
  tasks,
  isOpen,
  setIsOpen,
  setTasks,
}) => {
  const [titleTask, setTitleTask] = useState(title);
  const [descriptionTask, setDescriptionTask] = useState(description);
  const [dateTask, setDateTask] = useState(date);
  const [priorityTask, setPriorityTask] = useState<TPriotity>(priority);

  const editTask = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.title = titleTask;
        task.description = descriptionTask;
        task.date = dateTask;
        task.priority = priorityTask;
      }

      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setIsOpen();
  };

  const deleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setIsOpen();
  };

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
        priority={priorityTask}
        isOpen={isOpen}
        typeModal={"edit"}
        setIsOpen={setIsOpen}
        setTitle={setTitleTask}
        setDesciption={setDescriptionTask}
        setDate={setDateTask}
        setPriority={setPriorityTask}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};
