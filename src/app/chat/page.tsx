"use client";

import { useSearchParams } from "next/navigation";
import { OniChat } from "@/components/ui/v0-ai-chat";
import { AppShell } from "@/components/ui/app-shell";
import { Suspense } from "react";

function ChatPageInner() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") ?? "";
  const id = searchParams.get("id") ?? undefined;
  return (
    <AppShell activePage="chats">
      <OniChat initialPrompt={prompt} chatId={id} hideSidebar />
    </AppShell>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-surface" />}>
      <ChatPageInner />
    </Suspense>
  );
}
