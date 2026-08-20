"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";

export function MermaidDiagram({ chart }: { chart: string }) {
  const reactId = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = `mmd-${reactId}`;
    const theme = resolvedTheme === "light" ? "neutral" : "dark";

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme,
      fontFamily: "var(--font-poppins), system-ui, sans-serif",
      flowchart: {
        curve: "basis",
        padding: 12,
        htmlLabels: true,
        nodeSpacing: 36,
        rankSpacing: 40,
      },
    });

    mermaid
      .render(id, chart.trim())
      .then(({ svg: rendered }) => {
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [chart, reactId, resolvedTheme]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-md border border-border bg-surface p-4 text-sm text-muted">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className="mermaid-diagram my-6 overflow-x-auto rounded-lg border border-border bg-surface p-5 shadow-[inset_3px_0_0_0_var(--code-accent)] [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
