export interface IFormHandlerStates {
  changeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changePriority: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
