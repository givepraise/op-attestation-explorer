import { PRAISE_API_URL } from "../constants";
import { PraiseUser } from "./types/user";

export async function fetchAllPraiseUsers() {
  const res = await fetch(PRAISE_API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const users: PraiseUser[] = await res.json();
  return users;
}
