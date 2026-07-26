"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useLocalRuntime } from "@assistant-ui/core/react";
import { AssistantModal } from "~/components/assistant-modal";

function getLastUserMessageText(messages: readonly { role: string; content: readonly { type: string; text?: string }[] }[]) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === "user") {
      for (const part of msg.content) {
        if (part.type === "text" && part.text) return part.text;
      }
    }
  }
  return "";
}

const dummyAdapter = {
  async run({ messages }: { messages: readonly { role: string; content: readonly { type: string; text?: string }[] }[] }) {
    const lastMessage = getLastUserMessageText(messages);
    const reply = lastMessage
      ? `You said: "${lastMessage}" — this is a dummy reply. Connect an AI model for real responses.`
      : "Hello! This is a dummy assistant. Connect an AI model to make me useful.";
    return { content: [{ type: "text" as const, text: reply }] };
  },
};

export function Assistant() {
  const runtime = useLocalRuntime(dummyAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModal />
    </AssistantRuntimeProvider>
  );
}
