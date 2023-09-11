import { AllAttestationsResult } from "./types/gql/all-attestations-result.type";
import { Attestation } from "./types/gql/attestation.type";
import { getClient } from "../apollo/getClient";
import { getSchemaData } from "./getSchemaData";
import { gql } from "@apollo/client";

const query = gql`
  query Attestations($where: AttestationWhereInput, $take: Int, $skip: Int) {
    attestations(
      orderBy: { time: desc }
      where: $where
      take: $take
      skip: $skip
    ) {
      id
      time
      attester
      recipient
      decodedDataJson
      schemaId
    }
  }
`;

export async function getAllSchemaAttestations(
  uid: string,
  take: number,
  skip: number
): Promise<Attestation[]> {
  const schema = getSchemaData(uid);

  const result = await getClient().query<AllAttestationsResult>({
    query,
    fetchPolicy: "cache-first",
    variables: { where: schema?.gqlWhere, take, skip },
  });

  if (result.error) {
    console.error(result.error);
    throw new Error("Failed to fetch schema attestations.");
  }

  return result.data.attestations;
}
