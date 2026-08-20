"use client";

import { isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "./CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="classic-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
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
