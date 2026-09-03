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
        <div className="diagram-scroll">
          <button
            type="button"
            className="image-zoom-trigger"
            onClick={() => setOpen(true)}
            aria-label={alt ? `Enlarge: ${alt}` : "Enlarge image"}
          >
            <img src={src} alt={alt ?? ""} />
          </button>
        </div>
        <figcaption className="diagram-hint">
          Swipe to pan · tap to enlarge
        </figcaption>
      </figure>
      {open ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Enlarged image"}
          onClick={() => setOpen(false)}
        >
          <div className="image-lightbox-scroll" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt ?? ""} />
          </div>
          <p className="image-lightbox-hint">Tap outside or press Esc to close</p>
        </div>
      ) : null}
    </>
  );
}
