import { Attestation } from "./attestation.type";

export type UserWithAttestations = {
  address: string;
  attestations: Attestation[];
};
