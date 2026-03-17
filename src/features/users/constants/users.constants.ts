export const DEFAULT_PAGE_SIZE = 10;
export const TOTAL_PAGES = 50;
export const VALID_PAGE_SIZES = [5, 10, 20] as const;

/** Derived type for the valid page size union: 5 | 10 | 20 */
export type PageSize = (typeof VALID_PAGE_SIZES)[number];
