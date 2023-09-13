import { createPublicClient, http } from "viem";
import { mainnet, optimism } from "viem/chains";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/qnxL24D3JLombw4ZtZJkCFENIb-RGFOw"
  ),
});
