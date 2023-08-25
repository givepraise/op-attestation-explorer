import { AttestationCard } from "../../components/AttestationCard";
import { PRAISE_SCHEMA_UID } from "../../../constants";
import { SchemaResponseData } from "../../eas/types/schema-response-data.type";
import { Suspense } from "react";
import { UserIcon } from "../../components/UserIcon";
import { getClient } from "../../apollo/getClient";
import { gql } from "@apollo/client";
import { shortenEthAddress } from "../../util/string";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query Schema(
    $where: SchemaWhereUniqueInput!
    $attestationsWhere: AttestationWhereInput
  ) {
    schema(where: $where) {
      id
      attestations(where: $attestationsWhere) {
        id
        time
        attester
        recipient
        data
        expirationTime
        revoked
        schema {
          schemaNames(take: 1) {
            name
          }
        }
      }
    }
  }
`;

async function UserPageInner({ address }: { address: string }) {
  const result = await getClient().query<SchemaResponseData>({
    query,
    fetchPolicy: "cache-first",
    variables: {
      where: {
        id: PRAISE_SCHEMA_UID,
      },
      attestationsWhere: {
        recipient: {
          equals: address,
        },
      },
    },
  });

  if (!result.data?.schema) {
    return <div>No user found.</div>;
  }

  const attestations = result.data.schema.attestations;

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <UserIcon address={address} />
      <a
        href={`https://optimism.easscan.org/address/${address}`}
        target="_blank"
      >
        {shortenEthAddress(address)}
      </a>

      <div>Number of attestations: {attestations.length}</div>
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

export default function AttestationPage({
  params,
}: {
  params: { address: string };
}) {
  return (
    <Suspense fallback={"Loading..."}>
      <UserPageInner address={params.address} />
    </Suspense>
  );
}
