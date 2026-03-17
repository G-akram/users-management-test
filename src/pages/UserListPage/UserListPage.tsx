import { UserGrid } from "../../features/users";
import { Pagination } from "../../features/pagination";
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
    <div>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        isFiltering={debouncedQuery !== searchQuery}
        resultCount={filteredUsers.length}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-5 min-h-[1.5rem]">
          <p className="text-sm text-slate-400">
            {isLoading
              ? "Fetching users…"
              : `${filteredUsers.length} user${filteredUsers.length !== 1 ? "s" : ""} on this page`}
            {isFetching && !isLoading && (
              <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            )}
          </p>
        </div>

        <ErrorBoundary>
          <UserGrid
            users={filteredUsers}
            isLoading={isLoading}
            isError={isError}
            error={error}
            pageSize={pageSize}
            page={page}
            searchQuery={searchQuery}
            onRetry={refetch}
          />
        </ErrorBoundary>

        {!isError && !isLoading && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalPages={TOTAL_PAGES}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            isFetching={isFetching}
            pageSizeOptions={VALID_PAGE_SIZES}
          />
        )}
      </main>
    </div>
  );
};

export default UserListPage;
