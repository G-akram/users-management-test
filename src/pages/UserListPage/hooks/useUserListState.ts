import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "../../../features/users";
import { useDebounce } from "../../../features/search";
import {
  DEFAULT_PAGE_SIZE,
  VALID_PAGE_SIZES,
  type PageSize,
} from "../../../features/users";

/** Parses pageSize from the URL and clamps it to a valid option. */
function parsePageSize(raw: string | null): PageSize {
  const n = Number(raw);
  return (VALID_PAGE_SIZES as readonly number[]).includes(n)
    ? (n as PageSize)
    : DEFAULT_PAGE_SIZE;
}

export function useUserListState() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Derive state from URL ───────────────────────────────────────────────
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = parsePageSize(searchParams.get("pageSize"));
  const searchQuery = searchParams.get("q") ?? "";
  const debouncedQuery = useDebounce(searchQuery, 280);

  // ── Data fetching ───────────────────────────────────────────────────────
  const { data, isLoading, isError, error, refetch, isFetching } = useUsers({
    page,
    pageSize,
  });

  // ── URL setters ─────────────────────────────────────────────────────────
  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
    // NOTE: Scroll to top on page change for better UX. In a production app, consider
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

  // ── Client-side filter ──────────────────────────────────────────────────
  // Note: memoised to avoid re-filtering on every keystroke while debouncing
  // In a production app with a large dataset, prefer server-side filtering
  // NOTE: Memo is used for demo purpose
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

  return {
    // URL-derived state
    page,
    pageSize,
    searchQuery,
    debouncedQuery,
    // Query state
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    // Derived data
    filteredUsers,
    // Actions
    setPage,
    setPageSize,
    handleSearch,
  };
}
