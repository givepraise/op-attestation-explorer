import { publicClient } from "./client";

export async function getAddressFromEnsName(name: string) {
  return publicClient.getEnsAddress({
    name: name,
  });
}
