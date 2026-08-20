import Link from "next/link";
import { notFound } from "next/navigation";
import { ClassicNavbar } from "@/components/ClassicNavbar";
import { JumpTo } from "@/components/JumpTo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAdjacentLessons, getLesson, getTrack } from "@/lib/content";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ trackId: string; lessonId: string }>;
}) {
  const { trackId, lessonId } = await params;
  const track = getTrack(trackId);
  const lesson = getLesson(trackId, lessonId);
  if (!track || !lesson) notFound();

  const { prev, next, index, total } = getAdjacentLessons(trackId, lesson.id);

  return (
    <div className="min-h-screen">
      <ClassicNavbar
        trackId={track.id}
        trackTitle={track.title}
        currentIndex={index}
        total={total}
        lessons={track.lessons}
        prevId={prev?.id ?? null}
        nextId={next?.id ?? null}
      />

      <MarkdownContent content={lesson.content} />

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[720px] items-center justify-between gap-3 px-4 py-6">
          <JumpTo trackId={track.id} lessons={track.lessons} currentId={lesson.id} />

          <div className="flex items-center gap-2">
            {prev ? (
              <Link
                href={`/tracks/${track.id}/${prev.id}`}
                className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm hover:bg-surface"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Link>
            ) : (
              <span className="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-md border border-border px-3 text-sm opacity-40">
                <ChevronLeft className="h-4 w-4" />
                Prev
              </span>
            )}
            {next ? (
              <Link
                href={`/tracks/${track.id}/${next.id}`}
                className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm hover:bg-surface"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-md border border-border px-3 text-sm opacity-40">
                Next
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
