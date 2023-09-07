import { Attestation } from "../../eas/types/attestation.type";
import { EAS_SCHEMAS } from "../../../constants";

type SchemaNameProps = {
  attestation: Attestation;
};

export function SchemaName({ attestation }: SchemaNameProps) {
  const schema = EAS_SCHEMAS.find(
    (schema) => schema.uid === attestation.schemaId
  );

  return (
    <div className="border px-3 py-2 rounded-full bg-theme-gray-1">
      {schema?.name}
    </div>
  );
}
