import { IUser } from "./user";

export interface ICategory {
  name: string;
  displayOrder: number;
  showNa: string;
  description?: string;
  _id?: string;
}

export interface IQuestion {
  category: string | ICategory;
  text: string;
  _id: string;
  isDeleted?: boolean;
}

export interface IQns {
  questionId: string;
  response: string;
}

export interface IProject {
  name: string;
  submissions: string[];
  userId?: IUser;
  published?: boolean;
  latest?: string;
}

export interface ISubmission {
  questions: IQns[];
  createdAt?: Date;
  projectId?: IProject | string;
  _id?: string;
  createdOn?: string;
}
