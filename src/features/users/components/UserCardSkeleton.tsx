/** Animated placeholder that mirrors the exact layout of the redesigned UserCard. */
export function UserCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm animate-pulse">
      {/* ── Photo area ──────────────────────────────────────────────── */}
      <div className="relative h-48 bg-slate-200 shrink-0">
        {/* Nationality pill */}
        <div className="absolute top-3 right-3 h-5 w-9 rounded-full bg-slate-300" />
        {/* Age badge */}
        <div className="absolute top-3 left-3 h-5 w-12 rounded-full bg-slate-300" />
        {/* Name block */}
        <div className="absolute bottom-3.5 left-4 h-4 w-36 rounded bg-slate-300" />
      </div>

      {/* ── Detail rows ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5 px-4 py-4">
        <SkeletonRow width="w-3/4" />
        <SkeletonRow width="w-1/2" />
        <SkeletonRow width="w-2/3" />
      </div>
    </div>
  );
}

function SkeletonRow({ width }: { width: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="shrink-0 w-3.5 h-3.5 rounded-full bg-slate-200" />
      <div className={`h-3 rounded bg-slate-200 ${width}`} />
    </div>
  );
}
