"use client";

import { AttestationCard } from "../../components/AttestationCard";
import { PRAISE_SCHEMA_UID } from "../../eas/eas.constants";
import { SchemaResponseData } from "../../eas/types/schema-response-data.type";
import { Suspense } from "react";
import { UserIcon } from "../../components/UserIcon";
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

export function UserPageInner({ address }: { address: string }) {
  const result = useSuspenseQuery<SchemaResponseData>(query, {
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
      {shortenEthAddress(address)}
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-5xl items-center justify-between font-mono text-sm gap-5">
        Optimism Attestation Explorer
        <Suspense fallback={"Loading..."}>
          <UserPageInner address={params.address} />
        </Suspense>
      </div>
    </main>
  );
}
