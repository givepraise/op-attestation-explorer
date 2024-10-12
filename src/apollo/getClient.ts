import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {chains, DEFAULT_REVALIDATE_TIME, getEASApiUrl} from "../config";

import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

function createApolloClient(uri: string) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri,
      fetchOptions: { next: { revalidate: DEFAULT_REVALIDATE_TIME } },
    }),
  });
}

export const getClient = (chain?: chains) => {
  const {getClient} = registerApolloClient(() => createApolloClient(getEASApiUrl(chain)));
    return getClient();
};
