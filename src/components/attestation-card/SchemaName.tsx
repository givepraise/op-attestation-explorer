import { Attestation } from "../../eas/types/gql/attestation.type";
import { EAS_SCHEMAS } from "../../config";

type SchemaNameProps = {
  attestation: Attestation;
};

export function SchemaName({ attestation }: SchemaNameProps) {
  const schema = EAS_SCHEMAS.find(
    (schema) => schema.uid === attestation.schemaId
  );

  return (
    <div className="px-3 py-2 border rounded-full bg-theme-gray-1">
      {schema?.name}
    </div>
  );
}
