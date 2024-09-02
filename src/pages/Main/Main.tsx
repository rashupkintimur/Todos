import { createContext, memo, useCallback, useMemo, useState } from "react";
import { ITask } from "../../types/ITask";
import { TaskModal } from "../../ui/TaskModal";
import { TaskDashboard } from "../../ui/TaskDashboard";
import { TPriority } from "../../types/TPriority";
import { IFormHandlerStates } from "../../types/IFormHandlerStates";
import { IError } from "../../types/IError";
import { customAlphabet } from "nanoid";

export const FormHandlersStates = createContext<IFormHandlerStates | null>(
  null
);
export const nanoid = customAlphabet("1234567890", 10);

// tasks from localStorage
const storedTasks = localStorage.getItem("tasks");
const storageTasks: ITask[] = storedTasks ? JSON.parse(storedTasks) : [];

// memo components
const TaskDashboardMemo = memo(TaskDashboard);
const TaskModalMemo = memo(TaskModal);

export const Main = () => {
  const [tasks, setTasks] = useState<ITask[]>(storageTasks);
  const [currentTask, setCurrentTask] = useState<ITask>();
  const [errors, setErrors] = useState<IError>({});
  const [search, setSearch] = useState("");
  const [prioritySort, setPrioritySort] = useState<TPriority>("all");
  const [dateSort, setDateSort] = useState("");
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  // обработчик закрытия/открытия модально окна создания задачи
  const toggleModalCreateTask = useCallback(() => {
    setModalCreateIsOpen((prevState) => !prevState);
  }, []);

  // обработчик закрытия/открытия модально окна редактирования задачи
  const toggleModalEditTask = useCallback(() => {
    setModalEditIsOpen((prevState) => !prevState);
  }, []);

  // Мемоизация отфильтрованных задач
  const filteredTasks = useMemo(() => {
    let filteredTasksArray = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );

    if (dateSort.length) {
      filteredTasksArray = filteredTasksArray.filter(
        (task) => task.date === dateSort
      );
    }

    if (["high", "middle", "low"].includes(prioritySort)) {
      filteredTasksArray = filteredTasksArray.filter(
        (task) => task.priority === prioritySort
      );
    }

    return filteredTasksArray;
  }, [tasks, search, prioritySort, dateSort]);

  return (
    <div className="container mx-auto px-5">
      {filteredTasks.length ? (
        <TaskDashboardMemo
          tasks={filteredTasks}
          setTasks={setTasks}
          search={search}
          setSearch={setSearch}
          dateSort={dateSort}
          setDateSort={setDateSort}
          errors={errors}
          setErrors={setErrors}
          isOpen={modalEditIsOpen}
          toggleModalEditTask={toggleModalEditTask}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          setPrioritySort={setPrioritySort}
        />
      ) : search.trim() ? (
        <TaskDashboardMemo
          tasks={filteredTasks}
          setTasks={setTasks}
          search={search}
          setSearch={setSearch}
          dateSort={dateSort}
          setDateSort={setDateSort}
          errors={errors}
          setErrors={setErrors}
          isOpen={modalEditIsOpen}
          toggleModalEditTask={toggleModalEditTask}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          setPrioritySort={setPrioritySort}
        />
      ) : tasks.length ? (
        <TaskDashboardMemo
          tasks={filteredTasks}
          setTasks={setTasks}
          search={search}
          setSearch={setSearch}
          dateSort={dateSort}
          setDateSort={setDateSort}
          errors={errors}
          setErrors={setErrors}
          isOpen={modalEditIsOpen}
          toggleModalEditTask={toggleModalEditTask}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          setPrioritySort={setPrioritySort}
        />
      ) : (
        <h2 className="text-6xl text-center font-mono pt-10 font-bold text-slate-900 dark:text-white">
          Задач пока нет... 😥
        </h2>
      )}
      <button
        onClick={toggleModalCreateTask}
        className="text-8xl text-white bg-black fixed bottom-16 right-24 rounded-full w-24 h-24 flex items-center justify-center bg-red-500 hover:bg-red-600 active:bg-red-700 duration-150 focus:outline-none focus:bg-red-700 focus:ring focus:ring-red-500"
      >
        +
      </button>
      <TaskModalMemo
        currentTask={currentTask}
        tasks={tasks}
        setTasks={setTasks}
        errors={errors}
        setErrors={setErrors}
        isOpen={modalCreateIsOpen}
        toggleModalTask={toggleModalCreateTask}
        typeModal={"create"}
      />
    </div>
  );
};
