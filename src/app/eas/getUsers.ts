import { GetUsersSortBy, GetUsersSortOrder } from "./types/get-users-sort.type";

import { EAS_SCHEMAS } from "../../constants";
import { SchemaWithAttestations } from "./types/schema-with-attestations.type";
import { UserAttestationsAndPraiseUser } from "./types/user-attestations-and-praise-user.type";
import { getClient } from "../apollo/getClient";
import { getPraiseUserByAddress } from "../praise/getPraiseUserByAddress";
import { gql } from "@apollo/client";

const query = gql`
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

function getSchemaAttestations(schemaUid: string) {
  return getClient().query<SchemaWithAttestations>({
    query,
    fetchPolicy: "cache-first",
    variables: {
      where: {
        id: schemaUid,
      },
    },
  });
}

export async function getUsers(
  sort: GetUsersSortBy = "attestations",
  order: GetUsersSortOrder = "desc"
) {
  const getAllSchemaAttestations = EAS_SCHEMAS.map((schema) =>
    getSchemaAttestations(schema.uid)
  );
  const results = await Promise.all(getAllSchemaAttestations);

  // Unique users and the number of attestations they have received
  const users: UserAttestationsAndPraiseUser[] = [];

  // Loop through all attestations
  for (const result of results) {
    for (const attestation of result.data.schema.attestations) {
      // Check if the user is already in the list
      const existingUser = users.find(
        (u) => u.address === attestation.recipient
      );
      if (existingUser) {
        // If they are, add the attestation to their attestations array
        existingUser.attestations.push(attestation);
      } else {
        // If they are not, create a new user object and add it to the list
        users.push({
          address: attestation.recipient,
          attestations: [attestation],
        });
      }
    }
  }

  // Add praise user data to each user
  for (const user of users) {
    const praiseUser = await getPraiseUserByAddress(user.address);
    user.praiseUser = praiseUser;
  }

  // Sort the users by username or number of attestations
  users.sort((a, b) => {
    let comparison = 0;

    if (sort === "username") {
      if (!a.praiseUser || !b.praiseUser) {
        return 0;
      }
      comparison = a.praiseUser.username.localeCompare(b.praiseUser.username);
    } else {
      comparison = b.attestations.length - a.attestations.length;
    }

    // Reverse the comparison if the order is 'desc'
    if (order === "desc") {
      comparison *= -1;
    }

    return comparison;
  });

  return users;
}
