import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { getTrack } from "@/lib/content";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = await params;
  const track = getTrack(trackId);
  if (!track) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -15%, color-mix(in srgb, var(--brand-purple) 14%, transparent), transparent 55%)",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-border/80 bg-nav/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-4">
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
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All tracks
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-4 pb-24 pt-14 sm:pt-16">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm text-muted">
            {track.chapters} chapters
          </p>
          <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {track.title}
          </h1>
          <p className="mx-auto max-w-lg text-muted">{track.description}</p>
        </div>

        <ul className="overflow-hidden rounded-xl border border-border bg-surface/40">
          {track.lessons.map((lesson, i) => (
            <li key={lesson.id} className="border-b border-border last:border-b-0">
              <Link
                href={`/tracks/${track.id}/${lesson.id}`}
                className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface sm:px-5"
              >
                <span className="w-7 shrink-0 text-sm tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <FileText className="h-4 w-4 shrink-0 text-muted group-hover:text-foreground" />
                <span className="min-w-0 flex-1 text-foreground underline decoration-transparent underline-offset-4 group-hover:decoration-foreground/40">
                  {lesson.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
