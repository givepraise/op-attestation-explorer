"use client";

import { AttestationCard } from "./AttestationCard";
import { AttestationsResponseData } from "../eas/types/attestations-response-data.type";
import { PRAISE_SCHEMA_UID } from "../eas/eas.constants";
import { Suspense } from "react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const listQuery = gql`
query Attestations {
  attestations(take: 25, orderBy: {time: desc}, where: {
    schema: {
      is: {
        id: {
          equals: "${PRAISE_SCHEMA_UID}"
        }
      }
    }
  }) {
    id
    time
    attester
    recipient
    decodedDataJson
    schema {
      schemaNames(take: 1) { 
        name
      }
    }
  }
}
`;

export function AttestationListInner() {
  const result = useSuspenseQuery<AttestationsResponseData>(listQuery, {
    fetchPolicy: "cache-first",
  });

  if (
    !result.data ||
    !result.data.attestations ||
    result.data.attestations.length === 0
  ) {
    return <div>No attestations found</div>;
  }
  return (
    <ol className="w-full">
      {result.data.attestations.map((att) => (
        <li key={att.id} className="pb-5">
          <AttestationCard attestation={att} />
        </li>
      ))}
    </ol>
  );
}

export default function AttestationList() {
  return (
    <Suspense fallback={"Loading..."}>
      <AttestationListInner />
    </Suspense>
  );
}
