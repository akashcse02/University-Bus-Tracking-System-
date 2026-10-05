import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { FLEET, ROUTES } from "@/lib/bus-fleet";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

function systemPrompt() {
  const routes = ROUTES.map((r) => `- ${r.name}: ${r.stops.map((s) => s.name).join(" → ")}`).join("\n");
  const buses = FLEET.map(
    (b) => `- ${b.number} (${b.label}) on ${b.routeName} route — status: ${b.status}, next stop: ${b.nextStop}, ETA: ${b.eta}${b.premium ? " — reserved for staff & teachers" : ""}`,
  ).join("\n");
  return `You are the PUB Bus Track transit assistant for Pundra University (Bogura, Bangladesh) students.
Answer questions about university buses, routes, stops and schedules concisely and helpfully.
Reply in the same language the student writes in (English, Bangla or Arabic).
Only use the data below; if something is unknown (e.g. exact exam-day timings), say so and suggest checking the Time Schedule or Live Location pages.

Routes and stops:
${routes}

Fleet (current status snapshot):
${buses}

Pages: Live Location (/live-location) shows real-time bus positions, Time Schedule (/time-schedule) lists class and exam departure times, Buses (/buses) lists all buses by route.`;
}

export async function handleTransitChat(request: Request) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });

  let messages: UIMessage[];
  try {
    const body = (await request.json()) as { messages?: UIMessage[] };
    if (!Array.isArray(body.messages)) throw new Error();
    messages = body.messages.slice(-30);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system: systemPrompt(),
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      onError: (error) => {
        const status = (error as { statusCode?: number })?.statusCode;
        if (status === 429) return "Too many requests right now — please try again in a moment.";
        if (status === 402) return "AI credits are used up. Please contact the site admin.";
        return "Sorry, the assistant couldn't answer right now.";
      },
    }),
    runIdFetch,
  );
}
