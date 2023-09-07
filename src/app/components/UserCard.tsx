import Link from "next/link";
import { UserAttestationsAndPraiseUser } from "../eas/types/user-attestations-and-praise-user.type";
import { UserIcon } from "./UserIcon";
import { shortenEthAddress } from "../util/string";

type UserCardProps = {
  user: UserAttestationsAndPraiseUser;
};

export async function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/user/${user.address}`}>
      <div className="flex justify-center items-center h-36 p-5 gap-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1 bg-white">
        <UserIcon address={user.address} size="large" variant="square" />
        <div className="flex flex-col gap-2">
          {user.praiseUser?.username && (
            <div className="font-semibold text-xl">
              {user.praiseUser.username}
            </div>
          )}
          <div>{shortenEthAddress(user.address)}</div>
          <div className="bg-theme-gray-1 px-3 py-1 rounded-xl w-40 flex justify-between items-center">
            <span className="text-sm">Attestations</span>{" "}
            <span className="font-semibold text-xl">
              {user.attestations.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
