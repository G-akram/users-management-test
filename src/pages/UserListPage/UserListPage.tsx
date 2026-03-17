import { UserGrid } from "../../features/users";
import { PageNavigator } from "../../features/pagination";
import { TOTAL_PAGES, VALID_PAGE_SIZES } from "../../features/users";
import { ErrorBoundary } from "../../shared/components";
import { Header } from "../../shared/layout/Header";
import { useUserListState } from "./hooks/useUserListState";

const UserListPage = () => {
  const {
    page,
    pageSize,
    searchQuery,
    debouncedQuery,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    filteredUsers,
    setPage,
    setPageSize,
    handleSearch,
  } = useUserListState();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Sticky header — contains brand, search, and rows-per-page ── */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        isFiltering={debouncedQuery !== searchQuery}
        resultCount={filteredUsers.length}
        pageSize={pageSize}
        pageSizeOptions={VALID_PAGE_SIZES}
        onPageSizeChange={setPageSize}
        isFetching={isFetching}
      />

      <main className="max-w-6xl px-4 py-8 mx-auto sm:px-6">
        {/* ── Status bar ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6 min-h-[1.5rem]">
          <p className="text-sm text-slate-400">
            {isLoading
              ? "Fetching users…"
              : `${filteredUsers.length} user${filteredUsers.length !== 1 ? "s" : ""} on this page`}
            {isFetching && !isLoading && (
              <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            )}
          </p>

          <span className="font-mono text-xs text-slate-300 tabular-nums">
            pg {page} / {TOTAL_PAGES}
          </span>
        </div>

        {/* ── User grid (handles loading skeleton + error state internally) ── */}
        <ErrorBoundary>
          <UserGrid
            users={filteredUsers}
            isLoading={isLoading}
            isError={isError}
            error={error}
            pageSize={pageSize}
            searchQuery={searchQuery}
            onRetry={refetch}
          />
        </ErrorBoundary>

        {/* ── Bottom navigation ─────────────────────────────────────── */}
        {!isError && !isLoading && (
          <div className="flex justify-center pt-8 mt-8 border-t border-slate-100">
            <PageNavigator
              page={page}
              totalPages={TOTAL_PAGES}
              onPageChange={setPage}
              isFetching={isFetching}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default UserListPage;
