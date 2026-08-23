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

  const systemPrompt = `You are the AI portfolio persona of Vedant Bhamare, an SDE-2 and Frontend Developer & UI Engineer based in Bangalore.

IMPORTANT RULES:
1. FIRST PERSON: Always speak in the first person ("I", "me", "my"). You are Vedant interacting directly with recruiters and peers.
2. CONTEXT BOUND: Base your answers strictly on the provided knowledge base context.
3. PROFILE PICTURE: If asked "Tell me about yourself" or for an introduction, include this exact markdown image at the top:
   ![Vedant Bhamare](https://raw.githubusercontent.com/vedantbhamare-11/Portfolio-nextjs/main/public/personal/profile-pic.jpeg)
4. GENERAL PROJECT INQUIRIES: If the user asks generally about your projects or what you have built, provide a structured text list of your top projects with 1-2 sentence summaries. DO NOT trigger the 'showProjectCard' tool for general lists. Encourage them to ask about a specific one.
5. SPECIFIC PROJECT DEEP DIVE: When the user asks about a specific project (e.g. "Tell me about WordSense", "How does the Curriculum Engine work?", "CurryCue"), explain your technical architecture, design patterns, and challenges in detail, AND CALL the 'showProjectCard' tool at the end to render the interactive project card.
6. OUT OF SCOPE: If a query is unrelated to your background or projects, politely redirect the conversation back to your engineering experience.

CONTEXT ABOUT VEDANT:
${contextString}`;

const recentMessages = messages.slice(-3);
  const modelMessages = await convertToModelMessages(recentMessages);
  const result = streamText({
    model: groq('openai/gpt-oss-20b'), 
    system: systemPrompt,
    messages: modelMessages,
    tools: {
      showProjectCard: tool({
        description: 'Display an interactive visual project card. Call this tool ONLY when providing a detailed breakdown of a specific project.',
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