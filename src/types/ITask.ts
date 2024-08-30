import { TPriotity } from "./TPriotity";

export interface ITask {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: TPriotity;
}
