import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getModel } from "@/lib/ai/model";

// Streaming-Chat-Endpoint (Muster C). Wird von useChat (Default /api/chat) aufgerufen.
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const result = streamText({
    model: getModel(),
    messages: await convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
