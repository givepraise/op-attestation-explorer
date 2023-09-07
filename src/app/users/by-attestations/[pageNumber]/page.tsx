import { SearchAndSort } from "../../components/SearchAndSort";
import { SubNav } from "../../../components/SubNav";
import { Suspense } from "react";
import { UsersList } from "../../components/UsersList";
import { UsersLoadingList } from "../../components/UsersLoadingList";
import UsersPageChooser from "../../components/UsersPageChooser";

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
        <UsersList page={params.pageNumber} sortBy="attestations" />
      </Suspense>
      <UsersPageChooser
        currentPage={params.pageNumber}
        baseUrl="/users/by-attestations"
      />
    </>
  );
}
