import React, { Dispatch, FC, SetStateAction } from "react";
import Modal from "react-modal";
import { FormButton } from "../FormButton";
import { TModal } from "../../types/TModal";
import { TPriotity } from "../../types/TPriotity";

type TaskModalProps = {
  title: string;
  description: string;
  date: string;
  isOpen: boolean;
  typeModal: TModal;
  setIsOpen: () => void;
  setTitle: Dispatch<SetStateAction<string>>;
  setDesciption: Dispatch<SetStateAction<string>>;
  setDate: Dispatch<SetStateAction<string>>;
  setPriority: Dispatch<SetStateAction<TPriotity>>;
  submitForm: (event: React.FormEvent) => void;
};

const customStyles = {
  content: {
    maxWidth: "700px",
    width: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const TaskModal: FC<TaskModalProps> = ({
  title,
  description,
  date,
  isOpen,
  typeModal,
  setIsOpen,
  setTitle,
  setDesciption,
  setDate,
  setPriority,
  submitForm,
}) => {
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesciption(event.target.value);
  };

  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const changePriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value as TPriotity);
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <button onClick={setIsOpen} className="absolute right-7 top-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <form className="py-5 px-5 grid gap-3" onSubmit={submitForm}>
        <div className="grid gap-3">
          <label htmlFor="title" className="text-2xl cursor-pointer">
            Заголовок:
          </label>
          <input
            value={title}
            onChange={changeTitle}
            id="title"
            type="text"
            className="p-2 text-slate-950 rounded border border-gray-300"
          />
        </div>
        <div className="grid gap-3">
          <label htmlFor="description" className="text-2xl cursor-pointer">
            Описание:
          </label>
          <textarea
            value={description}
            onChange={changeDescription}
            id="description"
            className="p-2 text-slate-950 rounded border border-gray-300 resize-none h-28"
          />
        </div>
        <div className="grid gap-3">
          <label htmlFor="date" className="text-2xl cursor-pointer">
            Дата окончания:
          </label>
          <input
            value={date}
            onChange={changeDate}
            id="date"
            type="date"
            className="rounded p-2 text-slate-950 border border-gray-300 cursor-pointer"
          />
        </div>
        <div className="grid gap-3 mb-4">
          <label htmlFor="priority" className="text-2xl cursor-pointer">
            Приоритет:
          </label>
          <select
            onChange={changePriority}
            id="priority"
            className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option selected value="high">
              Высокий
            </option>
            <option value="middle">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>
        <FormButton type={typeModal} />
      </form>
    </Modal>
  );
};
