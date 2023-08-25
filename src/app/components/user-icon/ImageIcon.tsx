"use client";

import Image from "next/image";
import { SvgIcon } from "./SvgIcon";
import { useState } from "react";

type ImageIconProps = {
  url: string;
};

export function ImageIcon({ url }: ImageIconProps) {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  if (imageLoadError) {
    return <SvgIcon />;
  }

  return (
    <Image
      src={url}
      onError={(): void => setImageLoadError(true)}
      alt="avatar"
      width={30}
      height={30}
      className="object-contain h-10 w-10 rounded-full"
    />
  );
}
