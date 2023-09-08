import { SearchAndSort } from "../../../../../components/users/SearchAndSort";
import { SubNav } from "../../../../../components/SubNav";
import { Suspense } from "react";
import { UsersList } from "../../../../../components/users/UsersList";
import { UsersLoadingList } from "../../../../../components/users/UsersLoadingList";
import UsersPageChooser from "../../../../../components/users/UsersPageChooser";

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
        <UsersList
          page={params.pageNumber}
          sortOrder="desc"
          sortBy="attestations"
        />
      </Suspense>
      <UsersPageChooser
        currentPage={params.pageNumber}
        baseUrl="/users/by-attestations/desc"
      />
    </>
  );
}
