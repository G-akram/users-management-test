import { UserCardSkeleton } from "./UserCardSkeleton";

interface UserGridSkeletonProps {
  count: number;
}

export function UserGridSkeleton({ count }: UserGridSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading users…"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </div>
  );
}
