import { Attestation } from "../../eas/types/attestation.type";
import { EAS_SCHEMAS } from "../../constants";
import { getSchemaData } from "../../eas/getSchemaData";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function CustomDisplay({ attestation }: CustomDisplayProps) {
  const schemaData = getSchemaData(attestation.schemaId);

  if (schemaData?.displayComponent) {
    return (
      <>
        <div className="w-full border-b-4 border-theme-gray-1 mb-5">
          <div className="text-2xl font-semibold">Details</div>
        </div>
        {schemaData.displayComponent({ attestation })}
      </>
    );
  }

  return null;
}
