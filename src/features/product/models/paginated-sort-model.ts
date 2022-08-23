export interface PaginatedSortModel {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
