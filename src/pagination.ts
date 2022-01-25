export interface PaginationConfiguration {
  pageSize: number;
  maxValues: number;
  values: number[];
}

export interface PaginationItem {
  label: string;
  offsetPage: number | null;
}

export interface PaginationResult {
  pagination: PaginationItem[];
  list: number[];
}

export function paginationControls(
  config: PaginationConfiguration,
  offsetPage: number
): PaginationResult {
  const result: PaginationResult = {
    pagination: [],
    list: [],
  };

  if (config.values.length === 0) {
    result.pagination.push({ label: "1", offsetPage: null });
  } else {
    let totalPages = Math.floor(config.values.length / config.pageSize);
    const offsetPage = 0;
    for (let i = offsetPage; i < totalPages && i < config.maxValues; i++) {
      result.pagination.push({
        label: `${i + 1}`,
        offsetPage: i === offsetPage ? null : i,
      } as PaginationItem);
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
