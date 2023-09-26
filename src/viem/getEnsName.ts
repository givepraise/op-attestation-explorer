import React from "react";
import { publicClient } from "./client";

export const getEnsName = React.cache(async (address: string) => {
  return publicClient.getEnsName({
    address: address as `0x${string}`,
  });
});
