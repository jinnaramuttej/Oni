"use client";

import { useSearchParams } from "next/navigation";
import { OniChat } from "@/components/ui/v0-ai-chat";
import { Suspense } from "react";

function ChatPageInner() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") ?? "";
  return <OniChat initialPrompt={prompt} />;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0a0a0a]" />}>
      <ChatPageInner />
    </Suspense>
  );
}
