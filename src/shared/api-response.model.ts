import { Pagination } from './pagination.model';

export class ApiResponse<T> {
  pagination?: Pagination;
  data?: T;
}
