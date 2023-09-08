import { SearchBox } from "../SearchBox";
import { UserSortBy } from "./UserSortBy";
import { UserSortOrder } from "./UserSortOrder";

export function SearchAndSort() {
  return (
    <div className="flex flex-col w-full md:flex-row gap-5">
      <SearchBox />
      <UserSortOrder />
      <UserSortBy />
    </div>
  );
}
