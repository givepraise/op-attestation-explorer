import { SearchBox } from "../SearchBox";
import { UserSortBy } from "./UserSortBy";
import { UserSortOrder } from "./UserSortOrder";

export function SearchAndSort() {
  return (
    <div className="flex md:flex-row flex-col gap-5 w-full">
      <SearchBox />
      <UserSortOrder />
      <UserSortBy />
    </div>
  );
}
