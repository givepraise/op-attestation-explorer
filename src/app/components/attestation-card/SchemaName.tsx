import { Attestation } from "../../eas/types/attestation.type";

type SchemaNameProps = {
  attestation: Attestation;
};

export function SchemaName({ attestation }: SchemaNameProps) {
  const name = attestation.schema.schemaNames[0]?.name || "Praise";

  return <div className="border p-3">{name}</div>;
}
