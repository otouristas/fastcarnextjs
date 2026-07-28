import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  },
  h2: ({ children, ...props }) => (
    <h2 className="scroll-mt-28 text-3xl font-extrabold tracking-tight text-foreground" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="scroll-mt-28 text-2xl font-bold tracking-tight text-foreground" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base leading-8 text-foreground/85" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-foreground/85" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal space-y-2 pl-6 text-base leading-8 text-foreground/85" {...props}>
      {children}
    </ol>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
