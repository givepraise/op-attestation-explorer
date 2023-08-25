import { getPraiseUser } from "../../praise/getPraiseUser";
import { shortenEthAddress } from "../../util/string";

type RecipientProps = {
  recipient: string;
};

export async function Recipient({ recipient }: RecipientProps) {
  const praiseUser = await getPraiseUser(recipient);

  if (recipient === "0x0000000000000000000000000000000000000000") {
    return <div>No recipient</div>;
  }

  return <div>{praiseUser?.username || shortenEthAddress(recipient)}</div>;
}
