import { DEFAULT_REVALIDATE_TIME, EAS_API_URL } from "../config";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({}),
    link: new HttpLink({
      uri: EAS_API_URL,
      fetchOptions: { next: { revalidate: DEFAULT_REVALIDATE_TIME } },
    }),
  });
});
