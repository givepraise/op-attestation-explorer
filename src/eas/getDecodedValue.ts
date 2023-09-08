import { DecodedData } from "./types/decoded-data.type";

export function getDecodedValue(data: DecodedData, value: string) {
  const decodedData = data.find((item) => item.name === value);
  if (decodedData) {
    return decodedData.value.value;
  }
  return undefined;
}
