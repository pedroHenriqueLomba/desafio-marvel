import { RestError } from "./rest-error";

export class Paginate<T> {
  public data: T[];
  public total: number;
  public limit: number;
  public page: number;
  public pages: number;

  constructor(data: T[], total: number, limit: number, page: number) {
    this.data = data;
    this.total = total;
    this.limit = limit;
    this.page = page;
    this.pages = Math.ceil(total / limit);
  }
}

export class PaginateOptions<T> {
  public limit: number;
  public page: number;
  public filters: T;

  constructor({ limit = 100, page = 1, filters = "{}" }) {
    try {
      this.limit = Number(limit);
      this.page = Number(page);
      this.filters = JSON.parse(filters) as T;
    } catch (error) {
      throw new RestError("Invalid paginate options");
    }
  }
}
