export interface ICategory {
  name: string;
  weightage: number;
  description?: string;
  _id?: string;
}

export interface IQuestion {
  category: string | ICategory;
  text: string;
  weightage: number;
  _id: string;
  isDeleted?: boolean;
}
