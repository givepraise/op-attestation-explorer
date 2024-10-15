import { EAS_SCHEMAS } from '../config';

export function getSchemaByUid(schemaUid: string) {
	return EAS_SCHEMAS.find(schema => schema.uid === schemaUid);
}

export function getSchemaBySlug(schemaSlug: string) {
	return EAS_SCHEMAS.find(schema => schema.slug === schemaSlug);
}
