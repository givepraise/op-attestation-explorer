import { ImageIcon } from "./user-icon/ImageIcon";
import { PraiseUserAccount } from "../../praise/types/user-account";
import { SvgIcon } from "./user-icon/SvgIcon";
import { getPraiseUserByAddress } from "../../praise/getPraiseUserByAddress";

type UserIconProps = {
  address: string;
  variant?: "round" | "square";
  size?: "small" | "large";
};

const discordAvatarUrl = (account: PraiseUserAccount): string => {
  return `https://cdn.discordapp.com/avatars/${account.accountId}/${account.avatarId}.webp?size=128`;
};

export async function UserIcon({
  address,
  variant = "round",
  size = "small",
}: UserIconProps) {
  const praiseUser = await getPraiseUserByAddress(address);

  let url;
  if (praiseUser) {
    if (Array.isArray(praiseUser.accounts) && praiseUser.accounts.length > 0) {
      for (const account of praiseUser.accounts) {
        // Prefer DISCORD over others
        if (account.avatarId && account.platform === "DISCORD") {
          url = discordAvatarUrl(account);
          break;
        }
      }
    }
  }

  return url ? (
    <ImageIcon url={url} variant={variant} size={size} />
  ) : (
    <SvgIcon size={size} />
  );
}
