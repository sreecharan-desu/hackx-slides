import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "tracks");

export type TrackMeta = {
  id: string;
  title: string;
  description: string;
  chapters: number;
};

export type LessonMeta = {
  id: string;
  title: string;
  order: number;
  slug: string;
};

export type Lesson = LessonMeta & {
  content: string;
};

export type Track = TrackMeta & {
  lessons: LessonMeta[];
};

function readTrackMeta(trackId: string): TrackMeta {
  const metaPath = path.join(CONTENT_DIR, trackId, "meta.json");
  const raw = fs.readFileSync(metaPath, "utf8");
  return JSON.parse(raw) as TrackMeta;
}

function listLessonFiles(trackId: string): string[] {
  const dir = path.join(CONTENT_DIR, trackId, "lessons");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

function lessonFromFile(trackId: string, filename: string, index: number): Lesson {
  const filePath = path.join(CONTENT_DIR, trackId, "lessons", filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.md$/, "");
  return {
    id: slug,
    slug,
    title: (data.title as string) || slug,
    order: (data.order as number) || index + 1,
    content,
  };
}

export function getAllTracks(): Track[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const meta = readTrackMeta(d.name);
      const lessons = listLessonFiles(d.name).map((file, i) => {
        const lesson = lessonFromFile(d.name, file, i);
        return {
          id: lesson.id,
          title: lesson.title,
          order: lesson.order,
          slug: lesson.slug,
        };
      });
      return {
        ...meta,
        id: d.name,
        chapters: lessons.length,
        lessons: lessons.sort((a, b) => a.order - b.order),
      };
    });
}

export function getTrack(trackId: string): Track | null {
  const tracks = getAllTracks();
  return tracks.find((t) => t.id === trackId) ?? null;
}

export function getLesson(trackId: string, lessonId: string): Lesson | null {
  const files = listLessonFiles(trackId);
  for (let i = 0; i < files.length; i++) {
    const lesson = lessonFromFile(trackId, files[i], i);
    if (lesson.id === lessonId || lesson.slug === lessonId) {
      return lesson;
    }
  }
  return null;
}

export function getAdjacentLessons(trackId: string, lessonId: string) {
  const track = getTrack(trackId);
  if (!track) return { prev: null, next: null, index: -1, total: 0 };

  const index = track.lessons.findIndex((l) => l.id === lessonId);
  return {
    prev: index > 0 ? track.lessons[index - 1] : null,
    next: index >= 0 && index < track.lessons.length - 1 ? track.lessons[index + 1] : null,
    index,
    total: track.lessons.length,
  };
}
