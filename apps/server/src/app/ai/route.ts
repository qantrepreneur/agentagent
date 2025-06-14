import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import env from "@/lib/env";

export const maxDuration = 30;

const openRouter = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openRouter.chat("openai/gpt-4.1"),
    messages,
  });

  return result.toDataStreamResponse();
}
