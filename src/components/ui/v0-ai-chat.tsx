"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpIcon,
  FileUp,
  ImageIcon,
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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

  const showEmptyState = messages.length === 0;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-4 pt-0 md:px-6">
        <div className={cn("flex flex-1 flex-col", showEmptyState && "justify-center") }>
          <div
            className={cn(
              "overflow-hidden text-center transition-all duration-500 ease-out",
              showEmptyState ? "max-h-48 pb-8 pt-0 opacity-100" : "max-h-0 pb-0 pt-0 opacity-0"
            )}
          >
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">What’s on your mind today?</h1>
          </div>

          <div className={cn("overflow-y-auto px-1 md:px-2", showEmptyState ? "max-h-0 overflow-hidden p-0 opacity-0" : "flex-1 pb-4 pt-3 opacity-100")}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4 flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[min(780px,85%)] rounded-3xl px-4 py-3 text-sm leading-6 shadow-lg shadow-black/10 md:px-5 md:py-4 md:text-base",
                    message.role === "user"
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-foreground backdrop-blur-sm"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={cn(
            "transition-all duration-500 ease-out",
            showEmptyState ? "mt-0 pb-4 pt-0" : "sticky bottom-0 border-t border-white/10 bg-background/95 pb-0 pt-3 backdrop-blur-xl"
          )}>
            <div className="mx-auto rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 transition-all duration-300 focus-within:border-white/20">
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask Oni anything"
                className={cn(
                  "min-h-[72px] w-full resize-none border-none bg-transparent px-4 py-4 text-sm text-foreground outline-none",
                  "placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                )}
                style={{ overflow: "hidden" }}
              />

              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="group flex items-center gap-1 rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    <Paperclip className="h-4 w-4" />
                    <span className="hidden text-xs transition-opacity group-hover:inline">Attach</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-foreground"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Project
                  </button>
                  <button
                    type="submit"
                    disabled={!value.trim() || isSubmitting}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                      value.trim() && !isSubmitting
                        ? "bg-white text-black hover:scale-105"
                        : "bg-white/10 text-muted-foreground"
                    )}
                  >
                    <ArrowUpIcon className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-out",
              showEmptyState ? "max-h-24 pt-4 opacity-100" : "max-h-0 pt-0 opacity-0"
            )}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 px-1">
              <ActionButton icon={<ImageIcon className="h-4 w-4" />} label="Create an image" />
              <ActionButton icon={<Sigma className="h-4 w-4" />} label="Write or edit" />
              <ActionButton icon={<FileUp className="h-4 w-4" />} label="Upload a project" />
            </div>
          </div>
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
    "flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-foreground";

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