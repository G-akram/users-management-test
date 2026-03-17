import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE_OPTIONS = [5, 10, 20] as const;
const MAX_VISIBLE_PAGES = 5;

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isFetching: boolean;
}

// Ensure select value is always a string so React matches it to option values reliably
function toSelectValue(n: number): string {
  return String(n);
}

export function Pagination({
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  isFetching,
}: PaginationProps) {
  const pages = buildPageRange(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
      {/* Page size selector */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>Rows per page</span>
        <select
          value={toSelectValue(pageSize)}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
          }}
          className="rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-700 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition cursor-pointer"
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s} value={String(s)}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation */}
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <NavBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || isFetching}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </NavBtn>

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 text-slate-400 text-sm select-none"
            >
              …
            </span>
          ) : (
            <NavBtn
              key={p}
              onClick={() => onPageChange(p)}
              disabled={isFetching}
              active={p === page}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </NavBtn>
          ),
        )}

        <NavBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || isFetching}
          aria-label="Next page"
        >
          <ChevronRight />
        </NavBtn>
      </nav>
    </div>
  );
}

interface NavBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function NavBtn({ children, active, ...props }: NavBtnProps) {
  return (
    <button
      {...props}
      className={`min-w-[2rem] h-8 px-2 flex items-center justify-center rounded-lg text-sm font-medium border transition disabled:opacity-40 disabled:cursor-not-allowed
        ${
          active
            ? "bg-brand-500 border-brand-500 text-white shadow-sm"
            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
        }`}
    >
      {children}
    </button>
  );
}

function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range = new Set([1, total, current]);
  for (let i = -1; i <= 1; i++) {
    const p = current + i;
    if (p > 1 && p < total) range.add(p);
  }

  const sorted = [...range].sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
    result.push(sorted[i]);
  }
  return result;
}
