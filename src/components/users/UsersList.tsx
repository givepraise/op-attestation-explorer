import {
  GetUsersSortBy,
  GetUsersSortOrder,
} from "../../eas/types/get-users-sort.type";

import { USERS_PER_PAGE } from "../../constants";
import { UserCard } from "../user/UserCard";
import { getUsers } from "../../eas/getUsers";

type UsersListProps = {
  sortBy?: GetUsersSortBy;
  sortOrder?: GetUsersSortOrder;
  page: number;
};

export async function UsersList({
  sortBy = "username",
  sortOrder = "asc",
  page,
}: UsersListProps) {
  const users = await getUsers(sortBy, sortOrder);

  if (!users || users.length === 0) {
    return <div>No attestations found</div>;
  }

  const startIndex = (page - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <div className="w-full grid grid-cols-3 gap-5">
      {paginatedUsers.map((user) => (
        <UserCard user={user} key={user.address} />
      ))}
    </div>
  );
}
