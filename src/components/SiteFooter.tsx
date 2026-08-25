export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="flex justify-center px-4 py-8 sm:py-10">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <span>Made with</span>
          <span className="heart-pulse" aria-hidden>
            <svg
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="currentColor"
            >
              <path d="M12 21s-6.7-4.35-9.33-8.08C.8 10.4 1.1 6.9 3.7 5.15 6.05 3.55 8.7 4.3 12 7.2c3.3-2.9 5.95-3.65 8.3-2.05 2.6 1.75 2.9 5.25 1.03 7.77C18.7 16.65 12 21 12 21z" />
            </svg>
          </span>
          <span>by</span>
          <a
            href="https://sreecharandesu.in"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline decoration-border underline-offset-[5px] transition-colors hover:decoration-foreground"
          >
            Sreecharan
          </a>
        </p>
      </div>
    </footer>
  );
}
