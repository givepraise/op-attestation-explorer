import { SchemaResponseAttestation } from "./schema-response-data.type";

export type UserWithAttestations = {
  address: string;
  attestations: SchemaResponseAttestation[];
};
