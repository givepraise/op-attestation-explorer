import { shortenEthAddress } from "../../util/string";

type UidProps = {
  uid: string;
};

export function Uid({ uid }: UidProps) {
  return <div>Uid {shortenEthAddress(uid)}</div>;
}
