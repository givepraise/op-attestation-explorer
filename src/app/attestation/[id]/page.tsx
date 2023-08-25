"use client";

import { AttestationResponseData } from "../../eas/types/attestation-response-data.type";
import { Suspense } from "react";
import { UserIcon } from "../../components/UserIcon";
import { gql } from "@apollo/client";
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

export function AttestationPageInner({ id }: { id: string }) {
  const result = useSuspenseQuery<AttestationResponseData>(query, {
    fetchPolicy: "cache-first",
    variables: {
      where: {
        id,
      },
    },
  });

  const attestation = result.data.attestation;

  console.log(attestation);

  return (
    <div className="w-full flex flex-col items-center gap-5 overflow-">
      <UserIcon address={attestation.recipient} />
      <div>UID {shortenEthAddress(attestation.id)}</div>
      <div>From {shortenEthAddress(attestation.attester)}</div>
      <div>Time {attestation.time.toString()}</div>
      <div>Revoked {attestation.revoked ? "Yes" : "No"}</div>
      <div>
        Expiration{" "}
        {attestation.expirationTime > 0
          ? attestation.expirationTime.toString()
          : "Does not expire"}
      </div>
      <div>Data {attestation.decodedDataJson}</div>
    </div>
  );
}

export default function AttestationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-5xl items-center justify-between font-mono text-sm gap-5">
        Optimism Attestation Explorer
        <Suspense fallback={"Loading..."}>
          <AttestationPageInner id={params.id} />
        </Suspense>
      </div>
    </main>
  );
}
