"use client";

import { useEffect, useState } from "react";

export function ZoomableImage({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

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

  // Prefer full pixel width so UI screenshots stay readable; never smaller than ~720px on phones
  const lightboxWidth = natural
    ? Math.max(natural.w, 720)
    : undefined;

  return (
    <>
      <figure className="lesson-image">
        <button
          type="button"
          className="lesson-image-trigger"
          onClick={() => setOpen(true)}
          aria-label={alt ? `Enlarge: ${alt}` : "Enlarge image"}
        >
          <img
            src={src}
            alt={alt ?? ""}
            className="lesson-image-preview"
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth > 0) {
                setNatural({ w: img.naturalWidth, h: img.naturalHeight });
              }
            }}
          />
          <span className="lesson-image-badge" aria-hidden>
            Tap to enlarge
          </span>
        </button>
      </figure>
      {open ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Enlarged image"}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="image-lightbox-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <div
            className="image-lightbox-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt ?? ""}
              className="lesson-image-full"
              style={lightboxWidth ? { width: lightboxWidth } : undefined}
            />
          </div>
          <p className="image-lightbox-hint">
            Scroll to pan · tap outside or Close
          </p>
        </div>
      ) : null}
    </>
  );
}
