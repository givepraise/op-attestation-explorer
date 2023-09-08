import { ATTESTATIONS_PER_PAGE } from "../../constants";
import { Attestation } from "../../eas/types/attestation.type";
import { AttestationCard } from "../attestation/AttestationCard";
import { getAllAttestations } from "../../eas/getAllAttestations";

type AttestationListProps = {
  page: number;
};
export default async function AttestationList({ page }: AttestationListProps) {
  let attestations: Attestation[] = [];
  try {
    attestations = await getAllAttestations();
  } catch (e) {
    console.error(e);
    return <div>No attestations found</div>;
  }

  const startIndex = (page - 1) * ATTESTATIONS_PER_PAGE;
  const endIndex = startIndex + ATTESTATIONS_PER_PAGE;
  const paginatedAttestaions = attestations.slice(startIndex, endIndex);

  return (
    <ol className="w-full">
      {paginatedAttestaions.map((att) => (
        <li key={att.id} className="pb-5">
          <AttestationCard attestation={att} />
        </li>
      ))}
    </ol>
  );
}
