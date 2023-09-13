import { Attestation } from "../../../eas/types/gql/attestation.type";
import { AttestationCardAlt } from "../../../components/attestation/AttestationCardAlt";
import { CopyButton } from "../../../components/CopyButton";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { UID_OPTIMIST } from "../../../config";
import { UserIcon } from "../../../components/user/UserIcon";
import { add } from "lodash";
import { getAllPraiseUsers } from "../../../praise/getAllPraiseUsers";
import { getAllRecipientAttestations } from "../../../eas/getAllRecipientAttestations";
import { getDecodedValue } from "../../../eas/getDecodedValue";
import { getEnsName } from "../../../viem/getEnsName";
import { getOptimistAttestation } from "../../../eas/optimist/getOptimistAttestation";
import { getPraiseUserByAddress } from "../../../praise/getPraiseUserByAddress";
import { getUserName } from "../../../eas/getUserName";
import { shortenEthAddress } from "../../../util/string";

export default async function UserPage({
  params,
}: {
  params: { ref: string };
}) {
  // Ref is user address or username
  const { ref } = params;

  let address = ref;
  if (!address) {
    return <div>User not found</div>;
  }

  const attestations = await getAllRecipientAttestations(address);
  const username = getUserName(address);

  const optimistAttestation = getOptimistAttestation(attestations);
  let optimistName;
  if (optimistAttestation) {
    const json: DecodedData = JSON.parse(optimistAttestation.decodedDataJson);
    optimistName = getDecodedValue<string>(json, "name");
  }

  const praiseUsers = await getAllPraiseUsers();
  const praiseUser = getPraiseUserByAddress(praiseUsers, address);
  const praiseUsername = praiseUser?.username;

  return (
    <div className="flex flex-col items-center w-full gap-5">
      <div className="flex flex-col items-center justify-between w-full gap-5 p-5 bg-dots sm:flex-row rounded-xl shadow-theme-shadow-1">
        <div className="flex items-center gap-10">
          <UserIcon address={address} variant="square" size="large" />
          <div className="flex flex-col items-start gap-1 whitespace-nowrap">
            {username && (
              <div className="text-xl font-semibold">{username}</div>
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
          <div className="flex flex-col items-start gap-1">
            {optimistName && (
              <>
                <div className="text-xs text-gray-500 uppercase">
                  Optimist Profile Name{" "}
                </div>
                {optimistName}
              </>
            )}
            {praiseUsername && (
              <>
                <div className="text-xs text-gray-500 uppercase">
                  Praise Username
                </div>
                {praiseUsername}
              </>
            )}
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
