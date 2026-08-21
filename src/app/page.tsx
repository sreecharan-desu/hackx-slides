import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { getAllTracks } from "@/lib/content";

export default function HomePage() {
  const tracks = getAllTracks();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--brand-purple) 18%, transparent), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, color-mix(in srgb, var(--brand-coral) 10%, transparent), transparent 50%)",
        }}
      />

      <header className="border-b border-border/80 bg-nav/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[880px] items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/hackx-logo.png"
              alt="hackx"
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
              priority
            />
            <span className="text-lg font-semibold tracking-tight">hackx</span>
          </Link>
          <span className="hidden text-sm text-muted sm:inline">
            {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-4 pb-24 pt-14 sm:pt-20">
        <div className="mb-12 text-center sm:mb-14">
          <p className="mb-3 text-sm font-medium tracking-[0.14em] text-muted uppercase">
            Learn by building
          </p>
          <h1 className="mb-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Tracks
          </h1>
          <p className="mx-auto max-w-md text-base text-muted sm:text-lg">
            Classic, readable lessons. Pick a track and start from slide one.
          </p>
        </div>

        {tracks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
            <p className="text-muted">No tracks yet — drop content into{" "}
              <code className="rounded bg-[var(--code-inline-bg)] px-1.5 py-0.5 text-[var(--code-inline-fg)]">
                content/tracks
              </code>
              .
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tracks.map((track) => (
              <li key={track.id}>
                <Link
                  href={`/tracks/${track.id}`}
                  className="group flex items-stretch gap-4 rounded-xl border border-border bg-surface/40 px-4 py-4 transition-colors hover:border-foreground/25 hover:bg-surface sm:px-5 sm:py-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-lg font-semibold tracking-tight text-foreground">
                        {track.title}
                      </span>
                      <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted">
                        {track.chapters} chapters
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {track.description}
                    </p>
                  </div>

                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
