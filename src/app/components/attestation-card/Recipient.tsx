import { shortenEthAddress } from "../../util/string";

type RecipientProps = {
  recipient: string;
};

export function Recipient({ recipient }: RecipientProps) {
  if (recipient === "0x0000000000000000000000000000000000000000") {
    return <div>No recipient</div>;
  }

  return <div>{shortenEthAddress(recipient)}</div>;
}
