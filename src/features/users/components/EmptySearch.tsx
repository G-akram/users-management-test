interface EmptySearchProps {
  query: string;
}

/** Shown when the client-side filter produces zero results. */
export function EmptySearch({ query }: EmptySearchProps) {
  return (
    <div className="col-span-full py-20 text-center">
      <p className="text-4xl mb-3">🔍</p>
      <p className="font-semibold text-slate-700">No results for "{query}"</p>
      <p className="text-sm text-slate-400 mt-1">
        Try a different name, email or city.
      </p>
    </div>
  );
}
