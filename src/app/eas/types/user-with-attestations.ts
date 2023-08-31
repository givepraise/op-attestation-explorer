import { Attestation } from "./attestation.type";
import { PraiseUser } from "../../praise/types/user";

export type UserWithAttestations = {
  address: string;
  attestations: Attestation[];
  praiseUser?: PraiseUser;
};
