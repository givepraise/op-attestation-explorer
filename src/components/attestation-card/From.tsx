import { shortenEthAddress } from "../../util/string";

type FromProps = {
  from: string;
  className?: string;
};

export function From({ from, className }: FromProps) {
  return <div className={className}>{shortenEthAddress(from)}</div>;
}
