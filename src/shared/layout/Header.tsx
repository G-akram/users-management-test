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
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">

        {/* ── Brand ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mr-auto">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md shadow-brand-200">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-sm leading-none">
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
