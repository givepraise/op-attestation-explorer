import { AllAttestationsResult } from "./types/gql/all-attestations-result.type";
import { Attestation } from "./types/gql/attestation.type";
import { WHERE_ALL_ATTESTATIONS } from "../constants";
import { getClient } from "../apollo/getClient";
import { gql } from "@apollo/client";

const query = gql`
  query Attestations($where: AttestationWhereInput) {
    attestations(orderBy: { time: desc }, where: $where) {
      id
      time
      attester
      recipient
      decodedDataJson
      schemaId
    }
  }
`;

export async function getAllRecipientAttestations(
  address: string
): Promise<Attestation[]> {
  const where = {
    ...WHERE_ALL_ATTESTATIONS,
    AND: [
      {
        recipient: {
          equals: address,
        },
      },
    ],
  };

  const result = await getClient().query<AllAttestationsResult>({
    query,
    fetchPolicy: "cache-first",
    variables: { where },
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Failed to fetch recipient attestations.");
  }

  return result.data.attestations;
}
