import { Attestation } from "../../eas/types/attestation.type";
import { EAS_SCHEMAS } from "../../../constants";

type SchemaNameProps = {
  attestation: Attestation;
};

export function SchemaName({ attestation }: SchemaNameProps) {
  const schema = EAS_SCHEMAS.find(
    (schema) => schema.uid === attestation.schemaId
  );

  return <div className="border p-3">{schema?.name}</div>;
}
