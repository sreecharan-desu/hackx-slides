import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllTracks } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  const tracks = getAllTracks();

  return (
    <div className="min-h-screen">
      <SiteHeader
        right={
          <span>
            {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
          </span>
        }
      />

      <main className="mx-auto max-w-[42rem] px-5 pb-28 pt-16 sm:px-6 sm:pt-24">
        <div className="mb-14">
          <p className="mb-3 text-xs font-medium tracking-[0.16em] text-muted uppercase">
            Learn by building
          </p>
          <h1 className="mb-4 text-[2.35rem] font-semibold leading-none tracking-tight sm:text-5xl">
            Tracks
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-[17px]">
            You will build with us, not copy a finished app in silence. Start at
            slide one. When you are stuck, compare with the finished API — do not
            skip the typing.
          </p>
          <a
            href="https://github.com/sreecharan-desu/club-portal-backend"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-9 items-center rounded-md border border-border px-3 text-sm text-foreground hover:bg-surface"
          >
            github.com/sreecharan-desu/club-portal-backend
          </a>
        </div>

        {tracks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
            <p className="text-muted">
              No tracks yet — drop content into{" "}
              <code className="rounded bg-[var(--code-inline-bg)] px-1.5 py-0.5 text-[var(--code-inline-fg)]">
                content/tracks
              </code>
              .
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tracks.map((track, i) => (
              <li key={track.id}>
                <Link
                  href={`/tracks/${track.id}`}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-surface/50 px-5 py-5 sm:gap-5 sm:px-6 sm:py-6"
                >
                  <span className="mt-0.5 w-8 shrink-0 text-sm tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-xl font-semibold tracking-tight text-foreground">
                        {track.title}
                      </span>
                      <span className="text-sm text-muted">
                        {track.chapters} chapters
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                      {track.description}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted group-hover:text-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
