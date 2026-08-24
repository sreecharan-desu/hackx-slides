"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";
import { JumpTo } from "./JumpTo";

type LessonNavItem = {
  id: string;
  title: string;
  order: number;
};

type ClassicNavbarProps = {
  trackId: string;
  trackTitle: string;
  currentIndex: number;
  total: number;
  lessons: LessonNavItem[];
  prevId: string | null;
  nextId: string | null;
};

export function ClassicNavbar({
  trackId,
  trackTitle,
  currentIndex,
  total,
  lessons,
  prevId,
  nextId,
}: ClassicNavbarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const prevHref = prevId ? `/tracks/${trackId}/${prevId}` : undefined;
  const nextHref = nextId ? `/tracks/${trackId}/${nextId}` : undefined;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      const withMod = e.metaKey || e.ctrlKey;
      // ← / → and ⌘/Ctrl + ← / →
      if (e.key === "ArrowLeft" || (withMod && e.key === "ArrowLeft")) {
        if (!prevHref) return;
        e.preventDefault();
        router.push(prevHref);
        return;
      }
      if (e.key === "ArrowRight" || (withMod && e.key === "ArrowRight")) {
        if (!nextHref) return;
        e.preventDefault();
        router.push(nextHref);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, prevHref, nextHref]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-nav/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 max-w-[1100px] items-center gap-2 px-3 sm:gap-3 sm:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/hackx-logo.png"
            alt="hackx"
            width={36}
            height={36}
            className="h-8 w-8 rounded-sm object-contain"
            priority
          />
          <span className="hidden text-base font-semibold tracking-tight sm:inline">
            hackx
          </span>
        </Link>

        <div className="min-w-0 flex-1 truncate text-sm text-muted sm:text-base sm:text-foreground">
          {trackTitle}{" "}
          <span className="text-muted">
            ({currentIndex + 1} / {total})
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <JumpTo trackId={trackId} lessons={lessons} currentId={lessons[currentIndex]?.id} />

          <NavButton href={prevHref} disabled={!prevHref} label="Prev" icon={<ChevronLeft className="h-4 w-4" />} />
          <NavButton href={nextHref} disabled={!nextHref} label="Next" icon={<ChevronRight className="h-4 w-4" />} reverse />

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-surface"
          >
            {mounted && theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          <Link
            href={`/tracks/${trackId}`}
            className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm hover:bg-surface sm:inline-flex"
            title="Track outline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Outline
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavButton({
  href,
  disabled,
  label,
  icon,
  reverse,
}: {
  href?: string;
  disabled?: boolean;
  label: string;
  icon: React.ReactNode;
  reverse?: boolean;
}) {
  const className = `inline-flex h-9 items-center gap-1 rounded-md border border-border px-2 text-sm ${
    disabled
      ? "cursor-not-allowed opacity-40"
      : "hover:bg-surface"
  }`;

  const content = reverse ? (
    <>
      <span className="hidden sm:inline">{label}</span>
      {icon}
    </>
  ) : (
    <>
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </>
  );

  if (disabled || !href) {
    return (
      <span className={className} aria-disabled>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
