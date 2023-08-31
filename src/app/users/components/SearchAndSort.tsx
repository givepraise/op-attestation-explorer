import { SearchBox } from "../../components/SearchBox";
import { UserSortBy } from "./UserSortBy";
import { UserSortOrder } from "./UserSortOrder";

export function SearchAndSort() {
  return (
    <div className="flex gap-5 w-full">
      <SearchBox />
      <UserSortOrder />
      <UserSortBy />
    </div>
  );
}
