import { Attestation } from "@/eas/types/gql/attestation.type";
import {extractPassportScore} from "@/util/helpers";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function PassportCustomDisplay({ attestation }: CustomDisplayProps) {
  const formattedScore = extractPassportScore(attestation);
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col w-full gap-10 sm:flex-row">
        <div className="flex flex-col items-center w-48 p-4 border rounded-lg">
          <div className="text-4xl font-semibold">{formattedScore}</div>
          <div className="text-sm text-gray-500">Passport Score</div>
        </div>
      </div>
    </div>
  );
}
