import { AttestationsResponseAttestation } from "../../eas/types/attestations-response-data.type";

type SchemaNameProps = {
  attestation: AttestationsResponseAttestation;
};

export function SchemaName({ attestation }: SchemaNameProps) {
  const name = attestation.schema.schemaNames[0]?.name || "No schema name";

  return <div className="border p-3">{name}</div>;
}
