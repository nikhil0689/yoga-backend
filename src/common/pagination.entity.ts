export interface PaginationParams {
  readonly offset: number;
  readonly limit: number;
}

export const calculateSizeAndOffset = (
  page: number,
  size: number,
): PaginationParams => {
  const defaultPage = page ?? 1;
  const defaultSize = size ?? DEFAULT_PAGE_SIZE;
  const offset: number = (defaultPage - 1) * defaultSize;
  return { offset, limit: Number(defaultSize) };
};

export const DEFAULT_PAGE_SIZE = 10;
