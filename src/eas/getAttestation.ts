import { Attestation } from "./types/gql/attestation.type";
import { AttestationResult } from "./types/gql/attestation-result.type";
import { CORE_ATTESTATION_FIELDS } from "./types/fragments/core-attestation-fields.fragment";
import {chains, DEFAULT_REVALIDATE_TIME} from "../config";
import React from "react";
import { getClient } from "../apollo/getClient";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

const query = gql`
  ${CORE_ATTESTATION_FIELDS}
  query Attestation($where: AttestationWhereUniqueInput!) {
    attestation(where: $where) {
      ...CoreAttestationFields
    }
  }
`;

export const getAttestation = unstable_cache(
  async (id: string, chain: chains): Promise<Attestation> => {
    const result = await getClient(chain).query<AttestationResult>({
      query,
      fetchPolicy: "cache-first",
      variables: { where: { id } },
    });

    if (result.error) {
      console.error(result.error);
      throw new Error("Failed to fetch attestation.");
    }

    return result.data.attestation;
  },
  ["getAttestation"],
  { revalidate: DEFAULT_REVALIDATE_TIME }
);
