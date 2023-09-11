import { PRAISE_API_URL } from "../config";
import { PraiseUser } from "./types/user";

export async function getAllPraiseUsers(): Promise<PraiseUser[]> {
  const res = await fetch(PRAISE_API_URL, { next: { revalidate: 900 } }); // 15 minutes

  if (!res.ok) {
    throw new Error("Failed to fetch praise users.");
  }

  return res.json();
}
