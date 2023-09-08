import { EAS_SCHEMAS } from "../constants";

export function getSchemaData(schemaUid: string) {
  return EAS_SCHEMAS.find((schema) => schema.uid === schemaUid);
}
