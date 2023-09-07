import { AttestationCard } from "../../components/AttestationCard";
import { AttestationCardAlt } from "../../components/AttestationCardAlt";
import { CopyButton } from "../../components/CopyButton";
import { UserAttestationsAndPraiseUser } from "../../eas/types/user-attestations-and-praise-user.type";
import { UserIcon } from "../components/UserIcon";
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
      <div className="flex justify-between w-full items-center rounded-xl shadow-theme-shadow-1 bg-white p-5">
        <div className="flex gap-10 items-center">
          <UserIcon address={address} variant="square" size="large" />
          <div className="flex flex-col items-start whitespace-nowrap gap-2">
            {praiseUser?.username && (
              <div className="font-semibold text-xl">{praiseUser.username}</div>
            )}
            <div className="flex gap-1 items-center">
              <a
                href={`https://optimism.easscan.org/address/${address}`}
                target="_blank"
              >
                {shortenEthAddress(address)}
              </a>
              <CopyButton textToCopy={address} />
            </div>
          </div>
        </div>
        <div className="bg-theme-gray-1 px-3 py-1 rounded-xl w-40 flex justify-between items-center">
          <span className="text-sm">Attestations</span>{" "}
          <span className="font-semibold text-xl">{attestations.length}</span>
        </div>
      </div>
      <div className="w-full border-b-4 border-theme-gray-1">
        <div className="text-2xl font-semibold">Attestations</div>
      </div>
      <ol className="w-full">
        {attestations.map((att) => (
          <li key={att.id} className="pb-5">
            <AttestationCardAlt attestation={att} />
          </li>
        ))}
      </ol>
    </div>
  );
}
