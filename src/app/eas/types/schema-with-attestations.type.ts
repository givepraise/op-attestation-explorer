import { Attestation } from "./attestation.type";

export type SchemaWithAttestations = {
  schema: {
    attestations: Attestation[];
  };
};
