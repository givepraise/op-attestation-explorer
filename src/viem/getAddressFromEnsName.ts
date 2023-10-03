import React from "react";
import { publicClient } from "./client";

export const getAddressFromEnsName = React.cache(async (name: string) => {
  try {
    return publicClient.getEnsAddress({
      name: name,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
});
