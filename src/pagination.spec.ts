import { PaginationConfiguration, paginationControls } from "./pagination";

describe("pagination with pageSize of 1", () => {
  it("returns empty array of values, and control with 1 item", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [],
      pageSize: 1,
    };

    const result = paginationControls(conf, 0);
    expect(result.list).toHaveLength(0);
    // expect no results for an empty list
    expect(result.pagination).toHaveLength(1);
    // still expect there to be a pagination with a current page
    expect(result.pagination[0].offsetPage).toBe(undefined);
  });
  it("returns empty array of values, and control with 1 item", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2],
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
    expect(result.pagination[0].offsetPage).toBe(undefined);
    // next item should point to next page
    expect(result.pagination[1].offsetPage).toBe(1);
    // as we have more than item in pagination list, render a next item which points to next page
    expect(result.pagination[2].label).toBe("Next");
    expect(result.pagination[2].offsetPage).toBe(1);
  });
  it("returns 4 pagination elements", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3],
      pageSize: 1,
    };

    const result = paginationControls(conf, 0);
    expect(result.list).toHaveLength(1);
    expect(result.pagination).toHaveLength(4);
    expect(result.pagination[3].label).toBe("Next");
  });
  it("returns 4 pagination elements for 4 values, last one being next", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3, 4],
      pageSize: 1,
    };

    const result = paginationControls(conf, 0);
    expect(result.list).toHaveLength(1);
    expect(result.pagination).toHaveLength(4);
    expect(result.pagination[3].label).toBe("Next");
  });
  it("page offset is now 1", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3, 4],
      pageSize: 1,
    };

    const result = paginationControls(conf, 1);
    expect(result.list).toHaveLength(1);
    expect(result.list[0]).toBe(2);
    expect(result.pagination).toHaveLength(5);
    expect(result.pagination[0].label).toBe("Previous");
    expect(result.pagination[0].offsetPage).toBe(0);
    expect(result.pagination[4].label).toBe("Next");
    expect(result.pagination[4].offsetPage).toBe(2);
  });
  it("page offset is now 2", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3, 4],
      pageSize: 1,
    };

    const result = paginationControls(conf, 2);
    expect(result.list).toHaveLength(1);
    expect(result.list[0]).toBe(3);
    expect(result.pagination).toHaveLength(5);
    expect(result.pagination[1].label).toBe("2");
    expect(result.pagination[2].offsetPage).toBe(undefined);
    expect(result.pagination[3].label).toBe("4");
  });
  it("Navigate pagination using offsetPages", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3, 4],
      pageSize: 1,
    };
    const result = paginationControls(conf, 2);
    expect(result.list[0]).toBe(3);
    expect(result.pagination[0].offsetPage).toBe(1);
    if (result.pagination[0].offsetPage) {
      const result2 = paginationControls(conf, result.pagination[0].offsetPage);
      // using offset in Previous should get you to list item of 2
      expect(result2.list[0]).toBe(2);
      if (result2.pagination[0].offsetPage) {
        // using offset in Previous should get you to list item of 1
        const result3 = paginationControls(
          conf,
          result.pagination[0].offsetPage
        );
        expect(result3.list[0]).toBe(1);
      }
    }
  });
});

describe("pagination with pageSize of 2", () => {
  it("max values 3, bigger array, page offset 0", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3, 4, 5, 6, 7],
      pageSize: 2,
    };
    const result = paginationControls(conf, 0);
    expect(result.list).toHaveLength(2);
    expect(result.pagination).toHaveLength(4);
    expect(result.pagination[0].offsetPage).toBe(undefined);
    expect(result.pagination[3].offsetPage).toBe(1);
  });
  it("page offset 1", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3, 4, 5, 6, 7],
      pageSize: 2,
    };
    const result = paginationControls(conf, 1);
    expect(result.list).toHaveLength(2);
    expect(result.list[0]).toBe(3);
    // expect prev, 1, 2, 3, next
    expect(result.pagination).toHaveLength(5);
    expect(result.pagination[0].offsetPage).toBe(0); // previous
    expect(result.pagination[2].offsetPage).toBe(undefined); // current page so no offset
    expect(result.pagination[4].offsetPage).toBe(2); // next
  });
  it("page offset 2", () => {
    const conf: PaginationConfiguration<number> = {
      maxValues: 3,
      values: [1, 2, 3, 4, 5, 6, 7],
      pageSize: 2,
    };
    const result = paginationControls(conf, 2);
    expect(result.list).toHaveLength(2);
    expect(result.list[0]).toBe(5);
    // expect prev, 1, 2, 3, next
    expect(result.pagination).toHaveLength(6);
    expect(result.pagination[0].offsetPage).toBe(1); // previous
    expect(result.pagination[2].offsetPage).toBe(undefined); // current page so no offset
    expect(result.pagination[4].offsetPage).toBe(3); // next
  });
});
