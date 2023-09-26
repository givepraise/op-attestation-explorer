import React from "react";
import { publicClient } from "./client";

export const getAddressFromEnsName = React.cache(async (name: string) => {
  return publicClient.getEnsAddress({
    name: name,
  });
});
