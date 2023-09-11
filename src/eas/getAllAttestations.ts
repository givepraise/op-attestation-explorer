import { AllAttestationsResult } from "./types/gql/all-attestations-result.type";
import { Attestation } from "./types/gql/attestation.type";
import { CORE_ATTESTATION_FIELDS } from "./types/fragments/core-attestation-fields.fragment";
import { WHERE_ALL_SCHEMAS } from "../config";
import { getClient } from "../apollo/getClient";
import { gql } from "@apollo/client";

const query = gql`
  ${CORE_ATTESTATION_FIELDS}
  query Attestations($where: AttestationWhereInput, $take: Int, $skip: Int) {
    attestations(
      orderBy: { time: desc }
      where: $where
      take: $take
      skip: $skip
    ) {
      ...CoreAttestationFields
    }
  }
`;

export async function getAllAttestations(
  take: number,
  skip: number
): Promise<Attestation[]> {
  const result = await getClient().query<AllAttestationsResult>({
    query,
    fetchPolicy: "cache-first",
    variables: { where: WHERE_ALL_SCHEMAS, take, skip },
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Failed to fetch attestations.");
  }

  return result.data.attestations;
}
