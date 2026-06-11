"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpIcon, Paperclip } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type SuggestionChip = {
  label: string;
  value: string;
};

const suggestionChips: SuggestionChip[] = [
  { label: "Build me a portfolio site", value: "Build me a portfolio site" },
  { label: "Create a landing page for my startup", value: "Create a landing page for my startup" },
  { label: "Make a restaurant website", value: "Make a restaurant website" },
  { label: "Generate a SaaS pricing page", value: "Generate a SaaS pricing page" },
];

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

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
      const nextHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${nextHeight}px`;
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

export function OniChat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [displayName, setDisplayName] = useState("Uttej");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 180,
  });

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me")
      .then(async (response) => {
        if (!response.ok) return null;
        const data = (await response.json().catch(() => null)) as { user?: { name?: string | null } | null } | null;
        return data?.user ?? null;
      })
      .then((user) => {
        if (!active || !user?.name) return;
        const firstName = user.name.trim().split(/\s+/)[0];
        if (firstName) setDisplayName(firstName);
      })
      .catch(() => {
        // Keep fallback name.
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isSending]);

  const handleSubmit = useCallback(
    async (promptOverride?: string) => {
      const prompt = (promptOverride ?? value).trim();
      if (!prompt || isSending) return;

      setMessages((current) => [...current, { role: "user", content: prompt }]);
      setValue("");
      adjustHeight(true);
      setIsSending(true);

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
          setMessages((current) => [
            ...current,
            {
              role: "assistant",
              content: data?.error ?? "Something went wrong while generating a reply.",
            },
          ]);
          return;
        }

        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: data?.output ?? "No response returned.",
          },
        ]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: "Network error. Check your connection and try again.",
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [adjustHeight, isSending, value]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  const fillSuggestion = (text: string) => {
    setValue(text);
    adjustHeight();
    textareaRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full min-h-0 w-full text-white">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl transition-all duration-300 ease-in-out">
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            <motion.div
              key="landing-state"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex min-h-0 w-full items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-4xl">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Hello, {displayName} <span aria-hidden="true">{"\uD83D\uDC4B"}</span>
                  </h1>
                  <p className="mt-4 text-base text-white/45 sm:text-lg">What can I help you ship?</p>
                </div>

                <motion.div
                  layout
                  className="mx-auto mt-10 w-full"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChatComposer
                    value={value}
                    onChange={(nextValue) => {
                      setValue(nextValue);
                      adjustHeight();
                    }}
                    onKeyDown={handleKeyDown}
                    onSend={() => {
                      void handleSubmit();
                    }}
                    textareaRef={textareaRef}
                    isSending={isSending}
                    centered
                  />

                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {suggestionChips.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => fillSuggestion(chip.value)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors duration-300 ease-in-out hover:bg-white/10"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat-state"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex h-full min-h-0 w-full flex-col px-4"
            >
              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pb-6 pt-2 scrollbar-hidden">
                {messages.map((message, index) =>
                  message.role === "user" ? (
                    <motion.div
                      key={`user-${index}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[80%] rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm leading-6 text-white">
                        {message.content}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`assistant-${index}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex max-w-4xl flex-col gap-1 text-left"
                    >
                      <span className="text-xs text-white/35">Oni</span>
                      <AnimatedAssistantText key={message.content} content={message.content} />
                    </motion.div>
                  )
                )}
                {isSending && <p className="text-xs text-white/35">Oni is thinking...</p>}
                <div ref={messagesEndRef} />
              </div>

              <motion.div
                layout
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="z-20 shrink-0 bg-[#0a0a0a]/95 pb-4 pt-4 backdrop-blur-md"
              >
                <ChatComposer
                  value={value}
                  onChange={(nextValue) => {
                    setValue(nextValue);
                    adjustHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  onSend={() => {
                    void handleSubmit();
                  }}
                  textareaRef={textareaRef}
                  isSending={isSending}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AnimatedAssistantText({ content }: { content: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const tokens = content.match(/\S+\s*/g) ?? [content];
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setVisibleText(tokens.slice(0, index).join(""));

      if (index >= tokens.length) {
        window.clearInterval(interval);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, [content]);

  return (
    <p className="max-w-3xl whitespace-pre-wrap text-sm leading-7 text-white">
      {visibleText}
      {visibleText.length < content.length && <span className="text-white/45">|</span>}
    </p>
  );
}

type ChatComposerProps = {
  value: string;
  onChange: (nextValue: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  isSending: boolean;
  centered?: boolean;
};

function ChatComposer({
  value,
  onChange,
  onKeyDown,
  onSend,
  textareaRef,
  isSending,
  centered = false,
}: ChatComposerProps) {
  return (
    <div className={cn("w-full", centered && "mx-auto max-w-4xl")}>
      <div className="rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 ease-in-out">
        <div className="flex items-end gap-3 px-4 py-3">
          <button
            type="button"
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/75 transition-colors duration-300 ease-in-out hover:bg-white/10 hover:text-white"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask Oni anything..."
            className={cn(
              "min-h-[56px] flex-1 resize-none border-0 bg-transparent px-0 py-2 text-sm leading-6 text-white placeholder:text-white/35 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
            style={{ overflow: "hidden" }}
          />

          <button
            type="button"
            onClick={onSend}
            disabled={!value.trim() || isSending}
            className={cn(
              "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-in-out",
              value.trim() && !isSending
                ? "bg-white text-black hover:bg-white/90"
                : "cursor-not-allowed bg-white/10 text-white/35"
            )}
            aria-label="Send message"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
