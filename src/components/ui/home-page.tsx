"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";
import { OniChat } from "./v0-ai-chat";
import type { AuthUser } from "@/lib/auth";
import { ProfileMenu } from "./profile-menu";
import { motion } from "framer-motion";

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

  return readableExtensions.has(extension);
}

function isPdfFile(file: File) {
  return getFileExtension(file.name) === ".pdf";
}

function getFileExtension(filename: string) {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts[parts.length - 1].toLowerCase()}` : "";
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

export function HomePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
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

  // Auto-resize textarea on home page as text changes
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "24px";
    const scrollHeight = textarea.scrollHeight;
    const nextHeight = Math.max(24, Math.min(scrollHeight, 200));
    textarea.style.height = `${nextHeight}px`;
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [promptText, adjustTextareaHeight]);

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

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Morning";
    if (hr < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <AppShell activePage="chats">
      {chatStarted ? (
        <OniChat
          initialPrompt={chatPrompt}
          initialImage={initialImage}
          initialFiles={initialFiles}
          hideSidebar
          forceNewSession
        />
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden bg-surface w-full h-full">
          {/* Ambient monochrome background glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-white/5 to-transparent blur-[130px] mix-blend-screen animate-pulse" style={{ animationDuration: "10s" }} />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-white/3 to-transparent blur-[110px] mix-blend-screen animate-pulse" style={{ animationDuration: "15s" }} />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 max-w-4xl mx-auto w-full mt-[-5vh]">
            {/* Greeting */}
            <div className="flex flex-col items-center text-center gap-2 mb-8 select-none relative z-10 animate-[fadeSlideUp_800ms_cubic-bezier(0.16,1,0.3,1)]">
              <h1 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-text-primary">
                {getGreeting()}, <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">{user?.name || "User"}</span>
              </h1>
              <p className="text-xs text-text-tertiary max-w-sm">
                Describe a website or pick a template card below to generate a custom design instantly.
              </p>
            </div>

            <motion.div
              layoutId="composer-container"
              className="w-full bg-surface-container-low/60 backdrop-blur-md rounded-2xl border border-surface-container-high/70 p-4 flex flex-col gap-3 shadow-lg hover:shadow-xl focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 relative z-10"
            >
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
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => showToast("Voice mode coming soon")}
                    aria-label="Voice mode info"
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
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </button>
                  <button
                    onClick={() => showToast("Voice mode coming soon")}
                    aria-label="Voice mode"
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
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full mt-8 max-w-3xl relative z-10 animate-[fadeSlideUp_900ms_cubic-bezier(0.16,1,0.3,1)]">
              {[
                {
                  title: "Portfolio Site",
                  desc: "For designers & creatives. Features dark theme and custom CSS entry animations.",
                  prompt: "Build a fully responsive portfolio website for a freelance designer with a dark theme, grid-based layout, and custom entrance animations.",
                  icon: "🎨",
                  badge: "Popular"
                },
                {
                  title: "Restaurant Bistro",
                  desc: "Modern bistro layout. Includes food menus, price lists, and a booking modal.",
                  prompt: "Build a premium responsive restaurant website with a dark design, beautiful menu cards, reservation form, and client testimonials.",
                  icon: "🍕"
                },
                {
                  title: "SaaS Dashboard",
                  desc: "Clean analytic dashboard with stats, interactive grids, and sidebar navigation.",
                  prompt: "Build an interactive SaaS dashboard website featuring data grids, analytics widgets, active client stats, and responsive dark panels.",
                  icon: "📈"
                },
                {
                  title: "Personal Blog",
                  desc: "Reader-focused layout featuring grids, elegant typography, and a newsletter sign up.",
                  prompt: "Build a beautiful personal blog landing page with grid article layouts, author bio card, and email newsletter sign up.",
                  icon: "✍️"
                },
                {
                  title: "Agency Landing",
                  desc: "Premium creative shop layout with interactive sections and service highlight grids.",
                  prompt: "Build a responsive creative agency homepage with services grid, clean hero intro, work case studies, and contact form.",
                  icon: "🚀"
                },
                {
                  title: "App Promo Page",
                  desc: "Sleek marketing page for a mobile app showing features, reviews, and call-to-actions.",
                  prompt: "Build a high-converting mobile app landing page showcasing key features, screenshot gallery layout, user testimonials, and store badges.",
                  icon: "📱"
                }
              ].map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => handleQuickAction(card.prompt)}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-surface-container-high/60 bg-surface-container-low/40 hover:bg-surface-container/60 transition-all duration-300 hover:border-primary/40 hover:scale-[1.02] active:scale-[0.98] text-left cursor-pointer shadow-sm hover:shadow-md relative overflow-hidden"
                >
                  {card.badge && (
                    <span className="absolute top-2 right-2 bg-primary/10 text-primary border border-primary/20 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90">
                      {card.badge}
                    </span>
                  )}
                  <div>
                    <span className="text-xl mb-2.5 block select-none group-hover:scale-110 transition-transform origin-left">{card.icon}</span>
                    <p className="text-xs font-semibold text-text-primary group-hover:text-primary transition-colors mb-1">
                      {card.title}
                    </p>
                    <p className="text-[10px] text-text-tertiary leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed right-4 bottom-4 z-50 rounded-xl border border-white/10 bg-zinc-950 bg-opacity-70 backdrop-blur-md px-4 py-3 text-sm text-white shadow-2xl shadow-black/40 toast-glass">
          {toast}
        </div>
      )}
    </AppShell>
  );
}
