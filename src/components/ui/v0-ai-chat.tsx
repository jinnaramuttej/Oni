"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpIcon,
  CircleUserRound,
  FileUp,
  ImageIcon,
  MonitorIcon,
  Paperclip,
  Sigma,
  PlusIcon,
} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;

      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Ask Oni what to build next, then I’ll draft a response.",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      const prompt = value.trim();
      if (!prompt || isSubmitting) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: prompt,
      };

      setMessages((current) => [...current, userMessage]);
      setValue("");
      adjustHeight(true);
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const data = (await response.json().catch(() => null)) as { output?: string; error?: string } | null;

        if (!response.ok) {
          throw new Error(data?.error ?? "Unable to generate a response");
        }

        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data?.output ?? "No response returned.",
          },
        ]);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to generate a response";
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: message,
          },
        ]);
      } finally {
        setIsSubmitting(false);
      }
    },
    [adjustHeight, isSubmitting, value]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-3xl flex-col justify-center gap-8 p-4">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-bold text-foreground">Ask Oni what to build next</h1>
        <p className="text-sm text-muted-foreground">Centered for faster iteration, with replies streamed from Groq.</p>
      </div>

      <div className="space-y-4">
        <div className="max-h-[320px] space-y-3 overflow-y-auto rounded-3xl border border-border bg-card/60 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                  message.role === "user"
                    ? "bg-foreground text-background"
                    : "border border-border bg-background/80 text-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="relative rounded-2xl border border-border bg-card/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask Oni a question..."
              className={cn(
                "w-full resize-none border-none bg-transparent px-4 py-3 text-sm text-foreground",
                "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-sm placeholder:text-muted-foreground",
                "min-h-[60px]"
              )}
              style={{ overflow: "hidden" }}
            />
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <button type="button" className="group flex items-center gap-1 rounded-lg p-2 transition-colors hover:bg-accent/60">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="hidden text-xs text-muted-foreground transition-opacity group-hover:inline">Attach</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-between gap-1 rounded-lg border border-dashed border-border px-2 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-accent/60 hover:text-foreground"
              >
                <PlusIcon className="h-4 w-4" />
                Project
              </button>
              <button
                type="submit"
                disabled={!value.trim() || isSubmitting}
                className={cn(
                  "flex items-center justify-between gap-1 rounded-lg border border-border px-1.5 py-1.5 text-sm transition-colors hover:border-foreground/30 hover:bg-accent/60",
                  value.trim() && !isSubmitting ? "bg-foreground text-background" : "text-muted-foreground"
                )}
              >
                <ArrowUpIcon
                  className={cn("h-4 w-4", value.trim() && !isSubmitting ? "text-background" : "text-muted-foreground")}
                />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <ActionButton icon={<ImageIcon className="h-4 w-4" />} label="Clone a Screenshot" />
          <ActionButton icon={<Sigma className="h-4 w-4" />} label="Import from Figma" />
          <ActionButton icon={<FileUp className="h-4 w-4" />} label="Upload a Project" />
          <ActionButton href="/" icon={<MonitorIcon className="h-4 w-4" />} label="Dashboard" />
          <ActionButton href="/signup" icon={<CircleUserRound className="h-4 w-4" />} label="Sign Up Form" />
        </div>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

function ActionButton({ icon, label, href }: ActionButtonProps) {
  const className =
    "flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground";

  if (href) {
    return (
      <Link href={href} className={className}>
        {icon}
        <span className="text-xs">{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}