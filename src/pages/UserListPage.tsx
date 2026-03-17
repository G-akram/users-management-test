import React from "react";
import { useUsers } from "../hooks/useUsers";

const UserListPage = () => {
  const page = 1;
  const pageSize = 10;
  const { data, isLoading, isError, error, refetch, isFetching } = useUsers({
    page,
    pageSize,
  });

  console.log(data?.results); // TODO: to be removed

  return (
    <div>
      UserListPage
      {data?.results.map((user) => (
        <div key={user.login.uuid}>
          {user.name.first} {user.name.last}
        </div>
      ))}
    </div>
  );
};

export default UserListPage;
