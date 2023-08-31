import { SearchAndSort } from "../../components/SearchAndSort";
import { SubNav } from "../../../components/SubNav";
import { UsersList } from "../../components/UserList";
import UsersPageChooser from "../../components/UserPageChooser";

export default function UsersPage({
  params,
}: {
  params: { pageNumber: number };
}) {
  return (
    <>
      <SubNav />
      <SearchAndSort />
      <UsersList page={params.pageNumber} sortOrder="desc" />
      <UsersPageChooser currentPage={params.pageNumber} baseUrl="/users/desc" />
    </>
  );
}
