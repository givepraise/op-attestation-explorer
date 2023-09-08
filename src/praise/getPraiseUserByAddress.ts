import { PRAISE_API_URL } from "../constants";
import { PraiseUser } from "./types/user";
import { fetchAllPraiseUsers } from "./fetchAllPraiseUsers";

export async function getPraiseUserByAddress(address: string) {
  const users: PraiseUser[] = await fetchAllPraiseUsers();
  return users.find((user) => user.identityEthAddress === address);
}
