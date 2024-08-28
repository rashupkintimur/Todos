import { TPriotity } from "./TPriotity";

export interface ITask {
  title: string;
  description: string;
  dateAndTime: Date;
  priority: TPriotity;
}
