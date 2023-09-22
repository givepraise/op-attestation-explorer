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
    <div className="w-32 px-2 py-1 text-xs text-center border rounded-md bg-theme-gray-1">
      {schema?.name}
    </div>
  );
}
