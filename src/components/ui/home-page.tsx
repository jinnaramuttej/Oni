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
import { VOX_SAMPLE_HTML } from "@/lib/vox-sample";
import { AME_COFFEE_SAMPLE_HTML } from "@/lib/ame-coffee-sample";
import { VELARA_SAMPLE_HTML } from "@/lib/velara-sample";
import { MOEHR_SAMPLE_HTML } from "@/lib/moehr-sample";
import { MAISON_DORE_SAMPLE_HTML } from "@/lib/maison-dore-sample";

// Map template prompts to their pre-built sample HTML (instant preview, no AI call)
const TEMPLATE_SAMPLES: Record<string, string> = {
  [TEMPLATE_PROMPTS.vox]: VOX_SAMPLE_HTML,
  [TEMPLATE_PROMPTS.ameCoffee]: AME_COFFEE_SAMPLE_HTML,
  [TEMPLATE_PROMPTS.velara]: VELARA_SAMPLE_HTML,
  [TEMPLATE_PROMPTS.moehr]: MOEHR_SAMPLE_HTML,
  [TEMPLATE_PROMPTS.maisonDore]: MAISON_DORE_SAMPLE_HTML,
};

export interface TemplateCardItem {
  id: string;
  fileId?: string;
  title: string;
  desc: string;
  prompt: string;
  image: string;
  badge?: string;
}

const FEATURED_TEMPLATES: TemplateCardItem[] = [
  {
    id: "aurelia",
    fileId: "AURELIA",
    title: "Aurelia Bakehouse",
    desc: "Handcrafted artisan pastries, leavened breads & luxury celebration cakes.",
    prompt: TEMPLATE_PROMPTS.vox,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80&fit=crop",
    badge: "Featured",
  },
  {
    id: "flameslice",
    fileId: "FlameSlice",
    title: "FlameSlice Pizza",
    desc: "Artisan wood-fired pizza & gourmet burgers landing.",
    prompt: TEMPLATE_PROMPTS.vox,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80&fit=crop",
    badge: "New",
  },
  {
    id: "elan",
    fileId: "ÉLAN",
    title: "ÉLAN Atelier",
    desc: "High-fashion luxury atelier, editorial showcase & couture collections.",
    prompt: TEMPLATE_PROMPTS.maisonDore,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&fit=crop",
    badge: "Popular",
  },
  {
    id: "aurelia-spa",
    fileId: "Aurelia-Spa",
    title: "Aurelia Spa & Wellness",
    desc: "Serene clifftop sanctuary, holistic wellness rituals & hydrotherapy.",
    prompt: TEMPLATE_PROMPTS.velara,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80&fit=crop",
    badge: "New",
  },
  {
    id: "halden",
    fileId: "HALDEN",
    title: "HALDEN Architecture",
    desc: "Nordic architectural studio, minimalist residential grid & contact flow.",
    prompt: TEMPLATE_PROMPTS.moehr,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fit=crop",
  },
  {
    id: "vanguard",
    fileId: "Vanguard-Barbar Shop",
    title: "Vanguard Barber Shop",
    desc: "Modern gentlemen's grooming, razor fades & leather lounge.",
    prompt: TEMPLATE_PROMPTS.maisonDore,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80&fit=crop",
  },
  {
    id: "apex-gym",
    fileId: "premium-gym-website-design",
    title: "Apex Fitness Club",
    desc: "High-intensity athletic training, personal coaching & membership tiers.",
    prompt: TEMPLATE_PROMPTS.vox,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80&fit=crop",
  },
  {
    id: "clarity-health",
    fileId: "ClarityHealth",
    title: "Clarity Medical Center",
    desc: "Comprehensive health center, patient portal & specialist care.",
    prompt: TEMPLATE_PROMPTS.vox,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80&fit=crop",
  },
  {
    id: "crumb-crust",
    fileId: "Crumb & Crust",
    title: "Crumb & Crust Bakery",
    desc: "Sourdough bakery, morning espresso bar & pastry catalogue.",
    prompt: TEMPLATE_PROMPTS.ameCoffee,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80&fit=crop",
  },
  {
    id: "pulse",
    fileId: "Pulse",
    title: "Pulse SaaS Metrics",
    desc: "Real-time analytics platform, interactive pricing & live dashboard.",
    prompt: TEMPLATE_PROMPTS.saas,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop",
  },
  {
    id: "sterling",
    fileId: "Sterling",
    title: "Sterling & Partners",
    desc: "Private wealth management, corporate advisory & legal strategy.",
    prompt: TEMPLATE_PROMPTS.vox,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&fit=crop",
  },
  {
    id: "aether",
    fileId: "AETHER",
    title: "AETHER Agency",
    desc: "Creative digital studio, interactive case studies & design systems.",
    prompt: TEMPLATE_PROMPTS.agency,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop",
  },
  {
    id: "apex-academy",
    fileId: "Apex.Academy",
    title: "Apex Academy",
    desc: "Modern online learning platform, video courses & certification.",
    prompt: TEMPLATE_PROMPTS.vox,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80&fit=crop",
  },
  {
    id: "ascend-law",
    fileId: "Ascend&Associates",
    title: "Ascend Law Firm",
    desc: "Global corporate counsel, arbitration & boutique law firm.",
    prompt: TEMPLATE_PROMPTS.vox,
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&q=80&fit=crop",
  },
  {
    id: "lumina",
    fileId: "Lumina",
    title: "Lumina Studio",
    desc: "Dark editorial portfolio, project gallery & contact form.",
    prompt: TEMPLATE_PROMPTS.portfolio,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&q=80&fit=crop",
  },
];

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
  const [chatInitialHtml, setChatInitialHtml] = useState("");
  const [initialImage, setInitialImage] = useState<any | null>(null);
  const [initialFiles, setInitialFiles] = useState<any[]>([]);

  const [attachedImage, setAttachedImage] = useState<any | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceOpen, setEnhanceOpen] = useState(false);
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);

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
          setTemplatesModalOpen(true);
        }
      };

      handleTemplatesNav();

      const handleShowAll = () => setTemplatesModalOpen(true);

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



  const handleSelectTemplateCard = async (card: TemplateCardItem) => {
    setTemplatesModalOpen(false);

    // 1. In-memory sample HTML check
    if (TEMPLATE_SAMPLES[card.prompt]) {
      try { sessionStorage.removeItem("oni_session"); } catch { /* ignore */ }
      setChatInitialHtml(TEMPLATE_SAMPLES[card.prompt]);
      setChatPrompt("");
      setInitialImage(null);
      setInitialFiles([]);
      setChatStarted(true);
      return;
    }

    // 2. Fetch full static HTML from oni-components/full-templates
    if (card.fileId) {
      try {
        const res = await fetch(`/api/templates?name=${encodeURIComponent(card.fileId)}`);
        if (res.ok) {
          const html = await res.text();
          if (html && html.trim().length > 0) {
            try { sessionStorage.removeItem("oni_session"); } catch { /* ignore */ }
            setChatInitialHtml(html);
            setChatPrompt("");
            setInitialImage(null);
            setInitialFiles([]);
            setChatStarted(true);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load template HTML", err);
      }
    }

    // 3. Fallback to setting prompt text into input
    const cleanedText = getCleanedTemplatePrompt(card.prompt);
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
              initialHtml={chatInitialHtml}
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
              <div className="mb-3 flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => setTemplatesModalOpen(true)}
                  className="flex items-center gap-2 group select-none cursor-pointer"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-tertiary group-hover:text-white transition-colors">Templates</p>
                </button>
              </div>

              {/* Main templates (top 3 only) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURED_TEMPLATES.slice(0, 3).map((card, index) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => void handleSelectTemplateCard(card)}
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

              {/* See all button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setTemplatesModalOpen(true)}
                  className="flex items-center gap-2 text-xs text-text-tertiary hover:text-text-secondary transition-colors px-1 py-1"
                >
                  <span>See all templates</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
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

      {/* Templates Full-Screen Modal */}
      <AnimatePresence>
        {templatesModalOpen && (
          <motion.div
            key="templates-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col bg-[#0c0c0c]/95 backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">Templates</p>
              </div>
              <button
                type="button"
                onClick={() => setTemplatesModalOpen(false)}
                aria-label="Close templates"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 text-white/60 hover:text-white transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable grid */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-1">Choose a template</h2>
                <p className="text-sm text-text-tertiary mb-8">Select any template to instantly load it into the preview — then customize with AI in the chat.</p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {FEATURED_TEMPLATES.map((card, index) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => void handleSelectTemplateCard(card)}
                      className="group relative h-44 overflow-hidden rounded-2xl border border-surface-container-high/70 bg-surface-container-low text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-xl active:translate-y-0"
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 6}
                        unoptimized
                        className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
