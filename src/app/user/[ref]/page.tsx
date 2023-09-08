import { CopyButton } from "../../../components/CopyButton";
import { UserAttestationsAndPraiseUser } from "../../../eas/types/user-attestations-and-praise-user.type";
import { UserIcon } from "../../../components/user/UserIcon";
import { getUserAttestationsAndPraiseUser } from "../../../eas/getUserAttestationsAndPraiseUser";
import { shortenEthAddress } from "../../../util/string";
import { AttestationCardAlt } from "../../../components/attestation/AttestationCardAlt";

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
    <div className="flex flex-col items-center w-full gap-5">
      <div className="flex flex-col items-center justify-between w-full p-5 bg-white sm:flex-row rounded-xl shadow-theme-shadow-1 gap-5">
        <div className="flex items-center gap-10">
          <UserIcon address={address} variant="square" size="large" />
          <div className="flex flex-col items-start whitespace-nowrap gap-2">
            {praiseUser?.username && (
              <div className="text-xl font-semibold">{praiseUser.username}</div>
            )}
            <div className="flex items-center gap-1">
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
        <div className="flex items-center justify-between w-40 px-3 py-1 bg-theme-gray-1 rounded-xl">
          <span className="text-sm">Attestations</span>{" "}
          <span className="text-xl font-semibold">{attestations.length}</span>
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
