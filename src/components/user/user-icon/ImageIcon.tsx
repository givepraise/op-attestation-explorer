"use client";

import { SvgIcon } from "./SvgIcon";
import { useState } from "react";

type ImageIconProps = {
  url: string;
  variant?: "round" | "square";
  size?: "tiny" | "small" | "large";
  className?: string;
};

function sizeClass(size: ImageIconProps["size"]) {
  if (size === "tiny") {
    return "h-4 w-4";
  }
  if (size === "large") {
    return "h-20 w-20";
  }
  return "h-10 w-10";
}

export function ImageIcon({
  url,
  variant = "round",
  size = "small",
  className = "",
}: ImageIconProps) {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  const roundedClass = variant === "round" ? "rounded-full" : "rounded-3xl";

  if (imageLoadError) {
    return <SvgIcon />;
  }

  return (
    <div
      className={`flex items-center justify-center ${sizeClass(
        size
      )} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        onError={(): void => setImageLoadError(true)}
        alt="avatar"
        className={`object-cover max-w-none ${roundedClass} ${sizeClass(size)}`}
      />
    </div>
  );
}
