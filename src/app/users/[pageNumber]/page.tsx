import { SearchAndSort } from "../components/SearchAndSort";
import { SubNav } from "../../components/SubNav";
import { Suspense } from "react";
import { UsersList } from "../components/UserList";
import { UsersLoadingList } from "../../components/UsersLoadingList";
import UsersPageChooser from "../components/UserPageChooser";

export default function UsersPage({
  params,
}: {
  params: { pageNumber: number };
}) {
  return (
    <>
      <SubNav />
      <SearchAndSort />
      <Suspense fallback={<UsersLoadingList />}>
        <UsersList page={params.pageNumber} />
      </Suspense>
      <UsersPageChooser currentPage={params.pageNumber} baseUrl="/users" />
    </>
  );
}
