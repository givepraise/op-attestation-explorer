import { getEnsName } from "../../viem/getEnsName";
import { getUserName } from "../../eas/getUserName";
import { publicClient } from "../../viem/client";
import { shortenEthAddress } from "../../util/string";

type FromProps = {
  from: string;
  className?: string;
};

export async function From({ from, className }: FromProps) {
  const username = await getUserName(from);

  return (
    <div className={`whitespace-nowrap ${className}`}>
      {username || shortenEthAddress(from)}
    </div>
  );
}
