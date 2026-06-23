"use client";

import Image from "next/image";
import {
  ArrowUpIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  ImageIcon,
  Laptop,
  MessageSquare,
  Mic,
  Monitor,
  Paperclip,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type BrowserSpeechRecognitionResult = {
  isFinal: boolean;
  0?: { transcript?: string };
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onresult: ((event: { resultIndex: number; results: ArrayLike<BrowserSpeechRecognitionResult> }) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type ImageAttachment = {
  id: string;
  name: string;
  url: string;
};

type FileAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  note?: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: ImageAttachment;
  files?: FileAttachment[];
  thought?: string;
};

type StoredConversation = {
  id: string;
  title: string;
  updatedAt: number;
};

const STORAGE_KEY = "oni_conversations";
const SESSION_KEY = "oni_session";
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

type EditorTab = "preview" | "code";
type PreviewSize = "desktop" | "tablet" | "mobile";
type MobilePanel = "chat" | "preview" | "code";

type ProjectFile = {
  path: string;
  label: string;
  language: string;
  content: string;
};

const initialMessages: ChatMessage[] = [];

const previewSizeClasses: Record<PreviewSize, string> = {
  desktop: "w-full",
  tablet: "w-[820px] max-w-full",
  mobile: "w-[390px] max-w-full",
};

const previewSizeLabels: { value: PreviewSize; label: string; icon: typeof Monitor }[] = [
  { value: "desktop", label: "Desktop", icon: Monitor },
  { value: "tablet", label: "Tablet", icon: Tablet },
  { value: "mobile", label: "Mobile", icon: Smartphone },
];

const mobileTabs: { value: MobilePanel; label: string; icon: typeof MessageSquare }[] = [
  { value: "chat", label: "Chat", icon: MessageSquare },
  { value: "preview", label: "Preview", icon: Eye },
  { value: "code", label: "Code", icon: Code2 },
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

const VISITOR_ID_KEY = "oni_visitor_id";

function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function OniChat({
  initialPrompt = "",
  initialImage = null,
  initialFiles = [],
  chatId,
  hideSidebar = false,
}: {
  initialPrompt?: string;
  initialImage?: ImageAttachment | null;
  initialFiles?: FileAttachment[];
  chatId?: string;
  hideSidebar?: boolean;
}) {
  const [input, setInput] = useState("");
  // Restore messages and conversationId from sessionStorage or localStorage so refresh/navigation stays in same chat
  const [conversationId, setConversationId] = useState<string>(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { id?: string };
          if (parsed?.id) return parsed.id;
        }
      } catch { /* ignore */ }
      return chatId;
    }
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { id?: string };
        if (parsed?.id) return parsed.id;
      }
    } catch { /* ignore */ }
    const newId = createId();
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: newId, messages: [] })); } catch { /* ignore */ }
    return newId;
  });
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
          if (Array.isArray(parsed?.messages)) return parsed.messages;
        }
      } catch { /* ignore */ }
      return [];
    }
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
        if (Array.isArray(parsed?.messages) && parsed.messages.length > 0) {
          return parsed.messages;
        }
      }
    } catch { /* ignore */ }
    return initialMessages;
  });
  const [attachedImage, setAttachedImage] = useState<ImageAttachment | null>(initialImage);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>(initialFiles);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editorTab, setEditorTab] = useState<EditorTab>("preview");
  const [previewSize, setPreviewSize] = useState<PreviewSize>("desktop");
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("chat");
  const [activeFilePath, setActiveFilePath] = useState("index.html");
  const [generatedHtml, setGeneratedHtml] = useState<string>(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { generatedHtml?: string };
          if (parsed?.generatedHtml) return parsed.generatedHtml;
        }
      } catch { /* ignore */ }
      return "";
    }
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { generatedHtml?: string };
        if (parsed?.generatedHtml) return parsed.generatedHtml;
      }
    } catch { /* ignore */ }
    return "";
  });
  const [toast, setToast] = useState<string | null>(null);
  const [oniSettings, setOniSettings] = useState({
    displayName: "Oni User",
    billingPlan: "pro",
    chatFont: "inter",
    compactMode: false,
    defaultModel: "oni-pro"
  });
  const [pinnedChatsList, setPinnedChatsList] = useState<string[]>([]);
  const [sortMethod, setSortMethod] = useState("date_desc");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Sync pins and sort settings
  useEffect(() => {
    const loadPinsAndSort = () => {
      try {
        const savedPins = localStorage.getItem("oni_pins");
        if (savedPins) setPinnedChatsList(JSON.parse(savedPins));
        else setPinnedChatsList([]);
      } catch {
        setPinnedChatsList([]);
      }
      try {
        const savedSort = localStorage.getItem("oni_recent_sort");
        if (savedSort) setSortMethod(savedSort);
        else setSortMethod("date_desc");
      } catch {
        setSortMethod("date_desc");
      }
    };
    loadPinsAndSort();
    window.addEventListener("storage", loadPinsAndSort);
    window.addEventListener("oni_pins_change", loadPinsAndSort);
    window.addEventListener("oni_sort_change", loadPinsAndSort);
    return () => {
      window.removeEventListener("storage", loadPinsAndSort);
      window.removeEventListener("oni_pins_change", loadPinsAndSort);
      window.removeEventListener("oni_sort_change", loadPinsAndSort);
    };
  }, []);

  const togglePin = (chatId: string) => {
    try {
      const savedPins = localStorage.getItem("oni_pins");
      let currentPins: string[] = savedPins ? JSON.parse(savedPins) : [];
      
      if (currentPins.includes(chatId)) {
        currentPins = currentPins.filter(id => id !== chatId);
        setToast("Chat unpinned");
      } else {
        if (currentPins.length >= 3) {
          setToast("Maximum of 3 pinned chats allowed");
          return;
        }
        currentPins.push(chatId);
        setToast("Chat pinned to top");
      }
      
      localStorage.setItem("oni_pins", JSON.stringify(currentPins));
      window.dispatchEvent(new Event("oni_pins_change"));
    } catch (e) {
      console.error(e);
    }
  };

  const getSortedChats = () => {
    const pinned = recentChats.filter(c => pinnedChatsList.includes(c.id));
    const unpinned = recentChats.filter(c => !pinnedChatsList.includes(c.id));

    const sortFn = (a: StoredConversation, b: StoredConversation) => {
      if (sortMethod === "date_desc") {
        return b.updatedAt - a.updatedAt;
      } else if (sortMethod === "date_asc") {
        return a.updatedAt - b.updatedAt;
      } else if (sortMethod === "name_asc") {
        return a.title.localeCompare(b.title);
      } else if (sortMethod === "name_desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    };

    pinned.sort(sortFn);
    unpinned.sort(sortFn);

    return [...pinned, ...unpinned];
  };

  const sortedRecentChats = getSortedChats();

  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem("oni_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          setOniSettings({
            displayName: parsed.displayName || "Oni User",
            billingPlan: parsed.billingPlan || "pro",
            chatFont: parsed.chatFont || "inter",
            compactMode: !!parsed.compactMode,
            defaultModel: parsed.defaultModel || "oni-pro"
          });
        }
      } catch (e) {
        // ignore
      }
    };
    loadSettings();
    window.addEventListener("storage", loadSettings);
    window.addEventListener("oni_settings_change", loadSettings);
    return () => {
      window.removeEventListener("storage", loadSettings);
      window.removeEventListener("oni_settings_change", loadSettings);
    };
  }, []);
  const [hasStarted, setHasStarted] = useState(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
          return Array.isArray(parsed?.messages) && parsed.messages.length > 0;
        }
      } catch { /* ignore */ }
      return false;
    }
    // If messages were restored from session, we've already started
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
        return Array.isArray(parsed?.messages) && parsed.messages.length > 0;
      }
    } catch { /* ignore */ }
    return false;
  });
  const [navOpen, setNavOpen] = useState(false);
  const [chatPanelOpen, setChatPanelOpen] = useState(true);
  const [recentChats, setRecentChats] = useState<StoredConversation[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 150,
    maxHeight: 300,
  });

  // Load recent conversations from Supabase/server history on mount
  useEffect(() => {
    // 1. Try local storage first for immediate UI display
    let localRecent: StoredConversation[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        localRecent = JSON.parse(raw) as StoredConversation[];
        setRecentChats(localRecent);
      }
    } catch { /* ignore */ }

    // 2. Fetch from server and sync
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;

    fetch("/api/chat/history", {
      headers: { "x-visitor-id": visitorId }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recent chats");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.conversations)) {
          setRecentChats(data.conversations);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.conversations));
          } catch { }

          // Sync any local chats that are missing from the server
          localRecent.forEach((localChat) => {
            const exists = data.conversations.some((c: any) => c.id === localChat.id);
            if (!exists) {
              try {
                const chatRaw = localStorage.getItem(`oni_chat_${localChat.id}`);
                if (chatRaw) {
                  const parsed = JSON.parse(chatRaw);
                  fetch("/api/chat/history", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-visitor-id": visitorId,
                    },
                    body: JSON.stringify({
                      id: localChat.id,
                      title: localChat.title,
                      messages: parsed.messages,
                      generatedHtml: parsed.generatedHtml,
                    }),
                  }).catch(console.error);
                }
              } catch { }
            }
          });
        }
      })
      .catch((err) => console.error("Error syncing recent chats:", err));
  }, []);

  // Listen to chatId updates (e.g. clicking different recent chats)
  useEffect(() => {
    if (!chatId) return;
    
    // 1. Try local storage first (instant UI transition)
    let localData: any = null;
    try {
      const raw = localStorage.getItem(`oni_chat_${chatId}`);
      if (raw) {
        localData = JSON.parse(raw);
        setConversationId(localData.id || chatId);
        setMessages(localData.messages || []);
        setGeneratedHtml(localData.generatedHtml || "");
        setHasStarted(Array.isArray(localData.messages) && localData.messages.length > 0);
      }
    } catch { /* ignore */ }

    // 2. Fetch from server to sync/verify
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;

    fetch(`/api/chat/history?id=${chatId}`, {
      headers: { "x-visitor-id": visitorId }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch conversation");
        return res.json();
      })
      .then((data) => {
        setConversationId(data.id || chatId);
        setMessages(data.messages || []);
        setGeneratedHtml(data.generatedHtml || "");
        setHasStarted(Array.isArray(data.messages) && data.messages.length > 0);
        
        try {
          localStorage.setItem(`oni_chat_${chatId}`, JSON.stringify(data));
        } catch { }
      })
      .catch((err) => {
        console.error("Error loading chat from server:", err);
        // If server failed or chat doesn't exist on server but we have local, push it to server
        if (localData) {
          fetch("/api/chat/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-visitor-id": visitorId
            },
            body: JSON.stringify({
              id: chatId,
              title: localData.title || "Restored Chat",
              messages: localData.messages,
              generatedHtml: localData.generatedHtml
            })
          }).catch(console.error);
        } else {
          // No local data and failed to load, initialize empty
          setConversationId(chatId);
          setMessages([]);
          setGeneratedHtml("");
          setHasStarted(false);
        }
      });
  }, [chatId]);

  // Derive conversation title from first user message
  const conversationTitle = useMemo(() => {
    const firstUser = messages.find((m) => m.role === "user");
    if (!firstUser?.content) return null;
    return firstUser.content.length > 40
      ? firstUser.content.slice(0, 40).trimEnd() + "…"
      : firstUser.content;
  }, [messages]);

  // Persist messages + id + generatedHtml to sessionStorage, localStorage, and Supabase server
  useEffect(() => {
    // 1. Instant local save
    try {
      const data = { id: conversationId, messages, generatedHtml };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
      localStorage.setItem(`oni_chat_${conversationId}`, JSON.stringify(data));
    } catch { /* ignore */ }

    // 2. Debounced server save
    if (!conversationId || messages.length === 0) return;

    const timer = setTimeout(() => {
      const visitorId = getOrCreateVisitorId();
      if (!visitorId) return;

      fetch("/api/chat/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-visitor-id": visitorId,
        },
        body: JSON.stringify({
          id: conversationId,
          title: conversationTitle || "New Chat",
          messages,
          generatedHtml,
        }),
      }).catch((err) => console.error("Failed to sync to server:", err));
    }, 1500); // 1.5 seconds debounce

    return () => clearTimeout(timer);
  }, [messages, conversationId, generatedHtml, conversationTitle]);

  // Save/update current conversation in localStorage whenever title changes
  useEffect(() => {
    if (!conversationTitle) return;
    setRecentChats((prev) => {
      const existing = prev.find((c) => c.id === conversationId);
      const entry: StoredConversation = {
        id: conversationId,
        title: conversationTitle,
        updatedAt: Date.now(),
      };
      const next = existing
        ? prev.map((c) => (c.id === conversationId ? entry : c))
        : [entry, ...prev];
      // keep most-recent 20
      const trimmed = next.slice(0, 20);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed)); } catch { /* ignore */ }
      return trimmed;
    });
  }, [conversationTitle, conversationId]);

  const projectFiles = useMemo(() => buildProjectFiles(generatedHtml), [generatedHtml]);
  const activeFile = projectFiles.find((file) => file.path === activeFilePath) ?? projectFiles[0];
  const previewHtml = generatedHtml;

  const showToast = useCallback((message: string) => {
    setToast(message);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2400);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, generating]);


  const setImageFromFile = useCallback(
    (file: File) => {
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
      setMobilePanel("chat");
    },
    [attachedImage]
  );

  const removeAttachedImage = useCallback(() => {
    if (!attachedImage) return;

    URL.revokeObjectURL(attachedImage.url);
    objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== attachedImage.url);
    setAttachedImage(null);
  }, [attachedImage]);

  const addFilesFromList = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const nextFiles: FileAttachment[] = [];

      for (const file of files) {
        if (file.type.startsWith("image/")) {
          setImageFromFile(file);
          continue;
        }

        const attachment: FileAttachment = {
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
        setMobilePanel("chat");
      }
    },
    [setImageFromFile]
  );

  const removeAttachedFile = useCallback((fileId: string) => {
    setAttachedFiles((current) => current.filter((file) => file.id !== fileId));
  }, []);

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files?.length) {
        void addFilesFromList(files);
      }
      event.target.value = "";
    },
    [addFilesFromList]
  );

  const handleVoiceInput = useCallback(() => {
    if (typeof window === "undefined") return;

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      return;
    }

    const SpeechRecognitionConstructor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

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
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      showToast(`Voice input error: ${event.error}`);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      adjustHeight();
    };
    recognition.onresult = (event) => {
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

      const separator = input.trim() ? " " : "";
      setInput(`${input}${separator}${transcript}`);
      window.requestAnimationFrame(() => adjustHeight());
    };

    recognition.start();
  }, [adjustHeight, input, isListening, showToast]);

  const handleSend = useCallback(async (overrideText?: string) => {
    const prompt = (overrideText ?? input).trim();
    if ((!prompt && !attachedImage && attachedFiles.length === 0) || generating || isLoading) return;

    const imageForMessage = attachedImage ?? undefined;
    const filesForMessage = attachedFiles;
    const promptForApi = buildPromptWithAttachments(prompt, imageForMessage, filesForMessage);
    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: prompt,
      image: imageForMessage,
      files: filesForMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setAttachedImage(null);
    setAttachedFiles([]);
    setEditorTab("preview");
    adjustHeight(true);

    setIsLoading(true);
    setGenerating(true);

    if (!hasStarted) setHasStarted(true);

    const assistantId = createId();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const messagesForApi = [...messages, userMessage];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptForApi,
          messages: messagesForApi.map(m => ({
            role: m.role,
            content: m.id === userMessage.id ? promptForApi : m.content
          })),
          currentHtml: generatedHtml,
          defaultModel: oniSettings.defaultModel
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        setIsLoading(false);
        setGenerating(false);
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            id: assistantId,
            role: 'assistant',
            content: `Sorry, there was an error: ${errorText || response.statusText}`,
          };
          return updated;
        });
        return;
      }

      if (!response.body) {
        setIsLoading(false);
        setGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed === 'data: [DONE]') break;
          if (trimmed.startsWith('data: ')) {
            try {
              const json = trimmed.slice(6).trim();
              const parsed = JSON.parse(json);
              const token = parsed.choices?.[0]?.delta?.content || '';
              fullText += token;

              // Extract thought block
              let currentThought = "";
              if (fullText.includes("<ONI_THOUGHT>")) {
                const startIndex = fullText.indexOf("<ONI_THOUGHT>") + 13;
                const endIndex = fullText.indexOf("</ONI_THOUGHT>");
                if (endIndex !== -1) {
                  currentThought = fullText.slice(startIndex, endIndex).trim();
                } else {
                  currentThought = fullText.slice(startIndex).trim();
                }
              }

              // Strip completed/partial ONI_THOUGHT from displayContent
              let displayContent = fullText;
              if (displayContent.includes("</ONI_THOUGHT>")) {
                displayContent = displayContent.replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '').trim();
              } else {
                displayContent = displayContent.replace(/<ONI_THOUGHT>[\s\S]*/g, '').trim();
              }

              // Extract partial code block in real-time
              let partialHtml = "";
              if (displayContent.includes("<ONI_CODE>")) {
                const startIndex = displayContent.indexOf("<ONI_CODE>") + 10;
                const endIndex = displayContent.indexOf("</ONI_CODE>");
                if (endIndex !== -1) {
                  partialHtml = displayContent.slice(startIndex, endIndex).trim();
                } else {
                  partialHtml = displayContent.slice(startIndex).trim();
                }
              }

              // Strip completed/partial ONI_CODE from displayContent
              const hasCompleteBlock = /\<ONI_CODE\>[\s\S]*?\<\/ONI_CODE\>/.test(displayContent);
              const cleanDisplay = hasCompleteBlock
                ? displayContent.replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '').trim()
                : displayContent.replace(/<ONI_CODE>[\s\S]*/g, '').trim();

              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  id: assistantId,
                  role: 'assistant',
                  content: cleanDisplay,
                  thought: currentThought || undefined,
                };
                return updated;
              });

              // Stream partial code block into files in real-time
              if (partialHtml) {
                setGeneratedHtml(partialHtml);
              }
            } catch { }
          }
        }
      }

      setIsLoading(false);

      let finalThought = "";
      if (fullText.includes("<ONI_THOUGHT>")) {
        const startIndex = fullText.indexOf("<ONI_THOUGHT>") + 13;
        const endIndex = fullText.indexOf("</ONI_THOUGHT>");
        if (endIndex !== -1) {
          finalThought = fullText.slice(startIndex, endIndex).trim();
        } else {
          finalThought = fullText.slice(startIndex).trim();
        }
      }

      const match = fullText.match(/<ONI_CODE>([\s\S]*?)<\/ONI_CODE>/);
      if (match && match[1]) {
        const extractedHtml = match[1].trim();
        setGeneratedHtml(extractedHtml);
        setActiveFilePath("index.html");
      }

      const cleanContent = fullText
        .replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '')
        .replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '')
        .trim();

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: assistantId,
          role: 'assistant',
          content: cleanContent,
          thought: finalThought || undefined
        };
        return updated;
      });

      setPreviewRefreshKey((current) => current + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setGenerating(false);
    }
  }, [adjustHeight, attachedFiles, attachedImage, generatedHtml, hasStarted, generating, isLoading, input, messages]);

  // Auto-send the prompt that came from the home page (must be after handleSend is declared)
  // Guard: don't re-fire on refresh if session already has messages
  const didAutoSend = useRef(false);
  useEffect(() => {
    if (initialPrompt && !didAutoSend.current && messages.length === 0) {
      didAutoSend.current = true;
      void handleSend(initialPrompt);
    } else if (initialPrompt) {
      // Mark as sent so it doesn't trigger later
      didAutoSend.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);


  const handleRegenerate = useCallback(async () => {
    if (generating || isLoading) return;

    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
    if (!lastUserMessage) return;

    const prompt = lastUserMessage.content || "Regenerate the website.";
    setIsLoading(true);
    setGenerating(true);
    setEditorTab("preview");

    const assistantId = createId();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          messages: [{ role: "user", content: prompt }],
          currentHtml: generatedHtml,
          defaultModel: oniSettings.defaultModel
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            id: assistantId,
            role: 'assistant',
            content: `Sorry, there was an error: ${errorText || response.statusText}`,
          };
          return updated;
        });
        return;
      }

      if (!response.body) {
        setIsLoading(false);
        setGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          if (trimmed === 'data: [DONE]') break;
          if (trimmed.startsWith('data: ')) {
            try {
              const json = trimmed.slice(6).trim();
              const parsed = JSON.parse(json);
              const token = parsed.choices?.[0]?.delta?.content || '';
              fullText += token;

              // Extract thought block
              let currentThought = "";
              if (fullText.includes("<ONI_THOUGHT>")) {
                const startIndex = fullText.indexOf("<ONI_THOUGHT>") + 13;
                const endIndex = fullText.indexOf("</ONI_THOUGHT>");
                if (endIndex !== -1) {
                  currentThought = fullText.slice(startIndex, endIndex).trim();
                } else {
                  currentThought = fullText.slice(startIndex).trim();
                }
              }

              // Strip completed/partial ONI_THOUGHT from displayContent
              let displayContent = fullText;
              if (displayContent.includes("</ONI_THOUGHT>")) {
                displayContent = displayContent.replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '').trim();
              } else {
                displayContent = displayContent.replace(/<ONI_THOUGHT>[\s\S]*/g, '').trim();
              }

              // Extract partial code block in real-time
              let partialHtml = "";
              if (displayContent.includes("<ONI_CODE>")) {
                const startIndex = displayContent.indexOf("<ONI_CODE>") + 10;
                const endIndex = displayContent.indexOf("</ONI_CODE>");
                if (endIndex !== -1) {
                  partialHtml = displayContent.slice(startIndex, endIndex).trim();
                } else {
                  partialHtml = displayContent.slice(startIndex).trim();
                }
              }

              // Strip completed/partial ONI_CODE from displayContent
              const hasCompleteBlock = /\<ONI_CODE\>[\s\S]*?\<\/ONI_CODE\>/.test(displayContent);
              const cleanDisplay = hasCompleteBlock
                ? displayContent.replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '').trim()
                : displayContent.replace(/<ONI_CODE>[\s\S]*/g, '').trim();

              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  id: assistantId,
                  role: 'assistant',
                  content: cleanDisplay,
                  thought: currentThought || undefined,
                };
                return updated;
              });

              // Stream partial code block into files in real-time
              if (partialHtml) {
                setGeneratedHtml(partialHtml);
              }
            } catch { }
          }
        }
      }

      setIsLoading(false);

      let finalThought = "";
      if (fullText.includes("<ONI_THOUGHT>")) {
        const startIndex = fullText.indexOf("<ONI_THOUGHT>") + 13;
        const endIndex = fullText.indexOf("</ONI_THOUGHT>");
        if (endIndex !== -1) {
          finalThought = fullText.slice(startIndex, endIndex).trim();
        } else {
          finalThought = fullText.slice(startIndex).trim();
        }
      }

      const match = fullText.match(/<ONI_CODE>([\s\S]*?)<\/ONI_CODE>/);
      if (match && match[1]) {
        const extractedHtml = match[1].trim();
        setGeneratedHtml(extractedHtml);
        setActiveFilePath("index.html");
      }

      const cleanContent = fullText
        .replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '')
        .replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '')
        .trim();

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: assistantId,
          role: 'assistant',
          content: cleanContent,
          thought: finalThought || undefined
        };
        return updated;
      });

      setPreviewRefreshKey((current) => current + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setGenerating(false);
    }
  }, [generating, isLoading, messages, generatedHtml]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(event.clipboardData.files);
    if (files.length === 0) return;

    event.preventDefault();
    void addFilesFromList(files);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      void addFilesFromList(event.dataTransfer.files);
    }
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setImageFromFile(imageFile);
    }
    event.target.value = "";
  };

  const handleCopyText = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    },
    [showToast]
  );

  const handleDownloadZip = useCallback(async () => {
    showToast("Preparing your files...");
    await wait(450);

    const zipBlob = createZipBlob(projectFiles);
    const url = URL.createObjectURL(zipBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "oni-project.zip";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Download ready!");
  }, [projectFiles, showToast]);

  const handleOpenPreview = useCallback(() => {
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  }, [previewHtml]);

  const handlePublish = () => {
    showToast("Publishing preview...");
    window.setTimeout(() => showToast("Preview published"), 700);
  };

  // Wrapper layout
  return (
    <div className={hideSidebar ? "h-full overflow-hidden bg-[#0a0a0a] font-sans text-white flex" : "h-screen overflow-hidden bg-[#0a0a0a] font-sans text-white animate-[pageFadeIn_900ms_cubic-bezier(0.16,1,0.3,1)] flex"}>

      {/* ── Inline Push Navigation Sidebar ── */}
      {!hideSidebar && (
      <aside
        className={cn(
          "h-full shrink-0 flex flex-col bg-[#0f0f0f] border-r border-white/10 transition-all duration-300 overflow-hidden",
          navOpen ? "w-[210px]" : "w-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-14 flex items-center justify-between px-4 shrink-0 border-b border-white/10">
          <span className="text-base font-semibold tracking-tight text-white whitespace-nowrap">Oni</span>
          <button
            type="button"
            onClick={() => setNavOpen(false)}
            aria-label="Close sidebar"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 hover:bg-white/8 hover:text-white transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sidebar Body */}
        <div className="flex-1 overflow-y-auto px-2 py-3 flex flex-col gap-0.5">
          {/* New Chat */}
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/8 transition-colors group whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4 text-white/50 group-hover:text-white transition-colors shrink-0" />
            New Chat
          </a>

          {/* Nav items */}
          {[
            { label: "Chats", href: "/", icon: <MessageSquare className="h-4 w-4" /> },
            { label: "Projects", href: "#", icon: <Folder className="h-4 w-4" /> },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/8 transition-colors group whitespace-nowrap"
            >
              <span className="text-white/35 group-hover:text-white/70 transition-colors shrink-0">{item.icon}</span>
              {item.label}
            </a>
          ))}
          {/* Recents */}
          <div className="mt-5 mb-1.5 px-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-white/30 whitespace-nowrap relative">
            <span>Recents</span>
            <button
              type="button"
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">tune</span>
            </button>
            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowSortMenu(false)}
                />
                <div className="absolute right-3 top-full mt-1 w-40 bg-zinc-900 border border-white/10 rounded-lg shadow-lg py-1.5 z-50 flex flex-col text-left normal-case tracking-normal">
                  <div className="px-2.5 py-1 text-[9px] font-bold text-white/40 uppercase tracking-wider border-b border-white/5 mb-1">
                    Sort chats by
                  </div>
                  {[
                    { id: "date_desc", label: "Newest Modified" },
                    { id: "date_asc", label: "Oldest Modified" },
                    { id: "name_asc", label: "Name A-Z" },
                    { id: "name_desc", label: "Name Z-A" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSortMethod(option.id);
                        localStorage.setItem("oni_recent_sort", option.id);
                        window.dispatchEvent(new Event("oni_sort_change"));
                        setShowSortMenu(false);
                      }}
                      className="w-full px-2.5 py-1 text-left text-xs text-white/80 hover:bg-white/5 hover:text-white flex items-center justify-between transition-colors cursor-pointer font-normal"
                    >
                      <span>{option.label}</span>
                      {sortMethod === option.id && (
                        <span className="material-symbols-outlined text-[12px] text-white">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {sortedRecentChats.length === 0 ? (
            <div className="px-3 py-2 text-xs text-white/25 italic whitespace-nowrap">No recent chats</div>
          ) : (
            sortedRecentChats.map((chat) => {
              const isActive = chat.id === conversationId;
              return (
                <div
                  key={chat.id}
                  className={cn(
                    "group relative w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:bg-white/6 hover:text-white/80"
                  )}
                >
                  <div
                    onClick={() => {
                      try {
                        const rawChat = localStorage.getItem(`oni_chat_${chat.id}`);
                        if (rawChat) {
                          sessionStorage.setItem("oni_session", rawChat);
                        } else {
                          sessionStorage.setItem("oni_session", JSON.stringify({ id: chat.id, messages: [] }));
                        }
                      } catch { /* ignore */ }
                      window.location.href = `/chat?id=${chat.id}`;
                    }}
                    className="flex-1 min-w-0 flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-white/70" : "text-white/30 group-hover:text-white/50")} />
                    {pinnedChatsList.includes(chat.id) && (
                      <span className="material-symbols-outlined text-[12px] text-white/50 rotate-45 shrink-0">push_pin</span>
                    )}
                    <span className="truncate text-xs leading-snug">{chat.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePin(chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 transition-opacity transition-colors cursor-pointer text-white/40 hover:text-white flex items-center justify-center shrink-0"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {pinnedChatsList.includes(chat.id) ? "pin_drop" : "push_pin"}
                    </span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/8 transition-colors cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white/70 shrink-0">
              {oniSettings.displayName
                ?.split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? "")
                .join("") || "OU"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-white/80 leading-tight truncate">{oniSettings.displayName}</span>
              <span className="text-xs text-white/30 capitalize">{oniSettings.billingPlan} plan</span>
            </div>
          </div>
        </div>
      </aside>
      )}

      {/* ── Main content (chat + workspace) ── */}
      <div className="flex flex-1 min-w-0 h-full min-h-0 flex-col pb-16 lg:flex-row lg:pb-0">
        <section
          className={cn(
            "min-h-0 flex-col border-white/10 bg-[#0a0a0a] lg:flex transition-all duration-300",
            generatedHtml
              ? "lg:w-[500px] lg:shrink-0 lg:border-r"
              : "lg:w-full lg:flex-1",
            mobilePanel === "chat" ? "flex flex-1" : "hidden lg:flex",
            generatedHtml && !chatPanelOpen && "lg:!w-0 lg:!flex-none lg:!overflow-hidden lg:!border-0"
          )}
        >
          <ChatPanel
            value={input}
            messages={messages}
            attachedImage={attachedImage}
            attachedFiles={attachedFiles}
            isGenerating={generating}
            isListening={isListening}
            isLoading={isLoading}
            isDragging={isDragging}
            textareaRef={textareaRef}
            fileInputRef={fileInputRef}
            imageInputRef={imageInputRef}
            onValueChange={(nextValue) => {
              setInput(nextValue);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onSend={() => { void handleSend(); }}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onFileInputChange={handleFileInputChange}
            onFileButtonClick={() => fileInputRef.current?.click()}
            onImageInputChange={handleImageInputChange}
            onImageButtonClick={() => imageInputRef.current?.click()}
            onVoiceInput={handleVoiceInput}
            onRemoveFile={removeAttachedFile}
            onRemoveImage={removeAttachedImage}
            onCopy={handleCopyText}
            onRegenerate={() => { void handleRegenerate(); }}
            messagesEndRef={messagesEndRef}
            onToggleSidebar={() => setNavOpen((v) => !v)}
            sidebarOpen={navOpen}
            hideSidebar={hideSidebar}
            hasWebsite={Boolean(generatedHtml)}
            chatFont={oniSettings.chatFont}
            compactMode={oniSettings.compactMode}
          />
        </section>

        {generatedHtml && (
          <section
            className={cn(
              "min-h-0 flex-1 flex-col bg-[#0a0a0a] lg:flex",
              mobilePanel === "preview" || mobilePanel === "code" ? "flex flex-1" : "hidden lg:flex"
            )}
          >
            <WorkspacePanel
              editorTab={editorTab}
              previewSize={previewSize}
              previewHtml={previewHtml}
              previewRefreshKey={previewRefreshKey}
              isGenerating={generating}
              projectFiles={projectFiles}
              activeFile={activeFile}
              activeFilePath={activeFilePath}
              sidebarOpen={chatPanelOpen}
              onToggleSidebar={() => setChatPanelOpen((v) => !v)}
              onEditorTabChange={(tab) => {
                setEditorTab(tab);
                setMobilePanel(tab);
              }}
              onPreviewSizeChange={setPreviewSize}
              onRefreshPreview={() => setPreviewRefreshKey((current) => current + 1)}
              onPublish={handlePublish}
              onDownloadZip={() => { void handleDownloadZip(); }}
              onOpenPreview={handleOpenPreview}
              onFileSelect={setActiveFilePath}
              onCopyCode={() => { void handleCopyText(activeFile.content); }}
            />
          </section>
        )}
      </div>

      {generatedHtml && (
        <MobilePanelTabs
          activePanel={mobilePanel}
          onPanelChange={(panel) => {
            setMobilePanel(panel);
            if (panel === "preview" || panel === "code") {
              setEditorTab(panel);
            }
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed right-4 bottom-4 z-50 rounded-xl border border-white/10 bg-zinc-950 bg-opacity-70 backdrop-blur-md px-4 py-3 text-sm text-white shadow-2xl shadow-black/40 toast-glass">
          {toast}
        </div>
      )}
    </div>
  );
}



interface ChatPanelProps {
  value: string;
  messages: ChatMessage[];
  attachedImage: ImageAttachment | null;
  attachedFiles: FileAttachment[];
  isGenerating: boolean;
  isListening: boolean;
  isLoading: boolean;
  isDragging: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  imageInputRef: RefObject<HTMLInputElement | null>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onValueChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileButtonClick: () => void;
  onImageInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageButtonClick: () => void;
  onVoiceInput: () => void;
  onRemoveFile: (fileId: string) => void;
  onRemoveImage: () => void;
  onCopy: (text: string) => void;
  onRegenerate: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  hideSidebar?: boolean;
  hasWebsite: boolean;
  chatFont?: string;
  compactMode?: boolean;
}

function ChatPanel({
  value,
  messages,
  attachedImage,
  attachedFiles,
  isGenerating,
  isListening,
  isLoading,
  isDragging,
  textareaRef,
  fileInputRef,
  imageInputRef,
  messagesEndRef,
  onValueChange,
  onKeyDown,
  onPaste,
  onSend,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInputChange,
  onFileButtonClick,
  onImageInputChange,
  onImageButtonClick,
  onVoiceInput,
  onRemoveFile,
  onRemoveImage,
  onCopy,
  onRegenerate,
  onToggleSidebar,
  sidebarOpen,
  hideSidebar,
  hasWebsite,
  chatFont,
  compactMode,
}: ChatPanelProps) {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
        {!hideSidebar && (
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/8 hover:text-white transition-colors"
        >
          {/* sidebar panel icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-white/70">Oni</span>
        </div>
      </header>

      <div className="min-h-0 flex-1 flex flex-col overflow-y-auto px-5 py-6 scrollbar-hidden bg-[#0a0a0a]/30 backdrop-blur-xl">
        <div className={cn("flex flex-1 flex-col justify-end w-full", !hasWebsite && "max-w-3xl mx-auto")}>
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-8 py-12">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] shadow-inner shadow-white/5">
                <Laptop className="h-6 w-6 text-white/70" />
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 opacity-70 blur" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h2 className="text-xl font-semibold tracking-tight text-white">What are we building today?</h2>
                <p className="text-sm text-white/45 leading-relaxed">
                  Describe a site, paste a screenshot, or pick one of the suggestions to generate a fully custom build.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
                {["Portfolio site", "Restaurant landing page", "SaaS dashboard", "Personal blog"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onValueChange(s)}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-2 text-xs text-white/60 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-end space-y-8">
              {messages.map((message) =>
                message.role === "user" ? (
                  <UserMessage key={message.id} message={message} chatFont={chatFont} compactMode={compactMode} />
                ) : (
                  <AssistantMessage
                    key={message.id}
                    message={message}
                    chatFont={chatFont}
                    compactMode={compactMode}
                    onCopy={() => onCopy(message.content)}
                    onRegenerate={onRegenerate}
                  />
                )
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#0a0a0a] p-4">
        <div className={cn("w-full", !hasWebsite && "max-w-3xl mx-auto")}>
          <ChatComposer
            value={value}
            attachedImage={attachedImage}
            attachedFiles={attachedFiles}
            isGenerating={isGenerating}
            isListening={isListening}
            isDragging={isDragging}
            textareaRef={textareaRef}
            fileInputRef={fileInputRef}
            imageInputRef={imageInputRef}
            onValueChange={onValueChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            onSend={onSend}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onFileInputChange={onFileInputChange}
            onFileButtonClick={onFileButtonClick}
            onImageInputChange={onImageInputChange}
            onImageButtonClick={onImageButtonClick}
            onVoiceInput={onVoiceInput}
            onRemoveFile={onRemoveFile}
            onRemoveImage={onRemoveImage}
          />
        </div>
      </div>
    </>
  );
}

function UserMessage({ message, chatFont, compactMode }: { message: ChatMessage; chatFont?: string; compactMode?: boolean }) {
  const fontStyle = chatFont === "monospace"
    ? { fontFamily: "var(--font-geist-mono), monospace" }
    : chatFont === "serif"
    ? { fontFamily: "var(--font-serif), serif" }
    : { fontFamily: "var(--font-sans), sans-serif" };

  const paddingClass = compactMode ? "px-3 py-1.5 text-xs leading-5" : "px-4 py-2.5 text-sm leading-6";

  return (
    <div className="flex animate-[fadeSlideUp_800ms_cubic-bezier(0.16,1,0.3,1)] justify-end">
      <div className="flex max-w-[82%] flex-col items-end gap-2">
        {message.image && (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-1">
            <Image
              src={message.image.url}
              alt={message.image.name}
              width={260}
              height={180}
              unoptimized
              className="max-h-56 w-auto rounded-xl object-cover"
            />
          </div>
        )}
        {message.files && message.files.length > 0 && (
          <div className="flex max-w-full flex-col items-end gap-1.5">
            {message.files.map((file) => (
              <div
                key={file.id}
                className="flex max-w-[260px] items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-left"
              >
                <FileText className="h-4 w-4 shrink-0 text-white/55" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white/80">{file.name}</p>
                  <p className="text-[11px] text-white/35">{formatBytes(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {message.content && (
          <div
            style={fontStyle}
            className={cn("rounded-2xl border border-white/8 bg-white/10 backdrop-blur-md hover:bg-white/12 transition-colors text-zinc-100 shadow-sm", paddingClass)}
          >
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}

function AssistantMessage({
  message,
  chatFont,
  compactMode,
  onCopy,
  onRegenerate,
}: {
  message: ChatMessage;
  chatFont?: string;
  compactMode?: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}) {
  const [thoughtOpen, setThoughtOpen] = useState(false);
  const fontStyle = chatFont === "monospace"
    ? { fontFamily: "var(--font-geist-mono), monospace" }
    : chatFont === "serif"
    ? { fontFamily: "var(--font-serif), serif" }
    : { fontFamily: "var(--font-sans), sans-serif" };

  const paddingClass = compactMode ? "p-2.5" : "p-4";

  return (
    <div className={cn("animate-[fadeSlideUp_800ms_cubic-bezier(0.16,1,0.3,1)]", compactMode ? "space-y-1.5" : "space-y-2.5")}>
      <div className="flex items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-[10px] select-none">
          O
        </div>
        <span className="text-xs text-white/45 font-semibold tracking-wide uppercase select-none">Oni</span>
      </div>

      <div className={cn("space-y-2 pl-7 bg-white/8 backdrop-blur-md rounded-xl", paddingClass)}>
        {message.content ? (
          <p
            style={fontStyle}
            className={cn("max-w-3xl whitespace-pre-wrap text-zinc-100 description-fade", compactMode ? "text-xs leading-6" : "text-sm leading-7")}
          >
            {message.content}
          </p>
        ) : (
          <div className="flex items-center gap-1.5 py-2">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse"
                style={{ animationDelay: `${dot * 150}ms` }}
              />
            ))}
          </div>
        )}

        {message.thought && (
          <div className="max-w-3xl rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setThoughtOpen((current) => !current)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-white/55 transition-colors duration-200 ease-in-out hover:text-white/80"
            >
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                <span>Thought Process</span>
              </div>
              {thoughtOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
            {thoughtOpen && (
              <div className="px-3 pb-3 pt-1 border-t border-white/5 text-xs leading-6 text-white/45 whitespace-pre-wrap">
                {message.thought}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-1">
          <IconButton label="Copy response" onClick={onCopy}>
            <Copy className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton label="Regenerate response" onClick={onRegenerate}>
            <RotateCcw className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function AssistantThinking() {
  return (
    <div className="animate-[fadeSlideUp_600ms_cubic-bezier(0.16,1,0.3,1)]">
      <span className="text-xs text-white/35">Oni</span>
      <div className="mt-2 flex items-center gap-2 text-sm text-white/55">
        <span>thinking</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-white/55 animate-pulse"
              style={{ animationDelay: `${dot * 140}ms` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

type ChatComposerProps = {
  value: string;
  attachedImage: ImageAttachment | null;
  attachedFiles: FileAttachment[];
  isGenerating: boolean;
  isListening: boolean;
  isDragging: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  imageInputRef: RefObject<HTMLInputElement | null>;
  onValueChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileButtonClick: () => void;
  onImageInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageButtonClick: () => void;
  onVoiceInput: () => void;
  onRemoveFile: (fileId: string) => void;
  onRemoveImage: () => void;
};

function ChatComposer({
  value,
  attachedImage,
  attachedFiles,
  isGenerating,
  isListening,
  isDragging,
  textareaRef,
  fileInputRef,
  imageInputRef,
  onValueChange,
  onKeyDown,
  onPaste,
  onSend,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInputChange,
  onFileButtonClick,
  onImageInputChange,
  onImageButtonClick,
  onVoiceInput,
  onRemoveFile,
  onRemoveImage,
}: ChatComposerProps) {
  const canSend = Boolean(value.trim() || attachedImage || attachedFiles.length > 0) && !isGenerating;

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 transition-colors duration-200 ease-in-out",
        isDragging && "border-white/30 bg-white/10"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_DOCUMENT_TYPES}
        multiple
        className="hidden"
        onChange={onFileInputChange}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        className="hidden"
        onChange={onImageInputChange}
      />

      {(attachedImage || attachedFiles.length > 0) && (
        <div className="border-b border-white/10 px-3 pt-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {attachedImage && (
              <div className="relative inline-flex overflow-hidden rounded-lg border border-white/10 bg-black">
                <Image
                  src={attachedImage.url}
                  alt={attachedImage.name}
                  width={128}
                  height={80}
                  unoptimized
                  className="max-h-20 w-auto object-cover"
                />
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/75 text-white transition-colors duration-200 ease-in-out hover:bg-white hover:text-black"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex max-w-full items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                <div className="min-w-0">
                  <p className="max-w-[220px] truncate text-xs font-medium text-white/80">{file.name}</p>
                  <p className="text-[11px] text-white/35">
                    {formatBytes(file.size)}
                    {file.content ? " read" : file.note ? " metadata only" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFile(file.id)}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-2 px-3 py-3">
        <div className="flex shrink-0 items-center gap-1 pb-2">
          <IconButton label="Attach file" onClick={onFileButtonClick}>
            <Paperclip className="h-4 w-4" />
          </IconButton>
          <IconButton label="Upload image" onClick={onImageButtonClick}>
            <ImageIcon className="h-4 w-4" />
          </IconButton>
        </div>

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          placeholder="Describe your website or paste a screenshot..."
          className="min-h-16 flex-1 resize-none border-0 bg-transparent px-0 py-2 text-sm leading-6 text-white placeholder:text-white/35 focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{ overflow: "hidden" }}
        />

        <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onSend}
              disabled={!canSend}
              className={cn(
                "mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ease-in-out",
                canSend ? "bg-white text-black hover:bg-white/90" : "cursor-not-allowed bg-white/10 text-white/35"
              )}
              aria-label="Send message"
            >
              {isGenerating ? (
              <svg className="spinner h-4 w-4" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                <path d="M12 2 a10 10 0 0 1 0 20" stroke="currentColor" strokeWidth="4" />
              </svg>
            ) : (
              <ArrowUpIcon className="h-4 w-4" />
              )}
            </button>
          <button
            type="button"
            onClick={onVoiceInput}
            disabled={isGenerating}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ease-in-out",
              isListening
                ? "bg-red-500 text-white hover:bg-red-400"
                : "bg-white/10 text-white hover:bg-white/20",
              isGenerating && "cursor-not-allowed opacity-50"
            )}
            aria-label={isListening ? "Stop voice input" : "Voice input"}
            title={isListening ? "Stop voice input" : "Voice input"}
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

type WorkspacePanelProps = {
  editorTab: EditorTab;
  previewSize: PreviewSize;
  previewHtml: string;
  previewRefreshKey: number;
  isGenerating: boolean;
  projectFiles: ProjectFile[];
  activeFile: ProjectFile;
  activeFilePath: string;
  onEditorTabChange: (tab: EditorTab) => void;
  onPreviewSizeChange: (size: PreviewSize) => void;
  onRefreshPreview: () => void;
  onPublish: () => void;
  onDownloadZip: () => void;
  onOpenPreview: () => void;
  onFileSelect: (path: string) => void;
  onCopyCode: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

function WorkspacePanel({
  editorTab,
  previewSize,
  previewHtml,
  previewRefreshKey,
  isGenerating,
  projectFiles,
  activeFile,
  activeFilePath,
  onEditorTabChange,
  onPreviewSizeChange,
  onRefreshPreview,
  onPublish,
  onDownloadZip,
  onOpenPreview,
  onFileSelect,
  onCopyCode,
  sidebarOpen,
  onToggleSidebar,
}: WorkspacePanelProps) {
  return (
    <>
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <div className="flex h-full items-center gap-1">
          {/* Open sidebar button — only shows when sidebar is collapsed */}
          {!sidebarOpen && (
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label="Open sidebar"
              className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/8 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>
          )}
          <TabButton active={editorTab === "preview"} onClick={() => onEditorTabChange("preview")}>
            <Eye className="h-4 w-4" />
            Preview
          </TabButton>
          <TabButton active={editorTab === "code"} onClick={() => onEditorTabChange("code")}>
            <Code2 className="h-4 w-4" />
            Code
          </TabButton>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPublish}
            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition-colors duration-200 ease-in-out hover:bg-white/90"
          >
            Publish
          </button>
          <button
            type="button"
            onClick={onDownloadZip}
            className="hidden rounded-lg border border-white/20 px-3 py-2 text-sm text-white/80 transition-colors duration-200 ease-in-out hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            <Download className="mr-2 h-4 w-4" />
            Download ZIP
          </button>
          <IconButton label="Open preview" onClick={onOpenPreview}>
            <ExternalLink className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {editorTab === "preview" ? (
          <PreviewTab
            previewSize={previewSize}
            previewHtml={previewHtml}
            previewRefreshKey={previewRefreshKey}
            isGenerating={isGenerating}
            onPreviewSizeChange={onPreviewSizeChange}
            onRefreshPreview={onRefreshPreview}
          />
        ) : (
          <CodeTab
            projectFiles={projectFiles}
            activeFile={activeFile}
            activeFilePath={activeFilePath}
            onFileSelect={onFileSelect}
            onCopyCode={onCopyCode}
          />
        )}
      </div>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-full items-center gap-2 border-b-2 px-1 text-sm transition-colors duration-200 ease-in-out",
        active ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/75"
      )}
    >
      {children}
    </button>
  );
}

function PreviewTab({
  previewSize,
  previewHtml,
  previewRefreshKey,
  isGenerating,
  onPreviewSizeChange,
  onRefreshPreview,
}: {
  previewSize: PreviewSize;
  previewHtml: string;
  previewRefreshKey: number;
  isGenerating: boolean;
  onPreviewSizeChange: (size: PreviewSize) => void;
  onRefreshPreview: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0a0a0a] p-4">
      <div className="flex shrink-0 flex-col gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <button
            type="button"
            onClick={onRefreshPreview}
            className="text-white/45 transition-colors duration-200 ease-in-out hover:text-white"
            aria-label="Refresh preview"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <span className="truncate text-xs text-white/55">oni.app/preview/project-id</span>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          {previewSizeLabels.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onPreviewSizeChange(item.value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors duration-200 ease-in-out",
                  previewSize === item.value ? "bg-white text-black" : "text-white/55 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden pt-4">
        {isGenerating ? (
          <PreviewSkeleton />
        ) : previewHtml ? (
          <div className="flex h-full justify-center overflow-hidden">
            <iframe
              key={`${previewRefreshKey}-${previewSize}`}
              title="Oni generated website preview"
              srcDoc={previewHtml}
              className={cn(
                "h-full rounded-xl border border-white/10 bg-white transition-all duration-200 ease-in-out",
                previewSizeClasses[previewSize]
              )}
            />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white/50">No preview yet</p>
              <p className="mt-1 text-xs text-white/25">Describe a website in the chat to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <div className="h-full animate-pulse rounded-lg bg-white/[0.04] p-8">
        <div className="mb-8 h-6 w-40 rounded bg-white/10" />
        <div className="mb-4 h-12 w-3/4 rounded bg-white/10" />
        <div className="mb-10 h-4 w-1/2 rounded bg-white/10" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-xl bg-white/10" />
          <div className="h-40 rounded-xl bg-white/10" />
          <div className="h-40 rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function CodeTab({
  projectFiles,
  activeFile,
  activeFilePath,
  onFileSelect,
  onCopyCode,
}: {
  projectFiles: ProjectFile[];
  activeFile: ProjectFile;
  activeFilePath: string;
  onFileSelect: (path: string) => void;
  onCopyCode: () => void;
}) {
  return (
    <div className="flex h-full min-h-0">
      <aside className="w-[190px] shrink-0 overflow-y-auto border-r border-white/10 bg-white/[0.02] p-3 scrollbar-hidden sm:w-[210px]">
        <FileTree files={projectFiles} activeFilePath={activeFilePath} onFileSelect={onFileSelect} />
      </aside>

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="truncate text-sm text-white">{activeFile.path}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
              {activeFile.language}
            </span>
          </div>
          <IconButton label="Copy code" onClick={onCopyCode}>
            <Copy className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="h-[calc(100%-3rem)] overflow-auto bg-[#0d0d0d] scrollbar-hidden">
          <pre className="min-w-max p-4 font-mono text-[13px] leading-6 text-white/80">
            {activeFile.content.split("\n").map((line, index) => (
              <div key={`${activeFile.path}-${index}`} className="grid grid-cols-[3rem_minmax(0,1fr)]">
                <span className="select-none pr-4 text-right text-white/25">{index + 1}</span>
                <code className="whitespace-pre">{highlightLine(line, activeFile.language)}</code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

function FileTree({
  files,
  activeFilePath,
  onFileSelect,
}: {
  files: ProjectFile[];
  activeFilePath: string;
  onFileSelect: (path: string) => void;
}) {
  const groups = [
    {
      name: "src",
      files: files.filter((file) => file.path.startsWith("src/")),
    },
    {
      name: "public",
      files: files.filter((file) => file.path.startsWith("public/")),
    },
    {
      name: "root",
      files: files.filter((file) => !file.path.startsWith("src/") && !file.path.startsWith("public/")),
    },
  ];

  return (
    <div className="space-y-3 text-sm">
      {groups.map((group) => (
        <div key={group.name}>
          <div className="mb-1 flex items-center gap-2 px-2 text-xs text-white/35">
            {group.name !== "root" && <Folder className="h-3.5 w-3.5" />}
            {group.name !== "root" && <span>{group.name}/</span>}
          </div>
          <div className="space-y-1">
            {group.files.map((file) => (
              <button
                key={file.path}
                type="button"
                onClick={() => onFileSelect(file.path)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition-colors duration-200 ease-in-out",
                  activeFilePath === file.path
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white/85"
                )}
              >
                <FileIcon path={file.path} />
                <span className="truncate">{file.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FileIcon({ path }: { path: string }) {
  if (path.endsWith(".json")) return <FileJson className="h-4 w-4 text-yellow-300/80" />;
  if (path.endsWith(".css")) return <FileText className="h-4 w-4 text-sky-300/80" />;
  if (path.endsWith(".html")) return <Code2 className="h-4 w-4 text-orange-300/80" />;
  return <FileCode2 className="h-4 w-4 text-emerald-300/80" />;
}

function MobilePanelTabs({
  activePanel,
  onPanelChange,
}: {
  activePanel: MobilePanel;
  onPanelChange: (panel: MobilePanel) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-white/10 bg-[#0a0a0a]/95 p-2 backdrop-blur lg:hidden">
      {mobileTabs.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onPanelChange(item.value)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs transition-colors duration-200 ease-in-out",
              activePanel === item.value ? "bg-white/10 text-white" : "text-white/45 hover:text-white"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white/55 transition-colors duration-200 ease-in-out hover:bg-white/10 hover:text-white"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function buildFallbackResponse(prompt: string, hasImage: boolean, error?: string) {
  if (error) {
    return `I could not reach the generator, so I prepared a local build plan instead. ${error}`;
  }

  if (hasImage) {
    return "I analyzed the screenshot reference and mapped it into a clean responsive page: strong hero section, compact navigation, reusable content blocks, and a preview that can be refined in code.";
  }

  return `I created a starter website direction for "${prompt || "your website"}" with a polished hero, conversion-focused sections, responsive layout, and editable project files.`;
}

function buildThoughtProcess(prompt: string, hasImage: boolean) {
  const reference = hasImage ? "The image reference drives layout, hierarchy, spacing, and visual emphasis." : "The written brief drives structure, copy, and component choices.";

  return `${reference} The page is split into reusable sections, then mirrored into preview markup and editable source files so the design can be iterated quickly. Brief: ${prompt}`;
}

function buildProjectFiles(html: string): ProjectFile[] {
  if (!html) {
    return [
      {
        path: "index.html",
        label: "index.html",
        language: "html",
        content: "<!-- No website generated yet. Describe one in the chat! -->",
      },
    ];
  }

  return [
    {
      path: "index.html",
      label: "index.html",
      language: "html",
      content: html,
    },
  ];
}

function buildPromptWithAttachments(
  prompt: string,
  image: ImageAttachment | undefined,
  files: FileAttachment[]
) {
  const attachmentBlocks: string[] = [];

  if (image) {
    attachmentBlocks.push(
      [
        "Attached image:",
        `Name: ${image.name}`,
        "Use it as a visual reference if the user asks for design, layout, branding, or screenshot-based changes.",
      ].join("\n")
    );
  }

  files.forEach((file) => {
    const lines = [
      `Attached file: ${file.name}`,
      `Type: ${file.type || "unknown"}`,
      `Size: ${formatBytes(file.size)}`,
    ];

    if (file.content) {
      lines.push("Content:", file.content);
    } else if (file.note) {
      lines.push(`Note: ${file.note}`);
    }

    attachmentBlocks.push(lines.join("\n"));
  });

  if (attachmentBlocks.length === 0) return prompt;

  return [prompt || "Use the attached files for this request.", "<ATTACHMENTS>", attachmentBlocks.join("\n\n---\n\n"), "</ATTACHMENTS>"].join("\n\n");
}

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
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}


function buildInitialPreviewHtml() {
  return buildPreviewHtml("A polished launch page for an AI website builder");
}

function buildPreviewHtml(brief: string) {
  const safeBrief = escapeHtml(brief || "A polished launch page for an AI website builder");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #080808; color: white; }
      .page { min-height: 100vh; background: radial-gradient(circle at 20% 0%, rgba(56,189,248,.16), transparent 32%), #080808; }
      header { display: flex; justify-content: space-between; align-items: center; padding: 24px clamp(20px, 5vw, 64px); }
      .brand { font-weight: 700; letter-spacing: -.03em; }
      nav { display: flex; gap: 18px; color: rgba(255,255,255,.58); font-size: 14px; }
      main { padding: 72px clamp(20px, 7vw, 96px); }
      .eyebrow { color: #67e8f9; text-transform: uppercase; letter-spacing: .22em; font-size: 12px; margin-bottom: 18px; }
      h1 { max-width: 920px; margin: 0; font-size: clamp(44px, 8vw, 92px); line-height: .94; letter-spacing: -.07em; }
      .sub { max-width: 620px; margin-top: 24px; color: rgba(255,255,255,.62); font-size: 18px; line-height: 1.7; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
      .primary, .secondary { border-radius: 999px; padding: 14px 20px; font-weight: 650; font-size: 14px; }
      .primary { background: white; color: black; }
      .secondary { border: 1px solid rgba(255,255,255,.16); color: white; }
      .cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 72px; }
      .card { min-height: 160px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.045); border-radius: 24px; padding: 22px; }
      .card p { color: rgba(255,255,255,.55); line-height: 1.6; }
      @media (max-width: 760px) { nav { display: none; } .cards { grid-template-columns: 1fr; } main { padding-top: 48px; } }
    </style>
  </head>
  <body>
    <div class="page">
      <header>
        <div class="brand">Oni Generated</div>
        <nav><span>Product</span><span>Pricing</span><span>Contact</span></nav>
      </header>
      <main>
        <div class="eyebrow">Preview build</div>
        <h1>${safeBrief}</h1>
        <p class="sub">This generated site uses a focused structure, responsive spacing, and production-minded sections that can be refined in the code editor.</p>
        <div class="actions"><span class="primary">Get started</span><span class="secondary">View details</span></div>
        <section class="cards">
          <article class="card"><h2>Fast</h2><p>Clean section architecture for quick iteration.</p></article>
          <article class="card"><h2>Responsive</h2><p>Layouts adapt across desktop, tablet, and mobile.</p></article>
          <article class="card"><h2>Editable</h2><p>Every file is visible in the code tab.</p></article>
        </section>
      </main>
    </div>
  </body>
</html>`;
}

function highlightLine(line: string, language: string) {
  const pattern =
    /(\/\/.*|\/\*.*?\*\/|("[^"]*"|'[^']*'|`[^`]*`)|\b(import|from|export|default|function|return|const|let|type|interface|className|async|await)\b|(#[0-9a-fA-F]{3,8})|(<\/?[A-Za-z][^>]*>))/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }

    const token = match[0];
    nodes.push(
      <span key={`${line}-${match.index}`} className={getTokenClass(token, language)}>
        {token}
      </span>
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : " ";
}

function getTokenClass(token: string, language: string) {
  if (token.startsWith("//") || token.startsWith("/*")) return "text-white/35";
  if (token.startsWith("\"") || token.startsWith("'") || token.startsWith("`")) return "text-emerald-300";
  if (token.startsWith("#")) return "text-pink-300";
  if (token.startsWith("<")) return "text-sky-300";
  if (language === "json") return "text-amber-300";
  return "text-violet-300";
}

function createZipBlob(files: ProjectFile[]) {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.path);
    const data = encoder.encode(file.content);
    const crc = crc32(data);
    const { time, date } = getDosDateTime();
    const localHeader = new Uint8Array(30);
    const localView = new DataView(localHeader.buffer);

    writeUint32(localView, 0, 0x04034b50);
    writeUint16(localView, 4, 20);
    writeUint16(localView, 6, 0);
    writeUint16(localView, 8, 0);
    writeUint16(localView, 10, time);
    writeUint16(localView, 12, date);
    writeUint32(localView, 14, crc);
    writeUint32(localView, 18, data.length);
    writeUint32(localView, 22, data.length);
    writeUint16(localView, 26, nameBytes.length);
    writeUint16(localView, 28, 0);

    localParts.push(localHeader, nameBytes, data);

    const centralHeader = new Uint8Array(46);
    const centralView = new DataView(centralHeader.buffer);
    writeUint32(centralView, 0, 0x02014b50);
    writeUint16(centralView, 4, 20);
    writeUint16(centralView, 6, 20);
    writeUint16(centralView, 8, 0);
    writeUint16(centralView, 10, 0);
    writeUint16(centralView, 12, time);
    writeUint16(centralView, 14, date);
    writeUint32(centralView, 16, crc);
    writeUint32(centralView, 20, data.length);
    writeUint32(centralView, 24, data.length);
    writeUint16(centralView, 28, nameBytes.length);
    writeUint16(centralView, 30, 0);
    writeUint16(centralView, 32, 0);
    writeUint16(centralView, 34, 0);
    writeUint16(centralView, 36, 0);
    writeUint32(centralView, 38, 0);
    writeUint32(centralView, 42, offset);

    centralParts.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + data.length;
  });

  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const endHeader = new Uint8Array(22);
  const endView = new DataView(endHeader.buffer);
  writeUint32(endView, 0, 0x06054b50);
  writeUint16(endView, 4, 0);
  writeUint16(endView, 6, 0);
  writeUint16(endView, 8, files.length);
  writeUint16(endView, 10, files.length);
  writeUint32(endView, 12, centralSize);
  writeUint32(endView, 16, offset);
  writeUint16(endView, 20, 0);

  const blobParts = [...localParts, ...centralParts, endHeader].map(toArrayBuffer);
  return new Blob(blobParts, { type: "application/zip" });
}

function toArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

function crc32(data: Uint8Array) {
  let crc = 0xffffffff;

  for (const byte of data) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function getDosDateTime(date = new Date()) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();

  return { time, date: dosDate };
}

function writeUint16(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value, true);
}

function writeUint32(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value, true);
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
