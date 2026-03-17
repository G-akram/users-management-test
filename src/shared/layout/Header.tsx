import { Users } from "lucide-react";
import { SearchBar } from "../../features/search";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isFiltering: boolean;
  resultCount: number;
}

export function Header({
  searchQuery,
  onSearchChange,
  isFiltering,
  resultCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2.5 mr-auto">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-sm">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-900 tracking-tight">
            User Directory
          </span>
        </div>

        <div className="w-full sm:w-80">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            isFiltering={isFiltering}
            resultCount={resultCount}
          />
        </div>
      </div>
    </header>
  );
}
