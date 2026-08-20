"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

type LessonNavItem = {
  id: string;
  title: string;
  order: number;
};

export function JumpTo({
  trackId,
  lessons,
  currentId,
}: {
  trackId: string;
  lessons: LessonNavItem[];
  currentId?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 text-sm hover:bg-surface"
        aria-expanded={open}
      >
        <ExternalLink className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Jump To</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[70vh] w-[min(92vw,360px)] overflow-y-auto rounded-md border border-border bg-nav py-1 shadow-xl">
          {lessons.map((lesson) => {
            const active = lesson.id === currentId;
            return (
              <Link
                key={lesson.id}
                href={`/tracks/${trackId}/${lesson.id}`}
                onClick={() => setOpen(false)}
                className={`block truncate px-3 py-2 text-sm hover:bg-surface ${
                  active ? "bg-surface font-medium" : "text-muted hover:text-foreground"
                }`}
              >
                {lesson.order} - {lesson.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
