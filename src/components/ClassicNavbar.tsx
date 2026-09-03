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
  List,
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
    if (nextHref) router.prefetch(nextHref);
    if (prevHref) router.prefetch(prevHref);
  }, [router, nextHref, prevHref]);

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
      <div className="mx-auto flex h-14 max-w-[1100px] items-center gap-2 px-3 sm:gap-3 sm:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/hackx-logo.png"
            alt="hackx"
            width={32}
            height={32}
            className="block size-8 rounded-sm object-contain"
            priority
          />
          <span className="hidden text-base font-semibold tracking-tight md:inline">
            hackx
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight text-foreground sm:text-[15px]">
            {trackTitle}
          </p>
          <p className="text-[11px] leading-none text-muted tabular-nums sm:text-xs">
            {currentIndex + 1} / {total}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <JumpTo
            trackId={trackId}
            lessons={lessons}
            currentId={lessons[currentIndex]?.id}
          />

          <NavIcon
            href={prevHref}
            disabled={!prevHref}
            label="Previous slide"
            icon={<ChevronLeft className="h-4 w-4" />}
          />
          <NavIcon
            href={nextHref}
            disabled={!nextHref}
            label="Next slide"
            icon={<ChevronRight className="h-4 w-4" />}
          />

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-surface"
          >
            {mounted && theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          <Link
            href={`/tracks/${trackId}`}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-surface sm:w-auto sm:gap-1.5 sm:px-2.5"
            title="Track outline"
            aria-label="Track outline"
          >
            <List className="h-4 w-4 sm:hidden" />
            <ExternalLink className="hidden h-3.5 w-3.5 sm:block" />
            <span className="hidden text-sm sm:inline">Outline</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavIcon({
  href,
  disabled,
  label,
  icon,
}: {
  href?: string;
  disabled?: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  const className = `inline-flex size-9 items-center justify-center rounded-md border border-border ${
    disabled ? "cursor-not-allowed opacity-40" : "hover:bg-surface"
  }`;

  if (disabled || !href) {
    return (
      <span className={className} aria-disabled aria-label={label}>
        {icon}
      </span>
    );
  }

  return (
    <Link href={href} prefetch className={className} aria-label={label}>
      {icon}
    </Link>
  );
}
