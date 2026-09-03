"use client";

import { Children, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "./CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";
import { ZoomableImage } from "./ZoomableImage";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="classic-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Images render as <figure>; don't wrap them in <p> (invalid HTML → hydration #418)
          p({ children }) {
            const kids = Children.toArray(children).filter((child) => {
              if (typeof child === "string") return child.trim().length > 0;
              return true;
            });
            if (
              kids.length === 1 &&
              isValidElement(kids[0]) &&
              kids[0].type === ZoomableImage
            ) {
              return kids[0];
            }
            return <p>{children}</p>;
          },
          img({ src, alt }) {
            return (
              <ZoomableImage
                src={typeof src === "string" ? src : undefined}
                alt={alt}
              />
            );
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
