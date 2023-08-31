import { GetUsersSortBy, GetUsersSortOrder } from "./types/get-users-sort.type";

import { PRAISE_SCHEMA_UID } from "../../constants";
import { SchemaResponseData } from "./types/schema-response-data.type";
import { UserWithAttestations } from "./types/user-with-attestations";
import { getClient } from "../apollo/getClient";
import { getPraiseUser } from "../praise/getPraiseUser";
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

export async function getUsers(
  sort: GetUsersSortBy = "attestations",
  order: GetUsersSortOrder = "desc"
) {
  const result = await getClient().query<SchemaResponseData>({
    query,
    fetchPolicy: "cache-first",
    variables: {
      where: {
        id: PRAISE_SCHEMA_UID,
      },
    },
  });

  if (!result.data || !result.data.schema) {
    throw new Error("No attestations found");
  }

  // Unique users and the number of attestations they have received
  const users: UserWithAttestations[] = [];

  // Loop through all attestations
  for (const attestation of result.data.schema.attestations) {
    // Check if the user is already in the list
    const existingUser = users.find((u) => u.address === attestation.recipient);
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

  // Add praise user data to each user
  for (const user of users) {
    const praiseUser = await getPraiseUser(user.address);
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
