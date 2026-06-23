"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";
import { OniChat } from "./v0-ai-chat";
import type { AuthUser } from "@/lib/auth";
import { ProfileMenu } from "./profile-menu";

const MAX_FILE_TEXT_CHARS = 24000;
const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_DOCUMENT_TYPES = [
  ".pdf",
  ".md",
  ".markdown",
  ".txt",
  ".csv",
  ".json",
  ".html",
  ".htm",
  ".css",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".xml",
  ".yaml",
  ".yml",
  ".toml",
  ".log",
  ".rtf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
].join(",");
const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml,image/avif";

function isReadableTextFile(file: File) {
  const extension = getFileExtension(file.name);
  const readableExtensions = new Set([
    ".md",
    ".markdown",
    ".txt",
    ".csv",
    ".json",
    ".html",
    ".htm",
    ".css",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".xml",
    ".yaml",
    ".yml",
    ".toml",
    ".log",
    ".rtf",
  ]);

  return file.type.startsWith("text/") || readableExtensions.has(extension) || file.type === "application/json";
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || getFileExtension(file.name) === ".pdf";
}

function getFileExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot === -1 ? "" : fileName.slice(lastDot).toLowerCase();
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

export function HomePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [promptText, setPromptText] = useState("");
  // When chatStarted, show OniChat inline instead of navigating away
  const [chatStarted, setChatStarted] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");
  const [initialImage, setInitialImage] = useState<any | null>(null);
  const [initialFiles, setInitialFiles] = useState<any[]>([]);

  const [attachedImage, setAttachedImage] = useState<any | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const toastTimerRef = useRef<number | null>(null);
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000) as unknown as number;
  };

  const handleVoiceInput = () => {
    if (typeof window === "undefined") return;

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      return;
    }

    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      showToast("Voice input is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognitionRef.current = recognition;
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    let finalTranscript = "";

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      showToast(`Voice input error: ${event.error}`);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onresult = (event: any) => {
      let interimTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0]?.transcript ?? "";
        if (event.results[index].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const transcript = `${finalTranscript}${interimTranscript}`.trim();
      if (!transcript) return;

      setPromptText((prev) => {
        const separator = prev.trim() ? " " : "";
        return `${prev}${separator}${transcript}`;
      });
    };

    recognition.start();
  };

  const setImageFromFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    if (attachedImage) {
      URL.revokeObjectURL(attachedImage.url);
      objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== attachedImage.url);
    }

    const imageUrl = URL.createObjectURL(file);
    objectUrlsRef.current.push(imageUrl);
    setAttachedImage({
      id: createId(),
      name: file.name || "pasted-image.png",
      url: imageUrl,
    });
  };

  const addFilesFromList = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    const nextFiles: any[] = [];

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        setImageFromFile(file);
        continue;
      }

      const attachment: any = {
        id: createId(),
        name: file.name || "untitled-file",
        type: file.type || getFileExtension(file.name).toUpperCase().replace(".", "") || "unknown",
        size: file.size,
      };

      if (file.size > MAX_FILE_SIZE_BYTES) {
        attachment.note = `File is ${formatBytes(file.size)}, over the ${formatBytes(MAX_FILE_SIZE_BYTES)} text-reading limit.`;
      } else if (isReadableTextFile(file)) {
        const text = await file.text();
        attachment.content =
          text.length > MAX_FILE_TEXT_CHARS
            ? `${text.slice(0, MAX_FILE_TEXT_CHARS)}\n...[truncated after ${MAX_FILE_TEXT_CHARS} characters]`
            : text;
      } else if (isPdfFile(file)) {
        attachment.note = "PDF attached. Browser-side PDF text extraction is not available in this build, so only file metadata will be sent.";
      } else {
        attachment.note = "Binary document attached. Only file metadata will be sent.";
      }

      nextFiles.push(attachment);
    }

    if (nextFiles.length > 0) {
      setAttachedFiles((current) => [...current, ...nextFiles]);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      void addFilesFromList(files);
    }
    event.target.value = "";
  };

  const removeAttachedImage = () => {
    if (!attachedImage) return;
    URL.revokeObjectURL(attachedImage.url);
    objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== attachedImage.url);
    setAttachedImage(null);
  };

  const removeAttachedFile = (id: string) => {
    setAttachedFiles((current) => current.filter((file) => file.id !== id));
  };

  const handleQuickAction = (text: string) => {
    setPromptText(text);
    // Ensure the textarea is focused and the cursor is placed at the end
    window.setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = text.length;
        textareaRef.current.selectionEnd = text.length;
      }
    }, 50);
  };

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("oni_session");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.id && Array.isArray(parsed?.messages) && parsed.messages.length > 0) {
          setChatStarted(true);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const handleSend = () => {
    const text = promptText.trim();
    if (!text && !attachedImage && attachedFiles.length === 0) return;
    // Clear sessionStorage so OniChat starts a fresh session for this prompt
    try { sessionStorage.removeItem("oni_session"); } catch { /* ignore */ }
    setChatPrompt(text);
    setInitialImage(attachedImage);
    setInitialFiles(attachedFiles);
    setChatStarted(true);

    // Clear local inputs
    setPromptText("");
    setAttachedImage(null);
    setAttachedFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me")
      .then(async (response) => {
        if (!response.ok) return null;
        const data = (await response.json().catch(() => null)) as { user?: AuthUser | null } | null;
        return data?.user ?? null;
      })
      .then((nextUser) => {
        if (active) setUser(nextUser);
      })
      .catch(() => {
        if (active) setUser(null);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/signin";
  };

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Morning";
    if (hr < 17) return "Afternoon";
    return "Evening";
  };

  // When chat is started inline, show OniChat inside AppShell (sidebar stays put)
  if (chatStarted) {
    return (
      <AppShell activePage="chats">
        <OniChat
          initialPrompt={chatPrompt}
          initialImage={initialImage}
          initialFiles={initialFiles}
          hideSidebar
        />
      </AppShell>
    );
  }

  return (
    <AppShell activePage="chats">
      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Optional left aligned elements */}
        </div>
        <div className="flex items-center gap-4 pointer-events-auto relative">
          <div className="text-xs text-text-tertiary px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-container-high hidden md:flex items-center gap-1">
            <span>Free plan</span>
            <span className="text-text-secondary px-1">·</span>
            <button className="text-primary hover:underline font-medium bg-transparent border-none cursor-pointer">
              Upgrade
            </button>
          </div>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Profile Settings"
            className="w-8 h-8 rounded-full border border-surface-container-highest flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          {profileOpen && (
            <ProfileMenu
              user={user}
              onClose={() => setProfileOpen(false)}
              onLogout={handleLogout}
              className="top-full right-0 mt-1"
            />
          )}
        </div>
      </header>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 max-w-4xl mx-auto w-full mt-[-10vh]">
        {/* Greeting */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl md:text-3xl font-sans font-semibold text-primary tracking-wide">
            {getGreeting()}, {user?.name || "User"}
          </h1>
        </div>

        {/* Input Area */}
        <div className="w-full bg-surface-container-low rounded-2xl border border-surface-container-high p-4 flex flex-col gap-3 shadow-sm input-focus-ring transition-all">
          <input
            ref={fileInputRef}
            type="file"
            accept={`${ACCEPTED_DOCUMENT_TYPES},${ACCEPTED_IMAGE_TYPES}`}
            multiple
            className="hidden"
            onChange={handleFileInputChange}
          />
          
          {(attachedImage || attachedFiles.length > 0) && (
            <div className="border-b border-surface-container-high pb-3">
              <div className="flex flex-wrap gap-2">
                {attachedImage && (
                  <div className="group relative h-14 w-14 overflow-hidden rounded-xl border border-surface-container-high bg-surface-container-low">
                    <Image
                      src={attachedImage.url}
                      alt={attachedImage.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeAttachedImage}
                      className="absolute -right-1 -top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black group-hover:flex"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}

                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="group relative flex h-14 w-36 items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low px-3"
                  >
                    <FileText className="h-5 w-5 shrink-0 text-text-secondary" />
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-xs font-medium text-text-primary">{file.name}</p>
                      <p className="text-[10px] text-text-tertiary">{formatBytes(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachedFile(file.id)}
                      className="absolute -right-1 -top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black group-hover:flex"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative pr-12">
            <textarea
              ref={textareaRef}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none text-primary placeholder-text-tertiary resize-none focus:ring-0 focus:outline-none p-0 text-sm leading-6"
              placeholder="How can I help you today?"
              rows={1}
              style={{ minHeight: "24px" }}
            />
            <button
              onClick={handleSend}
              disabled={!promptText.trim() && !attachedImage && attachedFiles.length === 0}
              aria-label="Send message"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors animate-all"
              style={{
                background: (promptText.trim() || attachedImage || attachedFiles.length > 0) ? "white" : "rgba(255,255,255,0.1)",
                color: (promptText.trim() || attachedImage || attachedFiles.length > 0) ? "black" : "rgba(255,255,255,0.3)",
                cursor: (promptText.trim() || attachedImage || attachedFiles.length > 0) ? "pointer" : "not-allowed",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Add attachment"
              className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
            >
              <svg
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-container transition-colors text-xs font-medium cursor-pointer">
                <span>Oni 4.6</span>
                <span className="text-text-tertiary ml-1">Medium</span>
                <svg
                  fill="none"
                  height="12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <button
                onClick={handleVoiceInput}
                aria-label="Voice input"
                className={cn(
                  "p-1.5 rounded-md transition-all cursor-pointer",
                  isListening
                    ? "bg-red-500/20 text-red-400 animate-pulse hover:bg-red-500/30"
                    : "text-text-secondary hover:text-primary hover:bg-surface-container"
                )}
              >
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </button>
              <button
                onClick={() => { window.location.href = "/settings"; }}
                aria-label="Settings"
                className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 12h4l2-9 4 18 2-9h6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          <button
            onClick={() => handleQuickAction("Build a fully responsive portfolio website for a freelance designer with a dark theme and custom animations.")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-xs font-medium cursor-pointer"
          >
            <svg
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Code
          </button>
          <button
            onClick={() => handleQuickAction("Outline a step-by-step strategy to launch my new mobile app product within the next 3 hours.")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-xs font-medium cursor-pointer"
          >
            <svg
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            Strategize
          </button>
          <button
            onClick={() => handleQuickAction("Create an educational website for learning web design with interactive layout guides and tutorial steps.")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-xs font-medium cursor-pointer"
          >
            <svg
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Learn
          </button>
          <button
            onClick={() => handleQuickAction("Build a clean, minimalist personal blog website layout featuring articles, tags, and a newsletter signup form.")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-xs font-medium cursor-pointer"
          >
            <svg
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
            Write
          </button>
          <button
            onClick={() => handleQuickAction("I haven't been feeling very well lately, both mentally and physically. Can you suggest some positive daily habits and routines to help me recover?")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high border border-surface-container-highest hover:bg-surface-container-highest transition-colors text-text-secondary hover:text-primary text-xs font-medium cursor-pointer"
          >
            <svg
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
              <line x1="6" x2="6" y1="2" y2="4"></line>
              <line x1="10" x2="10" y1="2" y2="4"></line>
              <line x1="14" x2="14" y1="2" y2="4"></line>
            </svg>
            Life stuff
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed right-4 bottom-4 z-50 rounded-xl border border-white/10 bg-zinc-950 bg-opacity-70 backdrop-blur-md px-4 py-3 text-sm text-white shadow-2xl shadow-black/40 toast-glass">
          {toast}
        </div>
      )}
    </AppShell>
  );
}
