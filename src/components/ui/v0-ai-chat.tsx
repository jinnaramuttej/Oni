"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        setValue("");
        adjustHeight(true);
      }
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-8 p-4">
      <h1 className="text-4xl font-bold text-foreground">Ask Oni what to build next</h1>

      <div className="w-full">
        <div className="relative rounded-2xl border border-border bg-card/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
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
              <button
                type="button"
                className="group flex items-center gap-1 rounded-lg p-2 transition-colors hover:bg-accent/60"
              >
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="hidden text-xs text-muted-foreground transition-opacity group-hover:inline">
                  Attach
                </span>
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
                type="button"
                className={cn(
                  "flex items-center justify-between gap-1 rounded-lg border border-border px-1.5 py-1.5 text-sm transition-colors hover:border-foreground/30 hover:bg-accent/60",
                  value.trim() ? "bg-foreground text-background" : "text-muted-foreground"
                )}
              >
                <ArrowUpIcon
                  className={cn("h-4 w-4", value.trim() ? "text-background" : "text-muted-foreground")}
                />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <ActionButton icon={<ImageIcon className="h-4 w-4" />} label="Clone a Screenshot" />
          <ActionButton icon={<Sigma className="h-4 w-4" />} label="Import from Figma" />
          <ActionButton icon={<FileUp className="h-4 w-4" />} label="Upload a Project" />
          <ActionButton icon={<MonitorIcon className="h-4 w-4" />} label="Landing Page" />
          <ActionButton icon={<CircleUserRound className="h-4 w-4" />} label="Sign Up Form" />
        </div>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}