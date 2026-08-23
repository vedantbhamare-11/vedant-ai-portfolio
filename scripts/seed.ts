// scripts/seed.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Explicitly load .env.local
dotenv.config({ path: ".env.local" });

// 1. Initialize API Clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const index = pc.index("portfolio-index");

async function embedAndStore() {
  const directoryPath = path.join(process.cwd(), "knowledge/projects");
  const files = fs.readdirSync(directoryPath);

  console.log(
    `Found ${files.length} project files. Starting the RAG pipeline...`,
  );

  for (const file of files) {
    if (!file.endsWith(".md")) continue;

    const projectId = file.replace(".md", "");
    const content = fs.readFileSync(path.join(directoryPath, file), "utf-8");

    console.log(`Generating embedding for: ${projectId}...`);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
      const result = await model.embedContent(content);
      const embedding = result.embedding.values.slice(0, 768);
      await index.upsert({
        records: [
          {
            id: projectId,
            values: embedding,
            metadata: {
              project: projectId,
              text: content,
            },
          },
        ],
      });

      

      console.log(`✅ Successfully stored ${projectId} in Pinecone.`);
    } catch (error) {
      console.error(`❌ Failed to process ${projectId}:`, error);
    }
  }

  const experiencePath = path.join(process.cwd(), "knowledge/persona/experience.md");
  if (fs.existsSync(experiencePath)) {
    console.log("Generating embedding for professional experience...");
    try {
      const content = fs.readFileSync(experiencePath, "utf-8");
      const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
      const result = await model.embedContent(content);
      const embedding = result.embedding.values.slice(0, 768);

      await index.upsert({
        records: [
          {
            id: "experience",
            values: embedding,
            metadata: {
              source: "experience",
              text: content,
            },
          },
        ],
      });

      console.log("✅ Successfully stored professional experience in Pinecone.");
    } catch (error) {
      console.error("❌ Failed to process professional experience:", error);
    }
  }
  console.log(
    "🎉 All projects successfully embedded and stored in the Vector Database!",
  );
}

embedAndStore().catch(console.error);
