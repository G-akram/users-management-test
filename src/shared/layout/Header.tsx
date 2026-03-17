import { Users } from "lucide-react";
import { SearchBar } from "../../features/search";
import { PageSizeSelector } from "../../features/pagination";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isFiltering: boolean;
  resultCount: number;
  pageSize: number;
  pageSizeOptions: readonly number[];
  onPageSizeChange: (size: number) => void;
  isFetching: boolean;
}

export function Header({
  searchQuery,
  onSearchChange,
  isFiltering,
  resultCount,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  isFetching,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b shadow-sm bg-white/90 backdrop-blur-md border-slate-100">
      <div className="flex flex-col items-start max-w-6xl gap-3 px-4 py-3 mx-auto sm:px-6 sm:flex-row sm:items-center">
        {/* ── Brand ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mr-auto">
          <div className="flex items-center justify-center w-8 h-8 shadow-md rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-brand-200">
            <Users className="w-4 h-4 text-black" />
          </div>
          <div>
            <span className="text-sm font-bold leading-none tracking-tight text-slate-900">
              User Directory
            </span>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5 font-medium tracking-wide">
              randomuser.me
            </p>
          </div>
        </div>

        {/* ── Search ───────────────────────────────────────────────── */}
        <div className="w-full sm:w-72">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            isFiltering={isFiltering}
            resultCount={resultCount}
          />
        </div>

        {/* ── Rows per page ────────────────────────────────────────── */}
        <PageSizeSelector
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onChange={onPageSizeChange}
          disabled={isFetching}
        />
      </div>
    </header>
  );
}
