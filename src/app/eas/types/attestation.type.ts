import { AttestationsResponseSchema } from "./attestations-response-schema.type";

export interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  expirationTime: bigint;
  revoked: boolean;
  decodedDataJson: string;
  time: bigint;
  schema: AttestationsResponseSchema;
}
