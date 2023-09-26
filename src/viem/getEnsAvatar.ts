import React from "react";
import { normalize } from "viem/ens";
import { publicClient } from "./client";

export const getEnsAvatar = React.cache(async (address: string) => {
  const ensName = await publicClient.getEnsName({
    address: address as `0x${string}`,
  });
  if (ensName) {
    return publicClient.getEnsAvatar({
      name: normalize(ensName),
    });
  }
});
