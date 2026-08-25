"use client";

import { useEffect, useState } from "react";

export function ZoomableImage({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!src) return null;

  return (
    <>
      <button type="button" className="image-zoom-trigger" onClick={() => setOpen(true)}>
        <img src={src} alt={alt ?? ""} />
      </button>
      {open ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Enlarged image"}
          onClick={() => setOpen(false)}
        >
          <img src={src} alt={alt ?? ""} onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}
