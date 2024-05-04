import { expect, jest, test, beforeEach, describe } from "@jest/globals";
import { Paginate, PaginateOptions } from "../../../util/paginate";
import { RestErrorCodes } from "../../rest-error";

describe("Paginate", () => {
  let paginate: Paginate<number>;

  beforeEach(() => {
    paginate = new Paginate([1, 2, 3], 3, 3, 1);
  });

  test("should create a new instance of Paginate", () => {
    expect(paginate).toBeInstanceOf(Paginate);
  });

  test("should have the correct properties", () => {
    expect(paginate.data).toEqual([1, 2, 3]);
    expect(paginate.total).toBe(3);
    expect(paginate.limit).toBe(3);
    expect(paginate.page).toBe(1);
    expect(paginate.pages).toBe(1);
  });
});

describe("PaginateOptions", () => {
  let paginateOptions: PaginateOptions<number>;

  beforeEach(() => {
    paginateOptions = new PaginateOptions({ limit: 5, page: 2, filters: "{}" });
  });

  test("should create a new instance of PaginateOptions", () => {
    expect(paginateOptions).toBeInstanceOf(PaginateOptions);
  });

  test("should have the correct properties", () => {
    expect(paginateOptions.limit).toBe(5);
    expect(paginateOptions.page).toBe(2);
    expect(paginateOptions.filters).toEqual({});
  });

  test("should throw an error if json of filter is invalid", () => {
    try {
      const invalidJson = "{";
      paginateOptions = new PaginateOptions({
        limit: 5,
        page: 2,
        filters: invalidJson,
      });
    } catch (error: any) {
      expect(error.message).toBe("Invalid paginate options");
      expect(error.code).toBe(RestErrorCodes.BAD_REQUEST);
    }
  });
});
