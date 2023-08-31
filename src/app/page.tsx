import { AttestationCard } from "./components/AttestationCard";
import { AttestationsResponseData } from "./eas/types/attestations-response-data.type";
import { PRAISE_SCHEMA_UID } from "../constants";
import { SearchAndSort } from "./components/SearchAndSort";
import { SearchBox } from "./components/SearchBox";
import { SubNav } from "./components/SubNav";
import { getClient } from "./apollo/getClient";
import { gql } from "@apollo/client";

const query = gql`
query Attestations {
  attestations(take: 25, orderBy: {time: desc}, where: {
    schema: {
      is: {
        id: {
          equals: "${PRAISE_SCHEMA_UID}"
        }
      }
    }
  }) {
    id
    time
    attester
    recipient
    decodedDataJson
    schema {
      schemaNames(take: 1) { 
        name
      }
    }
  }
}
`;

async function AttestationList() {
  const result = await getClient().query<AttestationsResponseData>({ query });

  if (
    !result.data ||
    !result.data.attestations ||
    result.data.attestations.length === 0
  ) {
    return <div>No attestations found</div>;
  }
  return (
    <ol className="w-full">
      {result.data.attestations.map((att) => (
        <li key={att.id} className="pb-5">
          <AttestationCard attestation={att} />
        </li>
      ))}
    </ol>
  );
}

export default function AttestationListPage() {
  return (
    <>
      <SubNav />
      <SearchAndSort />
      <AttestationList />
    </>
  );
}
