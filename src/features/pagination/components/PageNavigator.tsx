import { ChevronLeft, ChevronRight } from "lucide-react";

const MAX_VISIBLE_PAGES = 5;

interface PageNavigatorProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}

export function PageNavigator({
  page,
  totalPages,
  onPageChange,
  isFetching = false,
}: PageNavigatorProps) {
  const pages = buildPageRange(page, totalPages);

  return (
    <nav aria-label="Page navigation" className="flex items-center gap-1">
      <NavBtn
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isFetching}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </NavBtn>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-1.5 text-slate-400 text-sm select-none"
          >
            …
          </span>
        ) : (
          <NavBtn
            key={p}
            onClick={() => onPageChange(p)}
            disabled={isFetching}
            active={p === page}
            aria-label={`Go to page ${p}`}
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
        <ChevronRight className="w-4 h-4" />
      </NavBtn>
    </nav>
  );
}

// ── Internal sub-components ──────────────────────────────────────────────────

interface NavBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function NavBtn({ children, active, className = "", ...props }: NavBtnProps) {
  return (
    <button
      {...props}
      className={`min-w-[2rem] h-8 px-2 flex items-center justify-center rounded-lg text-sm font-medium border transition
        disabled:opacity-40 disabled:cursor-not-allowed
        ${
          active
            ? "bg-brand-500 border-brand-500 text-white shadow-sm"
            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
        } ${className}`}
    >
      {children}
    </button>
  );
}

// ── Page range algorithm ─────────────────────────────────────────────────────

function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range = new Set([1, total, current]);
  for (let delta = -1; delta <= 1; delta++) {
    const p = current + delta;
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
