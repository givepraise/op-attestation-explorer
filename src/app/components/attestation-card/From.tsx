import { shortenEthAddress } from "../../util/string";

type FromProps = {
  from: string;
};

export function From({ from }: FromProps) {
  return <div>From {shortenEthAddress(from)}</div>;
}
