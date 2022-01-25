import { ICategory } from "./submission";

export interface IResultItem {
  category: ICategory;
  yes: number;
  no: number;
  na: number;
  total: number;
}
