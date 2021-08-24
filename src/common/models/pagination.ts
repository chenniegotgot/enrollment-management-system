export interface Pagination<T> {
  page: number;
  limit: number;
  totalCount: number;
  data: T[];
}
