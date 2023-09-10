import { GetUsersSortBy, GetUsersSortOrder } from "./types/get-users-sort.type";

import { RecipientWithPraiseUser } from "./types/gql/recipent-with-praise-user.type";
import { getAllPraiseUsers } from "../praise/getAllPraiseUsers";
import { getAllRecipients } from "./getAllRecipients";
import { getPraiseUserByAddress } from "../praise/getPraiseUserByAddress";

export async function getUsers(
  sort: GetUsersSortBy = "attestations",
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

  return users;
}
