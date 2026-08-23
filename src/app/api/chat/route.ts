import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "@/lib/chat-config";

// -----------------------------------------------------
// Initialize Gemini
// -----------------------------------------------------

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

// -----------------------------------------------------
// Initialize Pinecone
// -----------------------------------------------------

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pc.index("portfolio-index");

// -----------------------------------------------------
// POST /api/chat
// -----------------------------------------------------

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // -------------------------------------------------
    // Normalize incoming AI SDK messages
    // -------------------------------------------------

    const cleanMessages = messages
      .map((m: any) => {
        let textContent = "";

        if (typeof m.content === "string") {
          textContent = m.content;
        } else if (Array.isArray(m.parts)) {
          textContent = m.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join(" ");
        } else if (
          typeof m.content === "object" &&
          m.content !== null
        ) {
          textContent = m.content.text || "";
        }

        return {
          role:
            m.role === "assistant"
              ? "assistant"
              : "user",
          content: textContent,
        };
      })
      .filter((m: any) => m.content.trim().length > 0);

    // -------------------------------------------------
    // Get latest USER message
    // -------------------------------------------------

    const latestUserMessage =
      [...cleanMessages]
        .reverse()
        .find(
          (message: {
            role: string;
            content: string;
          }) => message.role === "user"
        )?.content ||
      "Tell me about Vedant's projects.";

    console.log(
      "========================================"
    );

    console.log(
      "USER QUERY:",
      latestUserMessage
    );

    // -------------------------------------------------
    // Generate Gemini embedding
    // -------------------------------------------------

    const embeddingModel =
      genAI.getGenerativeModel({
        model: "gemini-embedding-001",
      });

    const embeddingResult =
      await embeddingModel.embedContent(
        latestUserMessage
      );

    const queryVector =
      embeddingResult.embedding.values.slice(0, 768);

    console.log(
      "Embedding generated:",
      queryVector.length
    );

    // -------------------------------------------------
    // Search Pinecone
    // -------------------------------------------------

    const searchResults = await index.query({
      vector: queryVector,
      topK: 3,
      includeMetadata: true,
    });

    console.log(
      "Pinecone matches:",
      searchResults.matches.length
    );

    // -------------------------------------------------
    // Extract retrieved project context
    // -------------------------------------------------

    const retrievedContext =
      searchResults.matches
        .map((match: any) => {
          return match.metadata?.text;
        })
        .filter(
          (text: unknown): text is string =>
            typeof text === "string" &&
            text.trim().length > 0
        )
        .join("\n\n---\n\n");

    console.log(
      "Retrieved context preview:",
      retrievedContext.substring(0, 1000)
    );

    // -------------------------------------------------
    // Build RAG system prompt
    // -------------------------------------------------

    const ragSystemPrompt = `
${systemPrompt}

You have access to the following information retrieved
from Vedant's portfolio knowledge base.

<retrieved_context>
${retrievedContext || "No relevant project context was found."}
</retrieved_context>

IMPORTANT INSTRUCTIONS:

1. Use the retrieved context when answering questions
   about Vedant's projects, experience, skills, or
   technical architecture.

2. Do not invent technical details that are not present
   in the retrieved context or the system instructions.

3. If the user asks about a specific project, provide
   a detailed technical explanation when the retrieved
   context contains enough information.

4. Structure technical answers clearly using:
   - Overview
   - Architecture
   - Technologies
   - How it works
   - Key technical decisions
   - Challenges / results
   when applicable.

5. If the retrieved context does not contain enough
   information to answer a specific question, be honest
   about what is available instead of making up details.

6. You are Vedant's portfolio assistant, so always
   answer in the context of Vedant's work.

7. Keep normal answers concise, but when the user asks
   "explain in detail", provide a thorough technical
   explanation.
`;

    // -------------------------------------------------
    // Generate response with Groq
    // -------------------------------------------------

    console.log(
      "Sending request to Groq..."
    );

    const result = await streamText({
      model: groq("openai/gpt-oss-20b"),
      system: ragSystemPrompt,
      messages: cleanMessages,
      temperature: 0.3,
    });

    console.log(
      "Groq streaming started."
    );

    // -------------------------------------------------
    // Return AI SDK UI message stream
    // -------------------------------------------------

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "Chat API Error:",
      error
    );

    console.error(
      "========================================"
    );

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Failed to process chat request",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}