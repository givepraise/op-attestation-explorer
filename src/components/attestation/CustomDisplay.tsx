import { Attestation } from "../../eas/types/gql/attestation.type";
import { getSchemaByUid } from "../../eas/getSchemaData";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function CustomDisplay({ attestation }: CustomDisplayProps) {
  const schemaData = getSchemaByUid(attestation.schemaId);

  if (schemaData?.displayComponent) {
    return (
      <>
        <div className="w-full border-b-4 border-theme-gray-1">
          <div className="text-2xl font-semibold">Attestation Details</div>
        </div>
        {schemaData.displayComponent({ attestation })}
      </>
    );
  }

  return null;
}
