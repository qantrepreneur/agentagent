import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import env from "@/lib/env";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
  });

  return result.toDataStreamResponse();
}
