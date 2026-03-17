import type { UsersResponse, PaginationParams } from "../types/user.types";

const BASE_URL = "https://randomuser.me/api";

export async function fetchUsers({
  page,
  pageSize,
}: PaginationParams): Promise<UsersResponse> {
  const params = new URLSearchParams({
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
