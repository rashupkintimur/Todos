import { TPriotity } from "./TPriotity";

export interface ITask {
  title: string;
  description: string;
  date: string;
  priority: TPriotity;
}
