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
    <div className="px-2 py-1 text-center border rounded-full bg-theme-gray-1 text-xs w-32">
      {schema?.name}
    </div>
  );
}
