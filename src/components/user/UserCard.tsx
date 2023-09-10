import Link from "next/link";
import { RecipientWithPraiseUser } from "../../eas/types/gql/recipent-with-praise-user.type";
import { UserIcon } from "./UserIcon";
import { shortenEthAddress } from "../../util/string";

type UserCardProps = {
  user: RecipientWithPraiseUser;
};

export async function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/user/${user.address}`}>
      <div className="flex items-center justify-center p-5 bg-white h-36 gap-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1">
        <UserIcon address={user.address} size="large" variant="square" />
        <div className="flex flex-col gap-2">
          {user.praiseUser?.username && (
            <div className="text-xl font-semibold">
              {user.praiseUser.username}
            </div>
          )}
          <div>{shortenEthAddress(user.address)}</div>
          <div className="flex items-center justify-between w-40 px-3 py-1 bg-theme-gray-1 rounded-xl">
            <span className="text-sm">Attestations</span>{" "}
            <span className="text-xl font-semibold">{user.attestations}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
