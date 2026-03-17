import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUsers } from "../api/usersApi";
import type { PaginationParams } from "../types/user";

export const userKeys = {
  all: ["users"] as const,
  page: (page: number, pageSize: number) =>
    ["users", { page, pageSize }] as const,
};

/**
 * Fetches the current page and silently/in background prefetches the next one
 * By the time the user clicks "Next", data should be already in the cache.
 */
export function useUsers({ page, pageSize }: PaginationParams) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: userKeys.page(page, pageSize),
    queryFn: () => fetchUsers({ page, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1_000,
    retry: 2,
  });

  // Prefetch next page in the background so navigation is instant
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: userKeys.page(page + 1, pageSize),
      queryFn: () => fetchUsers({ page: page + 1, pageSize }),
      staleTime: 5 * 60 * 1_000,
    });
  }, [page, pageSize, queryClient]);

  return query;
}
