import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = await params;
  const track = getTrack(trackId);
  if (!track) notFound();

  return (
    <div className="min-h-screen">
      <SiteHeader
        right={
          <Link href="/" className="hover:text-foreground">
            All tracks
          </Link>
        }
      />

      <main className="mx-auto max-w-[42rem] px-5 pb-28 pt-16 sm:px-6 sm:pt-20">
        <div className="mb-12">
          <p className="mb-3 text-xs font-medium tracking-[0.16em] text-muted uppercase">
            {track.chapters} chapters
          </p>
          <h1 className="mb-4 text-[2.1rem] font-semibold leading-tight tracking-tight sm:text-4xl">
            {track.title}
          </h1>
          <p className="max-w-xl text-muted">{track.description}</p>
        </div>

        <ul className="overflow-hidden rounded-xl border border-border bg-surface/50">
          {track.lessons.map((lesson, i) => (
            <li key={lesson.id} className="border-b border-border last:border-b-0">
              <Link
                href={`/tracks/${track.id}/${lesson.id}`}
                className="group flex items-center gap-4 px-5 py-3.5 sm:px-6"
              >
                <span className="w-8 shrink-0 text-sm tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-foreground group-hover:underline group-hover:underline-offset-4">
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
