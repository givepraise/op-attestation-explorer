import { Attestation } from "./attestation.type";
import { AttestationsResponseSchema } from "./attestations-response-schema.type";

// export interface SchemaResponseAttestation {
//   id: string;
//   attester: string;
//   recipient: string;
//   data: string;
//   time: bigint;
//   schema: AttestationsResponseSchema;
// }

export type SchemaResponseData = {
  schema: {
    attestations: Attestation[];
  };
};
