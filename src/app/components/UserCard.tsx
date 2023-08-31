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
      <div className="border flex flex-col items-center p-5 gap-5 hover:bg-white hover:bg-opacity-10">
        <UserIcon address={user.address} />
        <div className="flex flex-col items-center whitespace-nowrap">
          {user.praiseUser?.username && <div>{user.praiseUser.username}</div>}
          <div>{shortenEthAddress(user.address)}</div>
          <div>Number of attestations: {user.attestations.length}</div>
        </div>
      </div>
    </Link>
  );
}
