"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export function MermaidDiagram({ chart }: { chart: string }) {
  const reactId = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = `mmd-${reactId}`;
    const theme = resolvedTheme === "light" ? "neutral" : "dark";

    void import("mermaid").then(({ default: mermaid }) => {
      if (cancelled) return;
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
      return mermaid.render(id, chart.trim());
    }).then((result) => {
      if (cancelled || !result) return;
      setSvg(result.svg);
      setError(null);
    }).catch((err: Error) => {
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
    <figure className="diagram-figure">
      <div
        className="mermaid-diagram diagram-scroll"
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
      <figcaption className="diagram-hint">Swipe to pan</figcaption>
    </figure>
  );
}
