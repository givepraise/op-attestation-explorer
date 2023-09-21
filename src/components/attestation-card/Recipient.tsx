import { getEnsName } from "../../viem/getEnsName";
import { getUserName } from "../../eas/getUserName";
import { shortenEthAddress } from "../../util/string";

type RecipientProps = {
  recipient: string;
};

export async function Recipient({ recipient }: RecipientProps) {
  const username = await getUserName(recipient);

  if (recipient === "0x0000000000000000000000000000000000000000") {
    return <div>No recipient</div>;
  }

  return (
    <div className="font-medium w-32 md:w-48 overflow-clip overflow-ellipsis">
      {username || shortenEthAddress(recipient)}
    </div>
  );
}
