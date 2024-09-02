import { TPriority } from "./TPriority";

export interface ITask {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: TPriority;
}
