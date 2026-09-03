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
      <figure className="diagram-figure">
        <button
          type="button"
          className="image-zoom-trigger"
          onClick={() => setOpen(true)}
          aria-label={alt ? `Enlarge: ${alt}` : "Enlarge diagram"}
        >
          <img src={src} alt={alt ?? ""} className="diagram-preview" />
          <span className="diagram-zoom-badge" aria-hidden>
            Tap to enlarge
          </span>
        </button>
      </figure>
      {open ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Enlarged diagram"}
          onClick={() => setOpen(false)}
        >
          <div
            className="image-lightbox-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={alt ?? ""} className="diagram-full" />
          </div>
          <p className="image-lightbox-hint">
            Scroll to pan · tap outside or Esc to close
          </p>
        </div>
      ) : null}
    </>
  );
}
