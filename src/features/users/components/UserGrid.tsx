import type { User } from "../types/user.types";
import { UserCard } from "./UserCard";
import { EmptySearch } from "./EmptySearch";
import { ErrorState } from "../../../shared/components/ErrorState";

interface UserGridProps {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  pageSize: number;
  page: number;
  searchQuery: string;
  onRetry: () => void;
}

export function UserGrid({
  users,
  isLoading,
  isError,
  error,
  pageSize,
  page,
  searchQuery,
  onRetry,
}: UserGridProps) {
  if (isError) return <ErrorState error={error} onRetry={onRetry} />;

  return (
    <div
      data-testid="user-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      {isLoading ? (
        // TODO: replace with skeleton loaders
        "loading.."
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
        <EmptySearch query={searchQuery} />
      )}
    </div>
  );
}
