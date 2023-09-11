import { AttestationCard } from "../attestation/AttestationCard";
import { getAllAttestations } from "../../eas/getAllAttestations";

export async function AttestationsLandingPageList() {
  const attestations = await getAllAttestations(6, 0);

  return (
    <ol className="w-full @container">
      {attestations.map((att) => (
        <li key={att.id} className="pb-5">
          <AttestationCard attestation={att} />
        </li>
      ))}
    </ol>
  );
}
