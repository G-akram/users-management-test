interface PageSizeSelectorProps {
  pageSize: number;
  pageSizeOptions: readonly number[];
  onChange: (size: number) => void;
  disabled?: boolean;
}

export function PageSizeSelector({
  pageSize,
  pageSizeOptions,
  onChange,
  disabled = false,
}: PageSizeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 whitespace-nowrap">
        Rows per page
      </span>
      <select
        value={String(pageSize)}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pageSizeOptions.map((s) => (
          <option key={s} value={String(s)}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
