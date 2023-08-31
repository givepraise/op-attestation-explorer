import { PRAISE_SCHEMA_UID } from "../../constants";
import { SchemaResponseData } from "../eas/types/schema-response-data.type";
import { SearchBox } from "../components/SearchBox";
import { SubNav } from "../components/SubNav";
import { UserCard } from "../components/UserCard";
import { UserWithAttestations } from "../eas/types/user-with-attestations";
import { getClient } from "../apollo/getClient";
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

async function UsersList() {
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
    return <div>No attestations found</div>;
  }

  const uniqueUsers = getUniqueUsers(result.data);

  if (!uniqueUsers || uniqueUsers.length === 0) {
    return <div>No attestations found</div>;
  }
  return (
    <div className="w-full grid grid-cols-3 gap-5">
      {uniqueUsers.map((user) => (
        <UserCard user={user} key={user.address} />
      ))}
    </div>
  );
}

export default function UsersPage() {
  return (
    <>
      <SubNav />
      <SearchBox />
      <UsersList />
    </>
  );
}
