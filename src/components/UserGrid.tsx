import type { User } from "../types/user";
import { UserCard } from "./UserCard";
import { ErrorState } from "./ErrorState";

interface UserGridProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  pageSize: number;
  page: number;
  // TODO: searchQuery?: string; to be implemented in the future when search will be added
  onRetry: () => void;
}

export function UserGrid({
  users,
  isLoading,
  isError,
  error,
  pageSize,
  page,

  onRetry,
}: UserGridProps) {
  if (isError) return <ErrorState error={error} onRetry={onRetry} />;

  return (
    <div
      data-testid="user-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {isLoading ? (
        "loading.." //TODO: skeleton loaders
      ) : users.length > 0 ? (
        users.map((user, i) => (
          <UserCard
            key={user.login.uuid}
            user={user}
            page={page}
            pageSize={pageSize}
            style={{ animationDelay: `${i * 40}ms` }}
          />
        ))
      ) : (
        <EmptySearch query={"searchQuery"} />
      )}
    </div>
  );
}

function EmptySearch({ query }: { query: string }) {
  return (
    <div className="col-span-full py-20 text-center">
      <p className="text-4xl mb-3">🔍</p>
      <p className="font-semibold text-slate-700">No results for "{query}"</p>
      <p className="text-sm text-slate-400 mt-1">
        Try a different name, email or city.
      </p>
    </div>
  );
}
