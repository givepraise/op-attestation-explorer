import { GetUsersSortBy, GetUsersSortOrder } from "./types/get-users-sort.type";

import { RecipientWithPraiseUser } from "./types/gql/recipent-with-praise-user.type";
import { getAllPraiseUsers } from "../praise/getAllPraiseUsers";
import { getAllRecipients } from "./getAllRecipients";
import { getPraiseUserByAddress } from "../praise/getPraiseUserByAddress";

export async function getUsers(
  sort: GetUsersSortBy = "username",
  order: GetUsersSortOrder = "desc"
) {
  const recipients = await getAllRecipients();
  const praiseUsers = await getAllPraiseUsers();

  const users: RecipientWithPraiseUser[] = recipients.map((recipient) => {
    const praiseUser = getPraiseUserByAddress(praiseUsers, recipient.address);
    return {
      address: recipient.address,
      attestations: recipient.attestations,
      praiseUser,
    };
  });

  users.sort((a, b) => {
    let comparisonValue = 0;

    if (sort === "username") {
      const aUsername = a.praiseUser?.username || "";
      const bUsername = b.praiseUser?.username || "";
      comparisonValue = aUsername.localeCompare(bUsername);
    } else if (sort === "attestations") {
      comparisonValue = a.attestations - b.attestations;
    }

    return order === "asc" ? comparisonValue : -comparisonValue;
  });

  return users;
}
