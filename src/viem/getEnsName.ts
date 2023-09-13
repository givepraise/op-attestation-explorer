import { publicClient } from "./client";

export async function getEnsName(address: string) {
  return publicClient.getEnsName({
    address: address as `0x${string}`,
  });
}
