"use client";

import Image from "next/image";
import { SvgIcon } from "./SvgIcon";
import { useState } from "react";

type ImageIconProps = {
  url: string;
  variant?: "round" | "square";
  size?: "small" | "large";
};

export function ImageIcon({
  url,
  variant = "round",
  size = "small",
}: ImageIconProps) {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  const roundedClass = variant === "round" ? "rounded-full" : "rounded-3xl";
  const sizeClass = size === "small" ? "h-10 w-10" : "h-20 w-20";

  if (imageLoadError) {
    return <SvgIcon />;
  }

  return (
    <img
      src={url}
      onError={(): void => setImageLoadError(true)}
      alt="avatar"
      width={60}
      height={60}
      className={`object-contain ${roundedClass} ${sizeClass}`}
    />
  );
}
