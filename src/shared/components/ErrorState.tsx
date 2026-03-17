import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

/** Shown when a React Query fetch fails — distinct from the crash-catching ErrorBoundary. */
export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div
      /* TODO: to be used for E2E tests */
      data-testid="error-state"
      role="alert"
      className="flex flex-col items-center justify-center gap-4 py-24 text-center col-span-full"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50">
        <AlertCircle className="text-red-400 w-7 h-7" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Failed to load users
        </h2>
        <p className="max-w-xs mt-1 text-sm text-slate-400">
          {error?.message ?? "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition shadow-sm rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Try again
      </button>
    </div>
  );
}
