export interface QueryParams {
  limit: number;
  page: number;
  sort: string;
  sortDirection: 'ASC' | 'DESC';
  keyword: string,
  where: {
    [index: string]: any;
  };
}
