import { AttestationResponseData } from "../../../eas/types/attestation-response-data.type";
import { CopyButton } from "../../../components/CopyButton";
import { CustomDisplay } from "../../../components/attestation/CustomDisplay";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import Link from "next/link";
import { RawData } from "../../../components/attestation/RawData";
import { SchemaName } from "../../../components/attestation-card/SchemaName";
import { UserIcon } from "../../../components/user/UserIcon";
import dayjs from "dayjs";
import { getClient } from "../../../apollo/getClient";
import { getPraiseUserByAddress } from "../../../praise/getPraiseUserByAddress";
import { getSchemaData } from "../../../eas/getSchemaData";
import { gql } from "@apollo/client";
import relativeTime from "dayjs/plugin/relativeTime";
import { shortenEthAddress } from "../../../util/string";

const query = gql`
  query Attestation($where: AttestationWhereUniqueInput!) {
    attestation(where: $where) {
      id
      time
      attester
      recipient
      decodedDataJson
      expirationTime
      revoked
      schemaId
    }
  }
`;

export default async function AttestationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  dayjs.extend(relativeTime);
  const result = await getClient().query<AttestationResponseData>({
    query,
    fetchPolicy: "cache-first",
    variables: { where: { id } },
  });

  const praiseUser = await getPraiseUserByAddress(
    result.data.attestation.recipient
  );

  const attestation = result.data.attestation;
  const json: DecodedData = JSON.parse(attestation.decodedDataJson);
  const schemaData = getSchemaData(attestation.schemaId);

  return (
    <>
      <div className="flex-col w-full p-5 bg-white rounded-xl shadow-theme-shadow-1 space-y-5">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">Attestation</div>
          <div className="flex flex-col justify-center">
            <SchemaName attestation={attestation} />
          </div>
        </div>

        <div className="flex flex-col w-full md:flex-row md:justify-between gap-5">
          <div className="flex justify-between">
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <div className="w-12 text-sm text-gray-500">To </div>
                {praiseUser?.username ? (
                  <Link
                    href={`/user/${praiseUser.username}`}
                    className="font-medium"
                  >
                    {praiseUser.username}
                  </Link>
                ) : (
                  <>
                    <a
                      href={`https://optimism.easscan.org/address/${attestation.recipient}`}
                    >
                      {shortenEthAddress(attestation.recipient)}
                    </a>
                    <CopyButton textToCopy={attestation.recipient} />
                  </>
                )}
              </div>
              <div className="flex items-center">
                <div className="w-12 text-sm text-gray-500">From</div>
                <a
                  href={`https://optimism.easscan.org/address/${attestation.attester}`}
                >
                  {shortenEthAddress(attestation.attester)}
                </a>
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
      </div>

      {schemaData?.description && (
        <>
          <div className="w-full border-b-4 border-theme-gray-1">
            <div className="text-2xl font-semibold">Description</div>
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

      <CustomDisplay attestation={attestation} />

      <RawData data={json} />
    </>
  );
}
