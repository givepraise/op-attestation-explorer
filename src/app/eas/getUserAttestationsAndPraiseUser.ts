import { EAS_SCHEMAS } from "../../constants";
import { PraiseUser } from "../praise/types/user";
import { SchemaWithAttestations } from "./types/schema-with-attestations.type";
import { UserAttestationsAndPraiseUser } from "./types/user-attestations-and-praise-user.type";
import { getClient } from "../apollo/getClient";
import { getPraiseUserByAddress } from "../praise/getPraiseUserByAddress";
import { getPraiseUserByUsername } from "../praise/getPraiseUserByUsername";
import { gql } from "@apollo/client";

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
        schemaId
      }
    }
  }
`;

function getUserAttestations(schemaUid: string, address: string) {
  return getClient().query<SchemaWithAttestations>({
    query,
    fetchPolicy: "cache-first",
    variables: {
      where: {
        id: schemaUid,
      },
      attestationsWhere: {
        recipient: {
          equals: address,
        },
      },
    },
  });
}

export async function getUserAttestationsAndPraiseUser(
  ref: string
): Promise<UserAttestationsAndPraiseUser> {
  let praiseUser: PraiseUser | undefined;
  let address: string;

  // Ref can be either an address or a username
  if (ref.startsWith("0x")) {
    praiseUser = await getPraiseUserByAddress(ref);
    address = ref;
  } else {
    praiseUser = await getPraiseUserByUsername(ref);
    if (!praiseUser?.identityEthAddress) {
      throw new Error("User has no identityEthAddress");
    }
    address = praiseUser.identityEthAddress;
  }

  const getAllUserAttestations = EAS_SCHEMAS.map((schema) =>
    getUserAttestations(schema.uid, address)
  );
  const results = await Promise.all(getAllUserAttestations);

  // Join all attestations into one array
  const attestations = results.flatMap(
    (result) => result.data.schema.attestations
  );

  attestations.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  return {
    address,
    attestations,
    praiseUser,
  };
}
