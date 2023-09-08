import { shortenEthAddress } from "../../util/string";

type UidProps = {
  uid: string;
  className?: string;
};

export function Uid({ uid, className }: UidProps) {
  return <div className={className}>{shortenEthAddress(uid)}</div>;
}
