import React, {
  createContext,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ITask } from "../../types/ITask";
import { TaskModal } from "../../ui/TaskModal";
import { TaskDashboard } from "../../ui/TaskDashboard";
import { TPriotity } from "../../types/TPriotity";
import { IFormHandlerStates } from "../../types/IFormHandlerStates";
import { IError } from "../../types/IError";
import { customAlphabet } from "nanoid";

export const FormHandlersStates = createContext<IFormHandlerStates | null>(
  null
);
const nanoid = customAlphabet("1234567890", 10);

// tasks from localStorage
const storedTasks = localStorage.getItem("tasks");
const storageTasks: ITask[] = storedTasks ? JSON.parse(storedTasks) : [];

// memo components
const TaskDashboardMemo = memo(TaskDashboard);
const TaskModalMemo = memo(TaskModal);

export const Main = () => {
  const [tasks, setTasks] = useState<ITask[]>(storageTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState<TPriotity>("high");
  const [errors, setErrors] = useState<IError>({});
  const [search, setSearch] = useState("");
  const [prioritySort, setPrioritySort] = useState<TPriotity>("all");
  const [dateSort, setDateSort] = useState("");
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  // Обработчик изменения поиска
  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Обработчик изменения приоритета
  const changePrioritySort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrioritySort(event.target.value as TPriotity);
  };

  // Обработчик изменения даты
  const changeDateSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateSort(event.target.value);
  };

  // обработчик закрытия/открытия модально окна создания задачи
  const toggleModalCreateTask = useCallback(() => {
    setModalCreateIsOpen((prevState) => !prevState);
    resetForm();
  }, []);

  // обработчик закрытия/открытия модально окна редактирования задачи
  const toggleModalEditTask = useCallback(() => {
    setModalEditIsOpen((prevState) => !prevState);
    resetForm();
  }, []);

  // Функция создания новой задачи
  const createTask = useCallback(() => {
    const newTask: ITask = {
      id: parseInt(nanoid(), 10),
      title,
      description,
      date,
      priority,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toggleModalCreateTask();
  }, [tasks, title, description, date, priority, toggleModalCreateTask]);

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

  // сброс данных в форме
  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setDate("");
    setPriority("high");
    setErrors({});
  }, []);

  return (
    <div className="container mx-auto px-5">
      {filteredTasks.length ? (
        <TaskDashboardMemo
          tasks={filteredTasks}
          search={search}
          date={dateSort}
          errors={errors}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          changePrioritySort={changePrioritySort}
          changeDateSort={changeDateSort}
          toggleModalEditTask={toggleModalEditTask}
          setTasks={setTasks}
          setErrors={setErrors}
        />
      ) : search.trim() ? (
        <TaskDashboardMemo
          tasks={filteredTasks}
          search={search}
          date={dateSort}
          errors={errors}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          changePrioritySort={changePrioritySort}
          changeDateSort={changeDateSort}
          toggleModalEditTask={toggleModalEditTask}
          setTasks={setTasks}
          setErrors={setErrors}
        />
      ) : tasks.length ? (
        <TaskDashboardMemo
          tasks={filteredTasks}
          search={search}
          date={dateSort}
          errors={errors}
          isOpen={modalEditIsOpen}
          changeSearch={changeSearch}
          changePrioritySort={changePrioritySort}
          changeDateSort={changeDateSort}
          toggleModalEditTask={toggleModalEditTask}
          setTasks={setTasks}
          setErrors={setErrors}
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
        title={title}
        description={description}
        date={date}
        priority={priority}
        errors={errors}
        isOpen={modalCreateIsOpen}
        typeModal={"create"}
        toggleModalTask={toggleModalCreateTask}
        setErrors={setErrors}
        setTitle={setTitle}
        setDesciption={setDescription}
        setDate={setDate}
        setPriority={setPriority}
        createTask={createTask}
      />
    </div>
  );
};
