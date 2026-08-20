// src/lib/knowledge.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define what a parsed document looks like
export type KnowledgeDocument = {
  id: string;
  category: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
};

// Target the knowledge directory at the root of the project
const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");

/**
 * Recursively reads all markdown files in a directory
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".md")) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * Parses all markdown files into structured knowledge documents
 */
export function getKnowledgeBase(): KnowledgeDocument[] {
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    console.warn("Knowledge directory not found!");
    return [];
  }

  const files = getAllFiles(KNOWLEDGE_DIR);

  return files.map((filePath) => {
    // Read the file contents
    const fileContents = fs.readFileSync(filePath, "utf8");
    
    // Parse the frontmatter and the markdown body
    const { data: metadata, content } = matter(fileContents);
    
    // Determine the category based on the folder name (e.g., 'projects', 'persona')
    const relativePath = path.relative(KNOWLEDGE_DIR, filePath);
    const category = path.dirname(relativePath).split(path.sep)[0] || "general";
    
    // Use the filename as a unique ID
    const id = path.basename(filePath, ".md");

    return {
      id,
      category,
      title: metadata.title || metadata.name || id,
      content: content.trim(),
      metadata,
    };
  });
}