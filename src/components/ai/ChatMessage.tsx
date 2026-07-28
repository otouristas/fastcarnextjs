"use client";

import { Bot } from "lucide-react";

export function ChatMessage({ text, isBot }: { text: string; isBot: boolean }) {
  if (isBot) {
    return (
      <div className="flex items-start gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sea)] text-[var(--primary-foreground)]">
          <Bot className="h-4 w-4" />
        </div>
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-card px-4 py-3 text-sm text-foreground shadow-sm border border-border/40">
          {text.split("\n").map((line, i) => (
            <p key={i} className={line === "" ? "h-2" : "leading-relaxed"}>
              {parseInline(line)}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[var(--sea)] px-4 py-3 text-sm text-[var(--primary-foreground)] shadow-sm">
        <p className="leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function parseInline(line: string): React.ReactNode[] {
  const tokenRe = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenRe.exec(line)) !== null) {
    if (match.index > lastIndex) {
      result.push(line.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      result.push(<strong key={key++} className="font-bold">{match[1]}</strong>);
    } else {
      result.push(
        <a
          key={key++}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-2 hover:text-[var(--sea)]"
        >
          {match[2]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    result.push(line.slice(lastIndex));
  }

  return result;
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sea)] text-[var(--primary-foreground)]">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-card px-4 py-3 shadow-sm border border-border/40">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-muted-foreground/50"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
