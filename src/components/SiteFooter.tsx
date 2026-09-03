export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="flex justify-center px-4 py-5 sm:py-6">
        <p className="text-[11px] leading-none tracking-wide text-muted sm:text-xs">
          by{" "}
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
