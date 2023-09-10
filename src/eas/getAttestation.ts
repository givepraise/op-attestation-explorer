import { Attestation } from "./types/gql/attestation.type";
import { AttestationResult } from "./types/gql/attestation-result.type";
import { getClient } from "../apollo/getClient";
import { gql } from "@apollo/client";

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
      schemaId
    }
  }
`;

export async function getAttestation(id: string): Promise<Attestation> {
  const result = await getClient().query<AttestationResult>({
    query,
    fetchPolicy: "cache-first",
    variables: { where: { id } },
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Failed to fetch attestation.");
  }

  return result.data.attestation;
}
