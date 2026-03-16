"use client";

import { useEffect, useState } from "react";

/**
 * Imagem que usa URL absoluta no cliente para garantir carregamento
 * (evita problemas de resolução de path relativo em algumas configurações).
 */
export default function BlogImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [href, setHref] = useState<string>(src);

  useEffect(() => {
    const s = typeof src === "string" ? src.trim() : "";
    if (!s) return;
    if (s.startsWith("http://") || s.startsWith("https://")) {
      setHref(s);
      return;
    }
    setHref(`${window.location.origin}${s.startsWith("/") ? s : `/${s}`}`);
  }, [src]);

  if (!href) return null;

  return (
    <img
      src={href}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  );
}
