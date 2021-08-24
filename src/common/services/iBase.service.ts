import { Pagination } from "../models/pagination";
import { QueryParams } from "../models/queryParams";
import { User } from "../../entities/user.entity";

export interface IBaseService<T> {
  getAll(user: User, queryParams: QueryParams, entity: any): Promise<Pagination<T>>;
  get(user: User, id: number): Promise<T>;
  update(user: User, id: number, entity: T): Promise<T>;
  create(user: User, entity: T): Promise<T>;
  delete(user: User, id: number);
  checkPermission(action: any, user: User, data: any): boolean;
}
