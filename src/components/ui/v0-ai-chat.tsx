"use client";

import Image from "next/image";
import {
  ArrowUpIcon,
  ChevronDown,
  ChevronRight,
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

type ImageAttachment = {
  id: string;
  name: string;
  url: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: ImageAttachment;
  thought?: string;
};

type EditorTab = "preview" | "code";
type PreviewSize = "desktop" | "tablet" | "mobile";
type MobilePanel = "chat" | "preview" | "code";

type ProjectFile = {
  path: string;
  label: string;
  language: string;
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content:
      "Describe the site you want to build, paste a screenshot, or upload a reference image. I will turn it into a preview and editable project files.",
    thought:
      "Project setup is ready. The workspace is waiting for a brief, brand direction, or visual reference before updating the preview.",
  },
];

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

export function OniChat({ initialPrompt = "" }: { initialPrompt?: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [attachedImage, setAttachedImage] = useState<ImageAttachment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editorTab, setEditorTab] = useState<EditorTab>("preview");
  const [previewSize, setPreviewSize] = useState<PreviewSize>("desktop");
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("chat");
  const [activeFilePath, setActiveFilePath] = useState("index.html");
  const [generatedHtml, setGeneratedHtml] = useState(buildInitialPreviewHtml);
  const [toast, setToast] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false); // existing state unchanged
  const imageInputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 64,
    maxHeight: 180,
  });

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

  const handleSend = useCallback(async (overrideText?: string) => {
    const prompt = (overrideText ?? input).trim();
    if ((!prompt && !attachedImage) || generating || isLoading) return;

    const imageForMessage = attachedImage ?? undefined;
    const nextBrief = prompt || "Screenshot-based website build";
    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: prompt,
      image: imageForMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setAttachedImage(null);
    setEditorTab("preview");
    setMobilePanel("preview");
    adjustHeight(true);

    setIsLoading(true);
    setGenerating(true);

    if (!hasStarted) setHasStarted(true);

    const assistantId = createId();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          currentHtml: generatedHtml
        }),
      });

      if (!response.body) {
        setIsLoading(false);
        setGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
        for (const line of lines) {
          const json = line.replace('data: ', '').trim()
          if (json === '[DONE]') break
          try {
            const parsed = JSON.parse(json)
            const token = parsed.choices?.[0]?.delta?.content || ''
            fullText += token
            setMessages(prev => {
              const updated = [...prev]
              updated[updated.length - 1] = {
                id: assistantId,
                role: 'assistant',
                content: fullText.replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '').trim()
              }
              return updated
            })
          } catch { }
        }
      }

      setIsLoading(false);

      const match = fullText.match(/<ONI_CODE>([\s\S]*?)<\/ONI_CODE>/);
      if (match && match[1]) {
        const extractedHtml = match[1].trim();
        setGeneratedHtml(extractedHtml);
        setActiveFilePath("index.html");
      }

      const cleanContent = fullText.replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '').trim();
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: assistantId,
          role: 'assistant',
          content: cleanContent,
          thought: buildThoughtProcess(nextBrief, Boolean(imageForMessage))
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
  }, [adjustHeight, attachedImage, generatedHtml, hasStarted, generating, isLoading, input]);

  // Auto-send the prompt that came from the home page (must be after handleSend is declared)
  const didAutoSend = useRef(false);
  useEffect(() => {
    if (initialPrompt && !didAutoSend.current) {
      didAutoSend.current = true;
      void handleSend(initialPrompt);
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
    setMobilePanel("preview");

    const assistantId = createId();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, currentHtml: generatedHtml }),
      });

      if (!response.body) {
        setIsLoading(false);
        setGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
        for (const line of lines) {
          const json = line.replace('data: ', '').trim()
          if (json === '[DONE]') break
          try {
            const parsed = JSON.parse(json)
            const token = parsed.choices?.[0]?.delta?.content || ''
            fullText += token
            setMessages(prev => {
              const updated = [...prev]
              updated[updated.length - 1] = {
                id: assistantId,
                role: 'assistant',
                content: fullText.replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '').trim()
              }
              return updated
            })
          } catch { }
        }
      }

      setIsLoading(false);

      const match = fullText.match(/<ONI_CODE>([\s\S]*?)<\/ONI_CODE>/);
      if (match && match[1]) {
        const extractedHtml = match[1].trim();
        setGeneratedHtml(extractedHtml);
        setActiveFilePath("index.html");
      }

      const cleanContent = fullText.replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '').trim();
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: assistantId,
          role: 'assistant',
          content: cleanContent,
          thought: buildThoughtProcess(prompt, Boolean(lastUserMessage.image))
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
    const imageFile = Array.from(event.clipboardData.files).find((file) => file.type.startsWith("image/"));
    if (!imageFile) return;

    event.preventDefault();
    setImageFromFile(imageFile);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const imageFile = Array.from(event.dataTransfer.files).find((file) => file.type.startsWith("image/"));
    if (imageFile) {
      setImageFromFile(imageFile);
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

  // Wrapper layout with transition based on hasStarted
  return (
    <div className="h-screen overflow-hidden bg-[#0a0a0a] font-sans text-white">
      <div className="flex h-full min-h-0 flex-col pb-16 lg:flex-row lg:pb-0">
        <section
          className={cn(
            "min-h-0 flex-col border-white/10 bg-[#0a0a0a] lg:flex lg:basis-[40%] lg:border-r",
            mobilePanel === "chat" ? "flex flex-1" : "hidden lg:flex"
          )}
        >
          <ChatPanel
            value={input}
            messages={messages}
            attachedImage={attachedImage}
            isGenerating={generating}
            isLoading={isLoading}
            isDragging={isDragging}
            textareaRef={textareaRef}
            imageInputRef={imageInputRef}
            onValueChange={(nextValue) => {
              setInput(nextValue);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onSend={() => {
              void handleSend();
            }}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onImageInputChange={handleImageInputChange}
            onImageButtonClick={() => imageInputRef.current?.click()}
            onRemoveImage={removeAttachedImage}
            onCopy={handleCopyText}
            onRegenerate={() => {
              void handleRegenerate();
            }}
            messagesEndRef={messagesEndRef}
          />
        </section>

        <section
          className={cn(
            "min-h-0 flex-col bg-[#0a0a0a] lg:flex lg:basis-[60%]",
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
            onEditorTabChange={(tab) => {
              setEditorTab(tab);
              setMobilePanel(tab);
            }}
            onPreviewSizeChange={setPreviewSize}
            onRefreshPreview={() => setPreviewRefreshKey((current) => current + 1)}
            onPublish={handlePublish}
            onDownloadZip={() => {
              void handleDownloadZip();
            }}
            onOpenPreview={handleOpenPreview}
            onFileSelect={setActiveFilePath}
            onCopyCode={() => {
              void handleCopyText(activeFile.content);
            }}
          />
        </section>
      </div>

      <MobilePanelTabs
        activePanel={mobilePanel}
        onPanelChange={(panel) => {
          setMobilePanel(panel);
          if (panel === "preview" || panel === "code") {
            setEditorTab(panel);
          }
        }}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed right-4 bottom-4 z-50 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white shadow-2xl shadow-black/40">
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
  isGenerating: boolean;
  isLoading: boolean;
  isDragging: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  imageInputRef: RefObject<HTMLInputElement | null>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onValueChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onImageInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageButtonClick: () => void;
  onRemoveImage: () => void;
  onCopy: (text: string) => void;
  onRegenerate: () => void;
}

function ChatPanel({
  value,
  messages,
  attachedImage,
  isGenerating,
  isLoading,
  isDragging,
  textareaRef,
  imageInputRef,
  messagesEndRef,
  onValueChange,
  onKeyDown,
  onPaste,
  onSend,
  onDrop,
  onDragOver,
  onDragLeave,
  onImageInputChange,
  onImageButtonClick,
  onRemoveImage,
  onCopy,
  onRegenerate,
}: ChatPanelProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Laptop className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Oni</span>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
          Llama 3.3 70B
        </span>
      </header>

      <div className="min-h-0 flex-1 flex flex-col justify-end space-y-6 overflow-y-auto px-5 py-5 scrollbar-hidden">
        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage key={message.id} message={message} />
          ) : (
            <AssistantMessage
              key={message.id}
              message={message}
              onCopy={() => onCopy(message.content)}
              onRegenerate={onRegenerate}
            />
          )
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#0a0a0a] p-4">
        <ChatComposer
          value={value}
          attachedImage={attachedImage}
          isGenerating={isGenerating}
          isDragging={isDragging}
          textareaRef={textareaRef}
          imageInputRef={imageInputRef}
          onValueChange={onValueChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onSend={onSend}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onImageInputChange={onImageInputChange}
          onImageButtonClick={onImageButtonClick}
          onRemoveImage={onRemoveImage}
        />
      </div>
    </>
  );
}

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex animate-[fadeSlideUp_200ms_ease-out] justify-end">
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
        {message.content && (
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm leading-6 text-white">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}

function AssistantMessage({
  message,
  onCopy,
  onRegenerate,
}: {
  message: ChatMessage;
  onCopy: () => void;
  onRegenerate: () => void;
}) {
  const [thoughtOpen, setThoughtOpen] = useState(false);

  return (
    <div className="animate-[fadeSlideUp_200ms_ease-out]">
      <span className="text-xs text-white/35 font-medium">Oni</span>
      <p className="mt-1 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-white">
        {message.content}
      </p>

      <div className="mt-3 flex flex-col gap-3">
        {message.thought && (
          <div className="max-w-3xl rounded-xl border border-white/10 bg-white/[0.03]">
            <button
              type="button"
              onClick={() => setThoughtOpen((current) => !current)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-white/55 transition-colors duration-200 ease-in-out hover:text-white/80"
            >
              {thoughtOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              Thought Process
            </button>
            {thoughtOpen && <p className="px-3 pb-3 text-xs leading-6 text-white/45">{message.thought}</p>}
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <IconButton label="Copy response" onClick={onCopy}>
            <Copy className="h-4 w-4" />
          </IconButton>
          <IconButton label="Regenerate response" onClick={onRegenerate}>
            <RotateCcw className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function AssistantThinking() {
  return (
    <div className="animate-[fadeSlideUp_200ms_ease-out]">
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
  isGenerating: boolean;
  isDragging: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  imageInputRef: RefObject<HTMLInputElement | null>;
  onValueChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onImageInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageButtonClick: () => void;
  onRemoveImage: () => void;
};

function ChatComposer({
  value,
  attachedImage,
  isGenerating,
  isDragging,
  textareaRef,
  imageInputRef,
  onValueChange,
  onKeyDown,
  onPaste,
  onSend,
  onDrop,
  onDragOver,
  onDragLeave,
  onImageInputChange,
  onImageButtonClick,
  onRemoveImage,
}: ChatComposerProps) {
  const canSend = Boolean(value.trim() || attachedImage) && !isGenerating;

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
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageInputChange}
      />

      {attachedImage && (
        <div className="border-b border-white/10 px-3 pt-3">
          <div className="relative mb-3 inline-flex overflow-hidden rounded-lg border border-white/10 bg-black">
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
        </div>
      )}

      <div className="flex items-end gap-2 px-3 py-3">
        <div className="flex shrink-0 items-center gap-1 pb-2">
          <IconButton label="Attach file">
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
            <ArrowUpIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Voice input"
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
}: WorkspacePanelProps) {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <div className="flex h-full items-center gap-5">
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
        ) : (
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

function buildProjectFiles(brief: string): ProjectFile[] {
  const cleanBrief = brief.replace(/\s+/g, " ").trim() || "AI generated website";
  const briefLiteral = JSON.stringify(cleanBrief);

  return [
    {
      path: "src/app/page.tsx",
      label: "app/page.tsx",
      language: "tsx",
      content: `import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";

const projectBrief = ${briefLiteral};

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero brief={projectBrief} />
      <Pricing />
      <CTA />
    </main>
  );
}
`,
    },
    {
      path: "src/components/Hero.tsx",
      label: "components/Hero.tsx",
      language: "tsx",
      content: `type HeroProps = {
  brief: string;
};

export function Hero({ brief }: HeroProps) {
  return (
    <section className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-6 py-24">
      <p className="mb-4 text-sm uppercase tracking-[0.28em] text-cyan-300">Built with Oni</p>
      <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
        {brief}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
        A production-ready website generated from a simple prompt, ready to refine and publish.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black" href="#pricing">
          View pricing
        </a>
        <a className="rounded-full border border-white/15 px-5 py-3 text-sm text-white" href="#demo">
          See demo
        </a>
      </div>
    </section>
  );
}
`,
    },
    {
      path: "src/components/Pricing.tsx",
      label: "components/Pricing.tsx",
      language: "tsx",
      content: `const plans = ["Starter", "Growth", "Scale"];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto grid max-w-6xl gap-4 px-6 py-16 md:grid-cols-3">
      {plans.map((plan) => (
        <article key={plan} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">{plan}</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Launch fast with clean sections, responsive styling, and publish-ready code.
          </p>
          <p className="mt-6 text-3xl font-semibold">$29</p>
        </article>
      ))}
    </section>
  );
}
`,
    },
    {
      path: "src/components/CTA.tsx",
      label: "components/CTA.tsx",
      language: "tsx",
      content: `export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 md:p-12">
        <h2 className="max-w-2xl text-3xl font-semibold md:text-5xl">Ready to ship the first version?</h2>
        <p className="mt-4 max-w-xl text-white/55">Edit the code, preview every breakpoint, and publish when it feels right.</p>
      </div>
    </section>
  );
}
`,
    },
    {
      path: "src/app/globals.css",
      label: "app/globals.css",
      language: "css",
      content: `@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #0a0a0a;
  font-family: Inter, system-ui, sans-serif;
}
`,
    },
    {
      path: "public/favicon.svg",
      label: "favicon.svg",
      language: "html",
      content: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="18" fill="#0A0A0A"/>
  <path d="M18 32C18 24.268 24.268 18 32 18C39.732 18 46 24.268 46 32C46 39.732 39.732 46 32 46C24.268 46 18 39.732 18 32Z" stroke="white" stroke-width="4"/>
</svg>
`,
    },
    {
      path: "package.json",
      label: "package.json",
      language: "json",
      content: `{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}
`,
    },
  ];
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
