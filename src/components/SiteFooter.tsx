export function SiteFooter() {
  return (
    <footer>
      <div className="flex justify-end px-4 py-4 sm:px-6 sm:py-5">
        <p className="flex items-center gap-1 text-[11px] leading-none text-muted sm:text-xs">
          <span>Made with</span>
          <span className="text-[0.85em] text-[var(--brand-coral)]" aria-hidden>
            ♥
          </span>
          <span>by</span>
          <a
            href="https://sreecharandesu.in"
            target="_blank"
            rel="noreferrer"
            className="text-muted underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/40"
          >
            Sreecharan
          </a>
        </p>
      </div>
    </footer>
  );
}
