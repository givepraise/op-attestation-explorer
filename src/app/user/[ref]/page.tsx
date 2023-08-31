import { AttestationCard } from "../../components/AttestationCard";
import { UserAttestationsAndPraiseUser } from "../../eas/types/user-attestations-and-praise-user.type";
import { UserIcon } from "../../components/UserIcon";
import { getUserAttestationsAndPraiseUser } from "../../eas/getUserAttestationsAndPraiseUser";
import { shortenEthAddress } from "../../util/string";

export default async function UserPage({
  params,
}: {
  params: { ref: string };
}) {
  // Ref is user address or username
  const { ref } = params;

  let attestationsAndUser: UserAttestationsAndPraiseUser;
  try {
    attestationsAndUser = await getUserAttestationsAndPraiseUser(ref);
  } catch (e) {
    console.error(e);
    return <div>{(e as Error).message}</div>;
  }

  const { address, attestations, praiseUser } = attestationsAndUser;

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <UserIcon address={address} />
      <div className="flex flex-col items-center whitespace-nowrap">
        {praiseUser?.username && <div>{praiseUser.username}</div>}
        <a
          href={`https://optimism.easscan.org/address/${address}`}
          target="_blank"
        >
          {shortenEthAddress(address)}
        </a>
        <div>Number of attestations: {attestations.length}</div>
      </div>
      <ol className="w-full">
        {attestations.map((att) => (
          <li key={att.id} className="pb-5">
            <AttestationCard attestation={att} />
          </li>
        ))}
      </ol>
    </div>
  );
}
