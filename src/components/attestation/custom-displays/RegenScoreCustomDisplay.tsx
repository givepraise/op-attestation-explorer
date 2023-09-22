import { Attestation } from "../../../eas/types/gql/attestation.type";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { getDecodedValue } from "../../../eas/getDecodedValue";
import { type } from "os";

type scoreItem = {
  source: string;
  behavior: string;
  scoreAdded: number;
};

type CustomDisplayProps = {
  attestation: Attestation;
};

export function RegenScoreCustomDisplay({ attestation }: CustomDisplayProps) {
  const json: DecodedData = JSON.parse(attestation.decodedDataJson);

  const score = getDecodedValue<bigint>(json, "score");
  let meta = getDecodedValue<string>(json, "meta");

  let metaParsed;

  try {
    metaParsed = meta && JSON.parse(meta);
    metaParsed = metaParsed && JSON.parse(metaParsed);
  } catch (e) {
    console.error(e);
    return (
      <div className="text-red-500">Couldn&apos;t parse attestation data.</div>
    );
  }

  const badges: scoreItem[] = [];
  for (let key in metaParsed) {
    if (
      "scoreAdded" in metaParsed[key] &&
      typeof metaParsed[key].scoreAdded === "number" &&
      metaParsed[key].scoreAdded > 0
    ) {
      badges.push(metaParsed[key]);
    }
  }

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col w-full gap-10 sm:flex-row">
        <div className="flex flex-col items-center w-48 p-4 border rounded-lg">
          <div className="text-4xl font-semibold">
            {typeof score === "bigint" && score.toString()}
          </div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>
      <div className="flex w-full gap-5">
        {badges.map((badge, index) => {
          return (
            <div
              className="flex flex-col items-center w-48 p-4 text-center border rounded-lg gap-1"
              key={index}
            >
              <div className="text-2xl font-semibold">{badge.scoreAdded}</div>
              <div className="">{badge.source}</div>
              <div className="text-xs text-gray-500">{badge.behavior}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
