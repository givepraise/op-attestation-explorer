import { UserLoadingCard } from "./UserLoadingCard";

export function UsersLoadingList() {
  return (
    <div className="w-full grid grid-cols-3 gap-5">
      <UserLoadingCard />
      <UserLoadingCard />
      <UserLoadingCard />
      <UserLoadingCard />
      <UserLoadingCard />
      <UserLoadingCard />
    </div>
  );
}
