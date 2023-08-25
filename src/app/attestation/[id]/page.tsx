import { AttestationResponseData } from "../../eas/types/attestation-response-data.type";
import { SchemaName } from "../../components/attestation-card/SchemaName";
import { Suspense } from "react";
import { UserIcon } from "../../components/UserIcon";
import dayjs from "dayjs";
import { getClient } from "../../apollo/getClient";
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
      schema {
        schemaNames(take: 1) {
          name
        }
      }
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

  const attestation = result.data.attestation;
  const json = JSON.parse(attestation.decodedDataJson);

  return (
    <div className="w-full flex flex-col items-center gap-5 overflow-">
      <UserIcon address={attestation.recipient} />
      <div>
        UID:{" "}
        <a
          href={`https://optimism.easscan.org/attestation/view/${attestation.id}`}
          target="_blank"
        >
          {shortenEthAddress(attestation.id)}
        </a>
      </div>
      <div>
        From:{" "}
        <a
          href={`https://optimism.easscan.org/address/${attestation.attester}`}
        >
          {shortenEthAddress(attestation.attester)}
        </a>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <div>
            Created:{" "}
            {dayjs.unix(parseInt(attestation.time.toString())).fromNow()}
          </div>
          <div>
            Expires:{" "}
            {attestation.expirationTime > 0
              ? attestation.expirationTime.toString()
              : "Does not expire"}
          </div>
          <div>Revoked: {attestation.revoked ? "Yes" : "No"}</div>
        </div>

        <div className="flex flex-col">
          <SchemaName attestation={attestation} />
        </div>
      </div>

      <div className="grid grid-cols-3 w-full">
        <div>Name</div>
        <div>Type</div>
        <div>Value</div>
        {json.map((item: SchemaType) => (
          <>
            <div>{item.value.name}</div>
            <div>{item.value.type}</div>
            <div>{item.value.value.toString()}</div>
          </>
        ))}
      </div>
    </div>
  );
}
