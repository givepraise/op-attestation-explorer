import { CopyButton } from "../../../components/CopyButton";
import { CustomDisplay } from "../../../components/attestation/CustomDisplay";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import Link from "next/link";
import { MainNav } from "../../../components/MainNav";
import { RawData } from "../../../components/attestation/RawData";
import { SchemaName } from "../../../components/attestation-card/SchemaName";
import { SearchAndSort } from "../../../components/attestations/SearchAndSort";
import { SubNav } from "../../../components/SubNav";
import { UserIcon } from "../../../components/user/UserIcon";
import dayjs from "dayjs";
import { getAttestation } from "../../../eas/getAttestation";
import { getEnsName } from "../../../viem/getEnsName";
import { getSchemaData } from "../../../eas/getSchemaData";
import { getUserName } from "../../../eas/getUserName";
import relativeTime from "dayjs/plugin/relativeTime";
import { shortenEthAddress } from "../../../util/string";

export default async function AttestationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  dayjs.extend(relativeTime);

  const attestation = await getAttestation(id);

  const json: DecodedData = JSON.parse(attestation.decodedDataJson);
  const schemaData = getSchemaData(attestation.schemaId);

  const recipientName = await getUserName(attestation.recipient);
  const attesterName = await getUserName(attestation.attester);
  return (
    <>
      <SearchAndSort />
      <div className="w-full mb-5 border-b-4 border-theme-gray-1">
        <div className="text-2xl font-semibold">Attestation</div>
      </div>

      <div className="flex-col w-full p-5 bg-white rounded-xl shadow-theme-shadow-1 space-y-5">
        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            <SchemaName attestation={attestation} />
          </div>
        </div>

        <div className="flex flex-col w-full md:flex-row md:justify-between gap-5">
          <div className="flex justify-between">
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <div className="w-12 text-sm text-gray-500">To </div>
                <Link href={`/user/${attestation.recipient}`}>
                  {recipientName || shortenEthAddress(attestation.recipient)}
                </Link>
                <CopyButton textToCopy={attestation.recipient} />
              </div>
              <div className="flex items-center">
                <div className="w-12 text-sm text-gray-500">From</div>
                <Link href={`/user/${attestation.attester}`}>
                  {attesterName || shortenEthAddress(attestation.attester)}
                </Link>
                <CopyButton textToCopy={attestation.attester} />
              </div>
              <div className="flex items-center">
                <div className="w-12 text-sm text-gray-500">Uid</div>
                <a
                  href={`https://optimism.easscan.org/attestation/view/${attestation.id}`}
                  target="_blank"
                >
                  {shortenEthAddress(attestation.id)}
                </a>
                <CopyButton textToCopy={attestation.id} />
              </div>
            </div>
            <div className="md:hidden">
              <UserIcon
                address={attestation.recipient}
                variant="square"
                size="large"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm text-gray-500">Created</div>
            <div>
              {dayjs.unix(parseInt(attestation.time.toString())).fromNow()}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm text-gray-500">Expires</div>
            <div>
              {attestation.expirationTime > 0
                ? attestation.expirationTime.toString()
                : "Does not expire"}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm text-gray-500">Revoked</div>
            <div>{attestation.revoked ? "Yes" : "No"} </div>
          </div>
          <div className="hidden md:block">
            <UserIcon
              address={attestation.recipient}
              variant="square"
              size="large"
            />
          </div>
        </div>
        {schemaData?.description && (
          <>
            <div className="w-full">
              <div className="text-xl font-semibold">Description</div>
            </div>

            <div>{schemaData.description}</div>
            <div className="w-full text-left">
              Project link:{" "}
              <a
                href={schemaData.projectUrl}
                target="_blank"
                className="underline"
              >
                {schemaData.name}
              </a>
            </div>
          </>
        )}
      </div>

      <CustomDisplay attestation={attestation} />

      <RawData data={json} />
    </>
  );
}
