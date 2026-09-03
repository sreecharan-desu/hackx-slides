export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="flex justify-center px-4 py-5 sm:py-6">
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
