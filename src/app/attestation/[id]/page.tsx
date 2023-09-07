import { AttestationResponseData } from "../../eas/types/attestation-response-data.type";
import Link from "next/link";
import { SchemaName } from "../../components/attestation-card/SchemaName";
import { Suspense } from "react";
import { UserIcon } from "../../user/components/UserIcon";
import dayjs from "dayjs";
import { getClient } from "../../apollo/getClient";
import { getPraiseUserByAddress } from "../../praise/getPraiseUserByAddress";
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

type Value = {
  name: string;
  value: string;
  type: string;
};

type SchemaType = {
  name: string;
  type: string;
  signature: string;
  value: Value;
};

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
  const json = JSON.parse(attestation.decodedDataJson);

  return (
    <>
      <div className="w-full flex-col rounded-xl shadow-theme-shadow-1 bg-white p-5 space-y-5">
        <div className="text-2xl font-semibold">Attestation</div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start">
            <div>
              To:{" "}
              {praiseUser?.username ? (
                <Link
                  href={`/user/${praiseUser.username}`}
                  className="font-medium"
                >
                  {praiseUser.username}
                </Link>
              ) : (
                <a
                  href={`https://optimism.easscan.org/address/${attestation.recipient}`}
                >
                  {shortenEthAddress(attestation.recipient)}
                </a>
              )}
            </div>
            <div>
              From:{" "}
              <a
                href={`https://optimism.easscan.org/address/${attestation.attester}`}
              >
                {shortenEthAddress(attestation.attester)}
              </a>
            </div>
            <div>
              UID:{" "}
              <a
                href={`https://optimism.easscan.org/attestation/view/${attestation.id}`}
                target="_blank"
              >
                {shortenEthAddress(attestation.id)}
              </a>
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
      <div className="w-full border-b-4 border-theme-gray-1">
        <div className="text-2xl font-semibold">Raw data</div>
      </div>

      <div className="grid  w-full grid-cols-5">
        <div>Name</div>
        <div>Type</div>
        <div className="col-span-3">Value</div>
        {json.map((item: SchemaType) => (
          <>
            <div>{item.value.name}</div>
            <div>{item.value.type}</div>
            <div className="col-span-3 text-ellipsis overflow-clip">
              {item.value.value.toString()}
            </div>
          </>
        ))}
      </div>
    </>
  );
}
