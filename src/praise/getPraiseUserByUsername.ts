import { PraiseUser } from "./types/user";
import { fetchAllPraiseUsers } from "./fetchAllPraiseUsers";

export async function getPraiseUserByUsername(username: string) {
  const users: PraiseUser[] = await fetchAllPraiseUsers();
  return users.find((user) => user.username === username);
}
