import { AttestationsResponseData } from "./types/attestations-response-data.type";
import { EAS_SCHEMAS } from "../../constants";
import { getClient } from "../apollo/getClient";
import { gql } from "@apollo/client";

const query = gql`
query Attestations {
  attestations(orderBy: {time: desc}, where: {
    schema: {
      is: {
        id: {
          in: [${EAS_SCHEMAS.map((schema) => `"${schema.uid}"`).join(",")}]
        }
      }
    }
  }) {
    id
    time
    attester
    recipient
    decodedDataJson
    schemaId
  }
}
`;

export async function getAllAttestations() {
  const result = await getClient().query<AttestationsResponseData>({ query });
  if (
    !result.data ||
    !result.data.attestations ||
    result.data.attestations.length === 0
  ) {
    throw new Error("No attestations found");
  }
  return result.data.attestations;
}
