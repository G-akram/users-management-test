import React from "react";
import { useUsers } from "../hooks/useUsers";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { UserGrid } from "../components/UserGrid";

const UserListPage = () => {
  const page = 1;
  const pageSize = 10;
  const { data, isLoading, isError, error, refetch, isFetching } = useUsers({
    page,
    pageSize,
  });

  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-5 min-h-[1.5rem]">
          <p className="text-sm text-slate-400">
            {isLoading
              ? "Fetching users…"
              : `${data?.results.length} user${data?.results.length !== 1 ? "s" : ""} on this page`}
            {isFetching && !isLoading && (
              <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            )}
          </p>
        </div>

        <ErrorBoundary>
          <UserGrid
            users={data?.results || []}
            isLoading={isLoading}
            isError={isError}
            error={error}
            pageSize={pageSize}
            page={page}
            onRetry={refetch}
          />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default UserListPage;
