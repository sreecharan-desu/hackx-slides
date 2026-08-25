import { notFound } from "next/navigation";
import { ClassicNavbar } from "@/components/ClassicNavbar";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAdjacentLessons, getAllTracks, getLesson, getTrack } from "@/lib/content";

export function generateStaticParams() {
  return getAllTracks().flatMap((track) =>
    track.lessons.map((lesson) => ({
      trackId: track.id,
      lessonId: lesson.id,
    })),
  );
}

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
    </div>
  );
}
