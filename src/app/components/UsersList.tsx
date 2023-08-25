"use client";

import {
  SchemaResponseAttestation,
  SchemaResponseData,
} from "../eas/types/schema-response-data.type";
import { Suspense, useEffect } from "react";

import { Attestation } from "@ethereum-attestation-service/eas-sdk";
import { AttestationCard } from "./AttestationCard";
import { AttestationsResponseData } from "../eas/types/attestations-response-data.type";
import { PRAISE_SCHEMA_UID } from "../eas/eas.constants";
import { UserCard } from "./UserCard";
import { UserWithAttestations } from "../eas/types/user-with-attestations";
import { gql } from "@apollo/client";
import { type } from "os";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const listQuery = gql`
  query Schema($where: SchemaWhereUniqueInput!) {
    schema(where: $where) {
      id
      attestations {
        recipient
        id
        time
      }
    }
  }
`;

function getUniqueUsers(data: SchemaResponseData) {
  // Unique users and the number of attestations they have received
  const uniqueUsers: UserWithAttestations[] = [];

  // Loop through all attestations
  for (const attestation of data.schema.attestations) {
    // Check if the user is already in the list
    const existingUser = uniqueUsers.find(
      (u) => u.address === attestation.recipient
    );
    if (existingUser) {
      // If they are, add the attestation to their attestations array
      existingUser.attestations.push(attestation);
    } else {
      // If they are not, create a new user object and add it to the list
      uniqueUsers.push({
        address: attestation.recipient,
        attestations: [attestation],
      });
    }
  }
  return uniqueUsers;
}

export function UsersListInner() {
  const result = useSuspenseQuery<SchemaResponseData>(listQuery, {
    fetchPolicy: "cache-first",
    variables: {
      where: {
        id: PRAISE_SCHEMA_UID,
      },
    },
  });

  console.log(result);

  if (!result.data || !result.data.schema) {
    return <div>No attestations found</div>;
  }

  const uniqueUsers = getUniqueUsers(result.data);

  console.log(uniqueUsers);

  if (!uniqueUsers || uniqueUsers.length === 0) {
    return <div>No attestations found</div>;
  }
  return (
    <div className="w-full grid grid-cols-4 gap-5">
      {uniqueUsers.map((user) => (
        <UserCard user={user} key={user.address} />
      ))}
    </div>
  );
}

export default function UsersList() {
  return (
    <Suspense fallback={"Loading..."}>
      <UsersListInner />
    </Suspense>
  );
}
