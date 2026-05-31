"use client";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"iframe"> & { srcDoc?: string };

export function SafePreview({ src, srcDoc, title = "Preview", ...props }: Props) {
  // Always restrict to scripts only; never allow same-origin
  return (
    <iframe
      src={src}
      srcDoc={srcDoc}
      title={title}
      sandbox="allow-scripts"
      className="w-full h-full"
      {...props}
    />
  );
}

export default SafePreview;
