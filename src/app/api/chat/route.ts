// src/app/api/chat/route.ts
import { z } from "zod";
import { groq } from "@ai-sdk/groq";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  tool,
} from "ai";
import { getKnowledgeBase } from "@/lib/knowledge";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const knowledgeDocs = getKnowledgeBase();
  const contextString = knowledgeDocs
    .map((doc) => `--- ${doc.title} ---\n${doc.content}`)
    .join("\n\n");

  const systemPrompt = `You are the AI version of Vedant Bhamare, a Frontend Developer & UI Engineer based in Bangalore. 
  Your primary job is to talk to visitors and recruiters about your experience, skills, and projects in a helpful, conversational, and professional tone.
  
  IMPORTANT RULES:
  1. FIRST PERSON: You must speak in the first person ("I", "me", "my"). You are answering as Vedant himself, interacting directly with the user.
  2. ONLY use the information provided in the CONTEXT below.
  3. PROFILE PICTURE: When a user asks "Tell me about yourself", asks for an introduction, or wants to know who you are, you MUST include your profile picture at the very top of your response. You must use this exact markdown: ![Vedant Bhamare](https://raw.githubusercontent.com/vedantbhamare-11/Portfolio-nextjs/main/public/personal/profile-pic.jpeg)
  4. OUT OF SCOPE QUERIES: If a user asks something completely unrelated to your professional background (e.g., "What is a planet?", "Write me a poem"), DO NOT try to answer it. Instead, politely and professionally reply that you are exclusively programmed to discuss your portfolio, work, and skills, and steer the conversation back.
5. PROJECT CARDS: When the user asks about your projects, you may write a brief 1-sentence introduction, but you MUST use the 'showProjectCard' tool to display the actual projects. Do not write out project descriptions in normal text.
  CONTEXT ABOUT ME (VEDANT):
  ${contextString}`;

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    // CHANGE THIS TO THE STABLE 8B MODEL:
    model: groq("openai/gpt-oss-20b"),
    system: systemPrompt,
    messages: modelMessages,
    tools: {
      showProjectCard: tool({
        description:
          "Display a visual project card. Call this tool whenever the user asks about a specific project or wants to see your work.",
        inputSchema: z.object({
          title: z.string().describe("The name of the project"),
          description: z
            .string()
            .describe("A 1-2 sentence description of the project"),
          technologies: z
            .array(z.string())
            .describe("An array of technologies used (e.g. React, Next.js)"),
          link: z
            .string()
            .url()
            .optional()
            .describe("The github or live URL if available"),
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
