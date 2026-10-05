import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { BusFront } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

const SUGGESTIONS = ["Which buses go to Sherpur?", "Is any bus delayed right now?", "Stops on the Gobindaganj route?"];

export function TransitAssistant() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/transit-chat" }),
    onError: (e) => toast.error(e.message || "The assistant couldn't answer right now."),
  });
  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <Card className="flex h-[520px] flex-col overflow-hidden rounded-[2rem]">
      <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <BusFront className="h-5 w-5" />
        </span>
        <div>
          <CardTitle className="font-display text-xl">Transit Assistant</CardTitle>
          <p className="text-xs text-muted-foreground">Ask about buses, routes & schedules · AI-powered</p>
        </div>
      </CardHeader>

      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<BusFront className="h-8 w-8 text-primary" />}
              title="Where are you headed?"
              description="Ask anything about PUB buses."
            >
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageContent>
                  {m.parts.map((p, i) =>
                    p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : null,
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && <p className="text-sm text-muted-foreground animate-pulse">Checking the routes…</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t p-3">
        <PromptInput onSubmit={(msg) => send(msg.text ?? "")}>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="e.g. When does Bus 04 reach Sathmatha?"
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && !input.trim()} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </Card>
  );
}
