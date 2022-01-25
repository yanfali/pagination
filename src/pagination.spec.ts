import {
  PaginationConfiguration,
  PaginationResult,
  paginationControls,
} from "./pagination";

describe("pagination", () => {
  it("returns empty array of values, and control with 1 item", () => {
    const conf: PaginationConfiguration<number>= {
      maxValues: 3,
      values: [],
      pageSize: 1,
    };

    const result = paginationControls(conf, 0);
    expect(result.list).toHaveLength(0);
    expect(result.pagination).toHaveLength(1);
    expect(result.pagination[0].offsetPage).toBe(null);
  });
  it("returns empty array of values, and control with 1 item", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [ 1, 2 ],
      pageSize: 1,
    };

    const result = paginationControls(conf, 0);
    // should return 1 list item due to page size
    expect(result.list).toHaveLength(1);
    // should be value 1
    expect(result.list[0]).toBe(1);
    // pagination should return 3 items
    expect(result.pagination).toHaveLength(3);
    // use null to indicate this is current page so don't render link
    expect(result.pagination[0].offsetPage).toBe(null);
    // next item should point to next page
    expect(result.pagination[1].offsetPage).toBe(1);
    // as we have more than item in pagination list, render a next item which points to next page
    expect(result.pagination[2].label).toBe('Next');
    expect(result.pagination[2].offsetPage).toBe(1);
  });
});
