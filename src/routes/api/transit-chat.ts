import { createFileRoute } from "@tanstack/react-router";
import { handleTransitChat } from "@/lib/ai/transit-chat.server";

export const Route = createFileRoute("/api/transit-chat")({
  server: { handlers: { POST: ({ request }) => handleTransitChat(request) } },
});
