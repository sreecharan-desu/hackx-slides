import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import { getAllTracks } from "@/lib/content";

export default function HomePage() {
  const tracks = getAllTracks();

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
        <h1 className="mb-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Tracks
        </h1>
        <p className="mb-10 text-center text-muted">
          Classic, readable lessons. Pick a track to start.
        </p>

        {tracks.length === 0 ? (
          <p className="text-center text-muted">No tracks yet.</p>
        ) : (
          <ul className="space-y-1">
            {tracks.map((track) => (
              <li key={track.id}>
                <Link
                  href={`/tracks/${track.id}`}
                  className="group flex items-start gap-3 rounded-md px-2 py-3 hover:bg-surface"
                >
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                  <div className="min-w-0">
                    <div className="font-medium underline decoration-foreground/40 underline-offset-4 group-hover:decoration-foreground">
                      {track.title}
                    </div>
                    <div className="mt-0.5 text-sm text-muted">
                      {track.chapters} chapters · {track.description}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
