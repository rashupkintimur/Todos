import { ITask } from "../types/ITask";

export const expireTasks = (currentDate: Date, tasks: ITask[]): ITask[] => {
  return tasks.filter((task) => {
    const dateObj = new Date(task.date);

    if (
      (currentDate.getFullYear() > dateObj.getFullYear() ||
        (currentDate.getFullYear() === dateObj.getFullYear() &&
          currentDate.getMonth() > dateObj.getMonth()) ||
        (currentDate.getFullYear() === dateObj.getFullYear() &&
          currentDate.getMonth() === dateObj.getMonth() &&
          currentDate.getDate() > dateObj.getDate())) &&
      !task.isDone
    )
      return true;
  });
};
