import { AttestationCardAlt } from "../../../components/attestation/AttestationCardAlt";
import { CopyButton } from "../../../components/CopyButton";
import { PraiseUser } from "../../../praise/types/user";
import { UserIcon } from "../../../components/user/UserIcon";
import { getAllPraiseUsers } from "../../../praise/getAllPraiseUsers";
import { getAllRecipientAttestations } from "../../../eas/getAllRecipientAttestations";
import { getPraiseUserByAddress } from "../../../praise/getPraiseUserByAddress";
import { getPraiseUserByUsername } from "../../../praise/getPraiseUserByUsername";
import { shortenEthAddress } from "../../../util/string";

export default async function UserPage({
  params,
}: {
  params: { ref: string };
}) {
  // Ref is user address or username
  const { ref } = params;

  const users = await getAllPraiseUsers();

  let address: string | undefined;
  let praiseUser: PraiseUser | undefined;
  if (ref.startsWith("0x")) {
    address = ref;
    praiseUser = getPraiseUserByAddress(users, ref);
  } else {
    praiseUser = getPraiseUserByUsername(users, ref);
    address = praiseUser?.identityEthAddress;
  }

  if (!address) {
    return <div>User not found</div>;
  }

  const attestations = await getAllRecipientAttestations(address);

  return (
    <div className="flex flex-col items-center w-full gap-5">
      <div className="flex flex-col items-center justify-between w-full gap-5 p-5 bg-white sm:flex-row rounded-xl shadow-theme-shadow-1">
        <div className="flex items-center gap-10">
          <UserIcon address={address} variant="square" size="large" />
          <div className="flex flex-col items-start gap-2 whitespace-nowrap">
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
      {attestations.length === 0 && <div>No attestations found</div>}

      {attestations.length > 0 && (
        <ol className="w-full">
          {attestations.map((att) => (
            <li key={att.id} className="pb-5">
              <AttestationCardAlt attestation={att} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
