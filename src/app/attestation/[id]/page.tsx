import { AttestationResponseData } from "../../eas/types/attestation-response-data.type";
import { CopyButton } from "../../components/CopyButton";
import { CustomDisplay } from "../../components/attestation/CustomDisplay";
import { DecodedData } from "../../eas/types/decoded-data.type";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { RawData } from "../../components/attestation/RawData";
import { SchemaName } from "../../components/attestation-card/SchemaName";
import { Suspense } from "react";
import { UserIcon } from "../../user/components/UserIcon";
import dayjs from "dayjs";
import { getClient } from "../../apollo/getClient";
import { getPraiseUserByAddress } from "../../praise/getPraiseUserByAddress";
import { getSchemaData } from "../../eas/getSchemaData";
import { gql } from "@apollo/client";
import relativeTime from "dayjs/plugin/relativeTime";
import { shortenEthAddress } from "../../util/string";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

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
      <div className="w-full flex-col rounded-xl shadow-theme-shadow-1 bg-white p-5 space-y-5">
        <div className="text-2xl font-semibold">Attestation</div>

        <div className="flex justify-between w-full">
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
          <div className="flex flex-col justify-center">
            <SchemaName attestation={attestation} />
          </div>
          <div>
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
