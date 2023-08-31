import Link from "next/link";
import { UserIcon } from "./UserIcon";
import { UserWithAttestations } from "../eas/types/user-with-attestations";
import { shortenEthAddress } from "../util/string";

type UserCardProps = {
  user: UserWithAttestations;
};

export async function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/user/${user.address}`}>
      <div className="border flex flex-col items-center p-5 gap-5 hover:bg-white hover:bg-opacity-10">
        <UserIcon address={user.address} />
        <div className="flex flex-col items-center whitespace-nowrap">
          <div>Number of attestations: {user.attestations.length}</div>
          <div>
            {user.praiseUser?.username || shortenEthAddress(user.address)}
          </div>
        </div>
      </div>
    </Link>
  );
}
