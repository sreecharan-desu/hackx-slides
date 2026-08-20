import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
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
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-[900px] items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
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
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-4 py-16">
        <h1 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {track.title}
        </h1>

        <ul className="space-y-1">
          {track.lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/tracks/${track.id}/${lesson.id}`}
                className="flex items-center gap-3 rounded-md px-2 py-2.5 text-foreground underline decoration-foreground/50 underline-offset-4 hover:bg-surface hover:decoration-foreground"
              >
                <FileText className="h-5 w-5 shrink-0" />
                <span>{lesson.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
