import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isFiltering: boolean;
  resultCount: number;
}

export function SearchBar({
  value,
  onChange,
  isFiltering,
  resultCount,
}: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <Search className="pointer-events-none absolute left-3 w-4 h-4 text-slate-400" />

      <input
        data-testid="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, email or city…"
        autoComplete="off"
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
      />

      {value && !isFiltering && (
        <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-brand-500 text-white text-[10px] font-semibold shadow">
          {resultCount}
        </span>
      )}
    </div>
  );
}
