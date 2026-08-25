"use client";

import { isValidElement, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "./CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";

function ZoomableImage({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!src) return null;

  return (
    <>
      <button type="button" className="image-zoom-trigger" onClick={() => setOpen(true)}>
        <img src={src} alt={alt ?? ""} />
      </button>
      {open ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Enlarged image"}
          onClick={() => setOpen(false)}
        >
          <img src={src} alt={alt ?? ""} onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="classic-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          img({ src, alt }) {
            return <ZoomableImage src={typeof src === "string" ? src : undefined} alt={alt} />;
          },
          table({ children }) {
            return (
              <div className="table-wrap">
                <table>{children}</table>
              </div>
            );
          },
          pre({ children }) {
            const child = Array.isArray(children) ? children[0] : children;
            if (
              isValidElement(child) &&
              typeof child.props === "object" &&
              child.props &&
              "className" in child.props &&
              String(child.props.className || "").includes("language-mermaid")
            ) {
              const code = String(
                (child.props as { children?: React.ReactNode }).children ?? ""
              ).replace(/\n$/, "");
              return <MermaidDiagram chart={code} />;
            }
            return <CodeBlock>{children}</CodeBlock>;
          },
          a({ href, children }) {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
