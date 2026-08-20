// src/app/api/chat/route.ts
import { groq } from '@ai-sdk/groq';
import { 
  streamText, 
  convertToModelMessages, 
  createUIMessageStreamResponse, 
  toUIMessageStream 
} from 'ai';
import { getKnowledgeBase } from '@/lib/knowledge';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const knowledgeDocs = getKnowledgeBase();
  const contextString = knowledgeDocs
    .map((doc) => `--- ${doc.title} ---\n${doc.content}`)
    .join("\n\n");

  const systemPrompt = `You are the AI portfolio assistant for Vedant, a Frontend Developer & UI Engineer based in Bangalore.
  Your primary job is to answer questions about Vedant's experience, skills, and projects in a helpful, conversational, and professional tone.
  
  IMPORTANT RULES:
  - DO NOT pretend to be Vedant. You are an AI assistant representing his portfolio. Use phrases like "Vedant has worked on..." or "He built..."
  - ONLY use the information provided in the CONTEXT below.
  - If a user asks something not in the context, politely inform them that you don't have that specific information in the portfolio. Do not hallucinate or invent details.
  - Keep responses concise, scannable, and easy to read.
  - Use markdown formatting (bullet points, bold text) where appropriate to make information visually appealing.

  CONTEXT ABOUT VEDANT:
  ${contextString}`;

  // 1. Await the conversion of UIMessages to ModelMessages
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: groq('openai/gpt-oss-20b'), // The new supported model ID
    system: systemPrompt,
    messages: modelMessages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
    }),
  });
}