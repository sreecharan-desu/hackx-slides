import Link from "next/link";
import Image from "next/image";

export function SiteHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-nav/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex h-10 items-center gap-2.5">
          <Image
            src="/hackx-logo.png"
            alt=""
            width={40}
            height={40}
            className="block size-10 shrink-0 rounded-sm object-contain"
            priority
          />
          <span className="text-xl font-semibold tracking-tight">hackx</span>
        </Link>
        {right ? <div className="text-sm text-muted">{right}</div> : null}
      </div>
    </header>
  );
}
