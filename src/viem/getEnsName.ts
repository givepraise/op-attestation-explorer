import React from "react";
import { publicClient } from "./client";

export const getEnsName = React.cache(async (address: string) => {
  try {
    return publicClient.getEnsName({
      address: address as `0x${string}`,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
});
