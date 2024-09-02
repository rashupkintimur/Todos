import { Dispatch, SetStateAction } from "react";

// обработчик изменений
export function handleChange(setter: Dispatch<SetStateAction<any>>) {
  return (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setter(e.target.value);
}
