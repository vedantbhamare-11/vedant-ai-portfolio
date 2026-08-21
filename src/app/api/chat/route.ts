// src/app/api/chat/route.ts
import { z } from 'zod';
import { groq } from '@ai-sdk/groq';
import { 
  streamText, 
  convertToModelMessages, 
  createUIMessageStreamResponse, 
  toUIMessageStream,
  tool 
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
  - DO NOT pretend to be Vedant. You are an AI assistant representing his portfolio.
  - ONLY use the information provided in the CONTEXT below.
  - When the user asks about a project, YOU MUST ONLY CALL THE 'showProjectCard' TOOL. 
  - DO NOT describe the project in normal text or markdown tables. Stop talking and just trigger the tool.

  CONTEXT ABOUT VEDANT:
  ${contextString}`;

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    // Using the Qwen model that your account has access to!
    model: groq('qwen/qwen3.6-27b'), 
    system: systemPrompt,
    messages: modelMessages,
    tools: {
      showProjectCard: tool({
        description: 'Display a visual project card. Call this tool whenever the user asks about a specific project or wants to see your work.',
        inputSchema: z.object({
          title: z.string().describe('The name of the project'),
          description: z.string().describe('A 1-2 sentence description of the project'),
          technologies: z.array(z.string()).describe('An array of technologies used (e.g. React, Next.js)'),
          link: z.string().url().optional().describe('The github or live URL if available'),
        }),
        execute: async (args) => {
          return args; 
        },
      }),
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
    }),
  });
}