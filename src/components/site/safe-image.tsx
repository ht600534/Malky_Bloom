"use client";

import Image from "next/image";
import { useState } from "react";
import { normalizeImageUrl, isGoogleDriveUrl } from "@/lib/url";

type SafeImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * SafeImage — משתמש ב-next/Image לקישורים רגילים,
 * וב-<img> רגיל לקישורי Google Drive (כי Next Image לא תומך ב-Google Drive).
 */
export function SafeImage({ src, alt, width, height, fill, className, sizes, priority }: SafeImageProps) {
  const url = normalizeImageUrl(src);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-[#f3f3f3] text-[#999] text-sm ${className}`}>
        {alt || "אין תמונה"}
      </div>
    );
  }

  if (isGoogleDriveUrl(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        className={className}
        onError={() => setError(true)}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
