// scripts/seed.ts

import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// ==========================================
// ENVIRONMENT VARIABLES
// ==========================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY is missing from .env.local");
}

if (!PINECONE_API_KEY) {
  throw new Error("❌ PINECONE_API_KEY is missing from .env.local");
}

// ==========================================
// INITIALIZE CLIENTS
// ==========================================

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const pc = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

const index = pc.index("portfolio-index");

const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});

// ==========================================
// EMBEDDING FUNCTION
// ==========================================

async function generateEmbedding(text: string) {
  const result = await embeddingModel.embedContent(text);

  // Your Pinecone index is currently configured for 768 dimensions.
  const embedding = result.embedding.values.slice(0, 768);

  if (embedding.length !== 768) {
    throw new Error(
      `Expected 768 dimensions but received ${embedding.length}`,
    );
  }

  return embedding;
}

// ==========================================
// STORE DOCUMENT
// ==========================================

async function embedAndStore(
  id: string,
  content: string,
  category: string,
  source: string,
) {
  console.log(`\n🔄 Generating embedding for: ${id}`);

  try {
    const embedding = await generateEmbedding(content);

    await index.upsert({
      records: [
        {
          id,
          values: embedding,
          metadata: {
            category,
            source,
            text: content,
          },
        },
      ],
    });

    console.log(`✅ Stored: ${id}`);
  } catch (error) {
    console.error(`❌ Failed to process ${id}:`, error);
  }
}

// ==========================================
// SEED PROJECTS
// ==========================================

async function seedProjects() {
  const directoryPath = path.join(
    process.cwd(),
    "knowledge/projects",
  );

  if (!fs.existsSync(directoryPath)) {
    console.log("⚠️ Projects directory not found.");
    return;
  }

  const files = fs
    .readdirSync(directoryPath)
    .filter((file) => file.endsWith(".md"));

  console.log(
    `\n📁 Found ${files.length} project knowledge files.`,
  );

  for (const file of files) {
    const projectId = file.replace(".md", "");

    const filePath = path.join(
      directoryPath,
      file,
    );

    const content = fs.readFileSync(
      filePath,
      "utf-8",
    );

    await embedAndStore(
      `project-${projectId}`,
      content,
      "project",
      `projects/${file}`,
    );
  }
}

// ==========================================
// SEED PERSONAL / PERSONA KNOWLEDGE
// ==========================================

async function seedPersona() {
  const directoryPath = path.join(
    process.cwd(),
    "knowledge/persona",
  );

  if (!fs.existsSync(directoryPath)) {
    console.log("⚠️ Persona directory not found.");
    return;
  }

  const files = fs
    .readdirSync(directoryPath)
    .filter((file) => file.endsWith(".md"));

  console.log(
    `\n👤 Found ${files.length} persona knowledge files.`,
  );

  for (const file of files) {
    const sourceId = file.replace(".md", "");

    const filePath = path.join(
      directoryPath,
      file,
    );

    const content = fs.readFileSync(
      filePath,
      "utf-8",
    );

    await embedAndStore(
      `persona-${sourceId}`,
      content,
      "persona",
      `persona/${file}`,
    );
  }
}

// ==========================================
// MAIN SEED FUNCTION
// ==========================================

async function main() {
  console.log("==========================================");
  console.log("🚀 Starting Portfolio RAG Seed");
  console.log("==========================================");

  console.log("\n📦 Pinecone index: portfolio-index");
  console.log("🧠 Embedding model: gemini-embedding-001");
  console.log("📐 Embedding dimensions: 768");

  await seedProjects();

  await seedPersona();

  console.log("\n==========================================");
  console.log("🎉 RAG SEEDING COMPLETE");
  console.log("==========================================");
}

main().catch((error) => {
  console.error("\n❌ Seed process failed:");
  console.error(error);
  process.exit(1);
});