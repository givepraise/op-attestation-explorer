import { Attestation } from "../../../eas/types/attestation.type";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { getDecodedValue } from "../../../eas/getDecodedValue";

type CustomDisplayProps = {
  attestation: Attestation;
};

export function PraiseCustomDisplay({ attestation }: CustomDisplayProps) {
  const json: DecodedData = JSON.parse(attestation.decodedDataJson);

  const receivedScore = getDecodedValue(json, "received_score");
  const givenScore = getDecodedValue(json, "given_score");
  const top10Receiver = getDecodedValue(json, "top_10_receiver");
  const top50Receiver = getDecodedValue(json, "top_50_receiver");
  const top100Receiver = getDecodedValue(json, "top_100_receiver");
  const top10Giver = getDecodedValue(json, "top_10_giver");
  const top50Giver = getDecodedValue(json, "top_50_giver");
  const top100Giver = getDecodedValue(json, "top_100_giver");
  const period = getDecodedValue(json, "period");

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col">
          <div className="text-2xl font-semibold">{receivedScore}</div>
          <div className="text-sm text-gray-500">Received Score</div>
        </div>

        {/* Top 10 receiver */}
        {typeof top10Receiver === "boolean" && top10Receiver && (
          <div className="flex border p-2 rounded-lg gap-1">
            <div>
              Top <strong>10</strong>
              <br />
              receiver
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
            </div>
          </div>
        )}

        {/* Top 50 receiver */}
        {typeof top50Receiver === "boolean" && top50Receiver && (
          <div className="flex border p-2 rounded-lg gap-1">
            <div>
              Top <strong>50</strong>
              <br />
              receiver
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
            </div>
          </div>
        )}

        {/* Top 100 receiver */}
        {typeof top100Receiver === "boolean" && top100Receiver && (
          <div className="flex border p-2 rounded-lg gap-1">
            <div>
              Top <strong>100</strong>
              <br />
              receiver
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col">
          <div className="text-2xl font-semibold">{givenScore}</div>
          <div className="text-sm text-gray-500">Given Score</div>
        </div>

        {/* Top 10 giver */}
        {typeof top10Giver === "boolean" && top10Giver && (
          <div className="flex border p-2 rounded-lg gap-1">
            <div>
              Top <strong>10</strong>
              <br />
              giver
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
            </div>
          </div>
        )}

        {/* Top 50 giver */}
        {typeof top50Giver === "boolean" && top50Giver && (
          <div className="flex border p-2 rounded-lg gap-1">
            <div>
              Top <strong>50</strong>
              <br />
              giver
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
            </div>
          </div>
        )}

        {/* Top 100 giver */}
        {typeof top100Giver === "boolean" && top100Giver && (
          <div className="flex border p-2 rounded-lg gap-1">
            <div>
              Top <strong>100</strong>
              <br />
              giver
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faAward} className="w-7 h-7" />
            </div>
          </div>
        )}
      </div>
      {/* Period */}
      {typeof period === "string" && (
        <div>
          Praise period:{" "}
          <a
            href={`https://optimism.givepraise.xyz/periods/${period}`}
            target="_blank"
            className="underline"
          >
            {period}
          </a>
        </div>
      )}
    </div>
  );
}
