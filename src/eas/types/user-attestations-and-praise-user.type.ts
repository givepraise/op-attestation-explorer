import { Attestation } from "./attestation.type";
import { PraiseUser } from "../../praise/types/user";

export type UserAttestationsAndPraiseUser = {
  address: string;
  attestations: Attestation[];
  praiseUser?: PraiseUser;
};
