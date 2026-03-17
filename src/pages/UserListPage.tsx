import React, { useMemo } from "react";
import { useUsers } from "../hooks/useUsers";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { UserGrid } from "../components/UserGrid";
import { Pagination } from "../components/Pagination";
import { DEFAULT_PAGE_SIZE, TOTAL_PAGES, VALID_PAGE_SIZES } from "../constants";
import { useSearchParams } from "react-router-dom";
import { Header } from "../components/Header";
import { useDebounce } from "../hooks/useDebounce";

type PageSize = (typeof VALID_PAGE_SIZES)[number];

/** Parses pageSize from URL and clamps it to a valid option. */
function parsePageSize(raw: string | null): PageSize {
  const n = Number(raw);
  return (VALID_PAGE_SIZES as readonly number[]).includes(n)
    ? (n as PageSize)
    : DEFAULT_PAGE_SIZE;
}
const UserListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = parsePageSize(searchParams.get("pageSize"));

  const searchQuery = searchParams.get("q") ?? "";

  const debouncedQuery = useDebounce(searchQuery, 280);

  const { data, isLoading, isError, error, refetch, isFetching } = useUsers({
    page,
    pageSize,
  });

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setPageSize = (newSize: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("pageSize", String(newSize));

      return next;
    });
  };

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set("q", value);
      } else {
        next.delete("q");
      }

      return next;
    });
  };

  // Client-side filtering on the current page's cached data
  // Info: Memoized to avoid unnecessary recalculations on every render while typing
  // Note: In a real app, server-side filtering would be preferable for large datasets
  // Note: Memo here is just for demo purpose
  const filteredUsers = useMemo(() => {
    const users = data?.results ?? [];
    if (!debouncedQuery.trim()) return users;
    const q = debouncedQuery.toLowerCase();
    return users.filter(
      ({ name, email, location }) =>
        `${name.first} ${name.last}`.toLowerCase().includes(q) ||
        email.toLowerCase().includes(q) ||
        location.city.toLowerCase().includes(q),
    );
  }, [data?.results, debouncedQuery]);

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
          />
        )}
      </main>
    </div>
  );
};

export default UserListPage;
