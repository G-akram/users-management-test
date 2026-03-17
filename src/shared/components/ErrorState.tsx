import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

/** Shown when a React Query fetch fails — distinct from the crash-catching ErrorBoundary. */
export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div
      data-testid="error-state"
      role="alert"
      className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-4"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
        <AlertCircle className="w-7 h-7 text-red-400" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Failed to load users</h2>
        <p className="text-sm text-slate-400 mt-1 max-w-xs">
          {error?.message ?? "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 active:bg-brand-700 transition shadow-sm"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Try again
      </button>
    </div>
  );
}
