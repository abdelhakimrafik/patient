export class PageDto<T> {
  page: number;

  pageSize: number;

  total: number;

  totalPage: number;

  data: T[];

  constructor(page: number, pageSize: number, total: number, data: T[]) {
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
    this.totalPage = Math.trunc(total / pageSize);
    this.data = data;
  }
}
