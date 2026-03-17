import type { UsersResponse, PaginationParams } from "../types/user.types";

const BASE_URL = "https://randomuser.me/api";

//NOTE: Seed is added to ensure consistent results across pagination (same users on each page on every load) because randomuser.me generates a new set of users for each request.
// In a real app, the backend should handle this.
const SEED = "user-directory-app";

export async function fetchUsers({
  page,
  pageSize,
}: PaginationParams): Promise<UsersResponse> {
  const params = new URLSearchParams({
    seed: SEED,
    page: String(page),
    results: String(pageSize),
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(
      `randomuser.me responded with ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<UsersResponse>;
}
