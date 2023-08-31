import { PRAISE_SCHEMA_UID } from "../../constants";
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
        schema {
          schemaNames(take: 1) {
            name
          }
        }
      }
    }
  }
`;

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

  const result = await getClient().query<SchemaWithAttestations>({
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

  if (result.error) {
    throw result.error;
  }

  return {
    address,
    attestations: result.data.schema.attestations,
    praiseUser,
  };
}
