import {Attestation} from "@/eas/types/gql/attestation.type";
import {DecodedData} from "@/eas/types/decoded-data.type";
import {getDecodedValue} from "@/eas/getDecodedValue";

export const extractPassportScore = (attestation: Attestation) => {
    const json: DecodedData = JSON.parse(attestation.decodedDataJson);
    const score = getDecodedValue<bigint>(json, "score");
    const divisor = BigInt(1000000000000000000);
    let formattedScore = "0";
    if (score) {
        formattedScore = `${(score / divisor).toString()}.${(
            score % divisor
        ).toString()}`;
        formattedScore = formattedScore.replace(/\.?0+$/, "");
    }
    return formattedScore;
}