"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, FileText, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";
import { OniChat, EnhanceModal, isTemplateOrDetailedPrompt } from "./v0-ai-chat";
import type { AuthUser } from "@/lib/auth";
import { ProfileMenu } from "./profile-menu";
import { motion, AnimatePresence } from "framer-motion";
import { TEMPLATE_PROMPTS, TEMPLATE_KEYWORDS } from "@/lib/template-prompts";

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
    ".md", ".markdown", ".txt", ".csv", ".json", ".html", ".htm",
    ".css", ".js", ".jsx", ".ts", ".tsx", ".xml", ".yaml", ".yml",
    ".toml", ".log", ".rtf",
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

// Label map for the template upgrade suggestion chip
const TEMPLATE_LABELS: Record<string, { title: string; desc: string }> = {
  velara:         { title: "Velara Retreat",       desc: "Clifftop hotel, editorial rooms, deep navy and gold." },
  vox:            { title: "Vox Restaurant",       desc: "Fine dining, steak hero, menu tabs, reservations." },
  moehr:          { title: "Moehr Atelier",        desc: "Architecture studio, manifesto, project grid." },
  maisonDore:     { title: "Maison Doré",          desc: "Hair atelier, couture hero, marquee services." },
  ameCoffee:      { title: "Âme Coffee Atelier",   desc: "Specialty coffee, farm origins, copper editorial." },
  foliantLibrary: { title: "Foliant & Sons",       desc: "Antiquarian bookshop, parchment, rare catalogue." },
  portfolio:      { title: "Studio Portfolio",     desc: "Dark portfolio, selected work grid, case studies." },
  bistro:         { title: "Bistro Booking",       desc: "Warm restaurant, menu, reservations." },
  saas:           { title: "SaaS Dashboard",       desc: "Software landing, metrics, pricing." },
  blog:           { title: "Personal Blog",        desc: "Editorial hero, articles, author bio." },
  agency:         { title: "Agency Landing",       desc: "Bold hero, services, case studies." },
  app:            { title: "App Promo",            desc: "Sleek app marketing, features, store CTAs." },
};

function getCleanedTemplatePrompt(rawPrompt: string): string {
  if (!rawPrompt) return "";
  const lines = rawPrompt.split("\n");
  if (lines.length > 0 && lines[0].toUpperCase().startsWith("TEMPLATE:")) {
    return lines.slice(1).join("\n").trim();
  }
  return rawPrompt.trim();
}

export function HomePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [promptText, setPromptText] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");
  const [initialImage, setInitialImage] = useState<any | null>(null);
  const [initialFiles, setInitialFiles] = useState<any[]>([]);

  const [attachedImage, setAttachedImage] = useState<any | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceOpen, setEnhanceOpen] = useState(false);
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const toastTimerRef = useRef<number | null>(null);
  const objectUrlsRef = useRef<string[]>([]);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "26px";
    const scrollHeight = textarea.scrollHeight;
    const nextHeight = Math.max(26, Math.min(scrollHeight, 200));
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleTemplatesNav = () => {
        if (window.location.hash === "#templates" || window.location.search.includes("templates")) {
          setShowAllTemplates(true);
          setTimeout(() => {
            const el = document.getElementById("templates");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      };

      handleTemplatesNav();

      const handleShowAll = () => {
        setShowAllTemplates(true);
        setTimeout(() => {
          const el = document.getElementById("templates");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      };

      window.addEventListener("hashchange", handleTemplatesNav);
      window.addEventListener("show-all-templates", handleShowAll);

      return () => {
        window.removeEventListener("hashchange", handleTemplatesNav);
        window.removeEventListener("show-all-templates", handleShowAll);
      };
    }
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000) as unknown as number;
  };

  const handleVoiceInput = () => {
    if (typeof window === "undefined") return;
    if (recognitionRef.current && isListening) { recognitionRef.current.stop(); return; }
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionConstructor) { showToast("Voice input is not supported in this browser"); return; }
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
    recognition.onend = () => { setIsListening(false); recognitionRef.current = null; };
    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0]?.transcript ?? "";
        if (event.results[index].isFinal) finalTranscript += transcript;
        else interimTranscript += transcript;
      }
      const transcript = `${finalTranscript}${interimTranscript}`.trim();
      if (!transcript) return;
      setPromptText((prev) => { const separator = prev.trim() ? " " : ""; return `${prev}${separator}${transcript}`; });
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
    setAttachedImage({ id: createId(), name: file.name || "pasted-image.png", url: imageUrl, file });
  };

  const addFilesFromList = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    const nextFiles: any[] = [];
    for (const file of files) {
      if (file.type.startsWith("image/")) { setImageFromFile(file); continue; }
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
        attachment.content = text.length > MAX_FILE_TEXT_CHARS
          ? `${text.slice(0, MAX_FILE_TEXT_CHARS)}\n...[truncated after ${MAX_FILE_TEXT_CHARS} characters]`
          : text;
      } else if (isPdfFile(file)) {
        attachment.note = "PDF attached. Browser-side PDF text extraction is not available in this build, so only file metadata will be sent.";
      } else {
        attachment.note = "Binary document attached. Only file metadata will be sent.";
      }
      nextFiles.push(attachment);
    }
    if (nextFiles.length > 0) setAttachedFiles((current) => [...current, ...nextFiles]);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) void addFilesFromList(files);
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
    const cleanedText = getCleanedTemplatePrompt(text);
    setPromptText(cleanedText);
    window.setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = cleanedText.length;
        textareaRef.current.selectionEnd = cleanedText.length;
      }
    }, 50);
  };

  const handleSend = () => {
    const text = promptText.trim();
    if (!text && !attachedImage && attachedFiles.length === 0) return;
    try { sessionStorage.removeItem("oni_session"); } catch { /* ignore */ }
    setChatPrompt(text);
    setInitialImage(attachedImage);
    setInitialFiles(attachedFiles);
    setChatStarted(true);
    setPromptText("");
    setAttachedImage(null);
    setAttachedFiles([]);
  };

  const handleEnhancePrompt = () => {
    if (!promptText.trim() || promptText.trim().length < 3) return;
    setEnhanceOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === "Enter" || e.keyCode === 13) && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  // Fetch the logged-in user
  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        const data = (await response.json().catch(() => null)) as { user?: AuthUser | null } | null;
        return data?.user ?? null;
      })
      .then((nextUser) => { if (active) setUser(nextUser); })
      .catch(() => { if (active) setUser(null); });
    return () => { active = false; };
  }, []);

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Morning";
    if (hr < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <AppShell activePage="chats">
      <AnimatePresence mode="wait">
        {chatStarted ? (
          <motion.div
            key="chat-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col flex-1"
          >
            <OniChat
              initialPrompt={chatPrompt}
              initialImage={initialImage}
              initialFiles={initialFiles}
              hideSidebar
              forceNewSession
            />
          </motion.div>
        ) : (
          <motion.div
            key="home-screen"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center items-center relative overflow-y-auto bg-surface w-full h-full py-16 px-4 md:px-8"
          >
          {/* Ambient monochrome background glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-white/5 to-transparent blur-[130px] mix-blend-screen animate-pulse" style={{ animationDuration: "10s" }} />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-white/3 to-transparent blur-[110px] mix-blend-screen animate-pulse" style={{ animationDuration: "15s" }} />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
            {/* Greeting */}
            <div className="flex flex-col items-center text-center mb-6 select-none relative z-10 animate-[fadeSlideUp_800ms_cubic-bezier(0.16,1,0.3,1)]">
              <h1 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-text-primary">
                {getGreeting()}, <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">{user?.name || "User"}</span>
              </h1>
            </div>

            <motion.div
              layoutId="composer-container"
              transition={{ type: "spring", stiffness: 450, damping: 40 }}
              className="w-full max-w-2xl bg-surface-container-low/60 backdrop-blur-md rounded-2xl border border-surface-container-high/70 p-4 flex flex-col gap-3 shadow-lg hover:shadow-xl focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-[border-color,box-shadow,background-color] duration-300 relative z-10"
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
                        <Image src={attachedImage.url} alt={attachedImage.name} fill className="object-cover" />
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

              <div className="w-full">
                <textarea
                  ref={textareaRef}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none text-primary placeholder-text-tertiary resize-none focus:ring-0 focus:outline-none p-0 text-base leading-relaxed"
                  placeholder="How can I help you today?"
                  rows={1}
                  style={{ minHeight: "26px" }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Add attachment"
                  className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                     <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !promptText.trim() || promptText.trim().length < 3}
                    aria-label="Enhance prompt"
                    className={cn(
                      "p-1.5 rounded-md transition-colors cursor-pointer flex items-center justify-center",
                      isEnhancing
                        ? "text-primary bg-surface-container-high"
                        : "text-text-secondary hover:text-primary hover:bg-surface-container",
                      (!promptText.trim() || promptText.trim().length < 3) && "cursor-not-allowed opacity-30"
                    )}
                    title="Enhance prompt"
                  >
                    {isEnhancing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => showToast("Voice mode coming soon")}
                    aria-label="Voice mode info"
                    className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
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
                    <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12h4l2-9 4 18 2-9h6"></path>
                    </svg>
                  </button>

                  <button
                    onClick={handleSend}
                    disabled={!promptText.trim() && !attachedImage && attachedFiles.length === 0}
                    aria-label="Send message"
                    className="ml-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      background: (promptText.trim() || attachedImage || attachedFiles.length > 0) ? "white" : "rgba(255,255,255,0.08)",
                      color: (promptText.trim() || attachedImage || attachedFiles.length > 0) ? "black" : "rgba(255,255,255,0.3)",
                      cursor: (promptText.trim() || attachedImage || attachedFiles.length > 0) ? "pointer" : "not-allowed",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Templates section */}
            <div id="templates" className="w-full mt-12 max-w-4xl relative z-10 animate-[fadeSlideUp_900ms_cubic-bezier(0.16,1,0.3,1)]">
              <div 
                className="mb-3 flex items-center justify-between px-1 cursor-pointer group select-none"
                onClick={() => setShowAllTemplates((v) => !v)}
              >
                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-tertiary group-hover:text-white transition-colors">Templates</p>
                  <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full font-medium">12 Available</span>
                </div>
                <p className="text-xs text-text-tertiary group-hover:text-text-secondary transition-colors">
                  {showAllTemplates ? "Showing all 12 templates (click to collapse)" : "Click to view all 12 templates →"}
                </p>
              </div>

              {/* Main templates (top 3 only) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Âme Coffee",
                    desc: "Specialty coffee atelier, farm origins, copper editorial.",
                    prompt: TEMPLATE_PROMPTS.ameCoffee,
                    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80&fit=crop",
                    badge: "Featured",
                  },
                  {
                    title: "Vox Restaurant",
                    desc: "Fine dining, steak hero, menu tabs, and reservations.",
                    prompt: TEMPLATE_PROMPTS.vox,
                    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=80&fit=crop",
                    badge: "New",
                  },
                  {
                    title: "Moehr Atelier",
                    desc: "Architecture studio, manifesto, project grid, and refined contact flow.",
                    prompt: TEMPLATE_PROMPTS.moehr,
                    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fit=crop",
                    badge: "New",
                  },
                ].map((card, index) => (
                  <button
                    key={card.title}
                    type="button"
                    onClick={() => handleQuickAction(card.prompt)}
                    className="group relative h-40 overflow-hidden rounded-2xl border border-surface-container-high/70 bg-surface-container-low text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl active:translate-y-0"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                      unoptimized
                      className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/5" />
                    {card.badge && (
                      <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white/80 backdrop-blur">
                        {card.badge}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-sm font-semibold text-white">{card.title}</p>
                      <p className="mt-1 text-[11px] leading-4 text-white/65">{card.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* See All expandable section */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowAllTemplates((v) => !v)}
                  className="flex items-center gap-2 text-xs text-text-tertiary hover:text-text-secondary transition-colors px-1 py-1"
                >
                  <span>{showAllTemplates ? "Show less" : "See all templates"}</span>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-300 ${showAllTemplates ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {showAllTemplates && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 animate-[fadeSlideUp_300ms_ease]">
                    {[
                      {
                        title: "Maison Doré",
                        desc: "Hair atelier, couture hero, marquee services, and booking flow.",
                        prompt: TEMPLATE_PROMPTS.maisonDore,
                        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80&fit=crop",
                      },
                      {
                        title: "Velara Retreat",
                        desc: "Clifftop hotel, editorial rooms, deep navy and gold.",
                        prompt: TEMPLATE_PROMPTS.velara,
                        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80&fit=crop",
                      },
                      {
                        title: "Foliant & Sons",
                        desc: "Antiquarian bookshop, parchment palette, rare catalogue.",
                        prompt: TEMPLATE_PROMPTS.foliantLibrary,
                        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80&fit=crop",
                      },
                      {
                        title: "Studio Portfolio",
                        desc: "Dark portfolio, selected work grid, case studies.",
                        prompt: TEMPLATE_PROMPTS.portfolio,
                        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80&fit=crop",
                      },
                      {
                        title: "Bistro Booking",
                        desc: "Warm restaurant, seasonal menu, and reservations.",
                        prompt: TEMPLATE_PROMPTS.bistro,
                        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop",
                      },
                      {
                        title: "SaaS Dashboard",
                        desc: "Software landing, metrics panels, and pricing.",
                        prompt: TEMPLATE_PROMPTS.saas,
                        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop",
                      },
                      {
                        title: "Personal Blog",
                        desc: "Editorial hero, featured articles, and author bio.",
                        prompt: TEMPLATE_PROMPTS.blog,
                        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80&fit=crop",
                      },
                      {
                        title: "Agency Landing",
                        desc: "Bold hero, services grid, case studies, contact.",
                        prompt: TEMPLATE_PROMPTS.agency,
                        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop",
                      },
                      {
                        title: "App Promo",
                        desc: "Sleek app marketing, features, store CTAs.",
                        prompt: TEMPLATE_PROMPTS.app,
                        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&fit=crop",
                      },
                    ].map((card) => (
                      <button
                        key={card.title}
                        type="button"
                        onClick={() => handleQuickAction(card.prompt)}
                        className="group relative h-36 overflow-hidden rounded-xl border border-surface-container-high/60 bg-surface-container-low text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg active:translate-y-0"
                      >
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                          className="object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="text-sm font-semibold text-white">{card.title}</p>
                          <p className="mt-0.5 text-[11px] leading-4 text-white/60">{card.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
            </div>
          </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {toast && (
        <div className="fixed right-4 bottom-4 z-50 rounded-xl border border-white/10 bg-zinc-950 bg-opacity-70 backdrop-blur-md px-4 py-3 text-sm text-white shadow-2xl shadow-black/40 toast-glass">
          {toast}
        </div>
      )}

      <EnhanceModal
        isOpen={enhanceOpen}
        onClose={() => setEnhanceOpen(false)}
        originalPrompt={promptText}
        onEnhanced={(enhanced, answers) => {
          setPromptText(enhanced);
          setEnhanceOpen(false);
          window.requestAnimationFrame(() => adjustTextareaHeight());
        }}
      />
    </AppShell>
  );
}
