export interface PaginationConfiguration<T> {
  pageSize: number;
  maxValues: number;
  values: T[];
}

export interface PaginationItem {
  label: string;
  // number indicates page to jump to, undefined means this page is current viewed results
  offsetPage: number | undefined;
}

export interface PaginationResult {
  pagination: PaginationItem[];
  list: number[];
}

export function paginationControls(
  config: PaginationConfiguration<number>,
  offsetPage: number
): PaginationResult {
  const result: PaginationResult = {
    pagination: [],
    list: [],
  };

  if (config.values.length === 0) {
    result.pagination.push({ label: "1", offsetPage: undefined });
  } else {
    const totalPages = Math.floor(config.values.length / config.pageSize);
    if (offsetPage > totalPages) {
        // reset offset page to final page if it's greater than the total number of pages
        offsetPage = totalPages - 1;
    }
    let firstPage = offsetPage - config.maxValues;
    if (firstPage < 0) {
        firstPage = 0;
    }

    if (offsetPage > 0) {
      result.pagination.push({
        label: `Previous`,
        offsetPage: offsetPage - 1
      });
    }

    // const firstVisiblePagination 
    // so calculate how many visible pages there should be based on the offset
    for (let i = firstPage; i < totalPages && i < config.maxValues; i++) {
      result.pagination.push({
        label: `${i + 1}`,
        offsetPage: i === offsetPage ? undefined : i,
      });
    }

    if (result.pagination.length > 1) {
      result.pagination.push({
        label: "Next",
        offsetPage: offsetPage + 1,
      });
    }
    const first = offsetPage * config.pageSize;
    const last = first + config.pageSize;
    result.list = config.values.slice(first, last);
  }

  return result;
}
