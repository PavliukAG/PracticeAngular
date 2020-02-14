export interface ConfigTablePagination {
  TotalCount: number;
  PageSize: number;
  PageNumber: number;
  TotalPages: number;
  HasNext: boolean;
  HasPrevious: boolean;
  SortOrder: number;
}
