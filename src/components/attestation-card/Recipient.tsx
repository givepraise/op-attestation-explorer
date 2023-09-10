import { getAllPraiseUsers } from "../../praise/getAllPraiseUsers";
import { getPraiseUserByAddress } from "../../praise/getPraiseUserByAddress";
import { shortenEthAddress } from "../../util/string";

type RecipientProps = {
  recipient: string;
};

export async function Recipient({ recipient }: RecipientProps) {
  const praiseUsers = await getAllPraiseUsers();
  const praiseUser = getPraiseUserByAddress(praiseUsers, recipient);

  if (recipient === "0x0000000000000000000000000000000000000000") {
    return <div>No recipient</div>;
  }

  return (
    <div className="font-medium md:w-32 overflow-clip overflow-ellipsis">
      {praiseUser?.username || shortenEthAddress(recipient)}
    </div>
  );
}
