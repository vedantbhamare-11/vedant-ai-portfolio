// scripts/inspect-index.ts
//
// READ-ONLY Pinecone inspection. Performs NO upsert, update or delete.
// Run:  npx tsx scripts/inspect-index.ts
//
// Compares what is actually in the index against what the corrected
// knowledge base would produce, so you can decide whether any cleanup
// is needed before re-seeding.

import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import { getKnowledgeBase } from "../src/lib/knowledge";

dotenv.config({ path: ".env.local" });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

if (!PINECONE_API_KEY) {
  throw new Error("❌ PINECONE_API_KEY is missing from .env.local");
}

const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pc.index("portfolio-index");

/** Rebuilds the exact IDs the corrected seed pipeline would write. */
function expectedIds(): Map<string, string> {
  const map = new Map<string, string>();

  for (const doc of getKnowledgeBase()) {
    const visibility = String(doc.metadata?.visibility ?? "")
      .trim()
      .toLowerCase();

    // Mirror the seed script's fail-closed gate exactly.
    if (visibility !== "public") continue;

    const prefix = doc.category === "projects" ? "project" : "persona";
    map.set(`${prefix}-${doc.id}`, doc.source);
  }

  return map;
}

async function listAllIds(): Promise<string[]> {
  const ids: string[] = [];
  let paginationToken: string | undefined = undefined;

  do {
    const page = await index.listPaginated(
      paginationToken ? { paginationToken } : {},
    );

    for (const vector of page.vectors ?? []) {
      if (vector.id) ids.push(vector.id);
    }

    paginationToken = page.pagination?.next;
  } while (paginationToken);

  return ids.sort();
}

async function main() {
  console.log("🔍 READ-ONLY index inspection — no writes will occur\n");

  const stats = await index.describeIndexStats();

  console.log("📦 Index: portfolio-index");
  console.log(`   Total vectors: ${stats.totalRecordCount ?? "unknown"}`);
  console.log(`   Dimension:     ${stats.dimension ?? "unknown"}`);

  if (stats.namespaces && Object.keys(stats.namespaces).length > 0) {
    console.log("   Namespaces:");
    for (const [name, ns] of Object.entries(stats.namespaces)) {
      console.log(`     "${name}": ${ns.recordCount ?? 0} vectors`);
    }
  }

  const actual = await listAllIds();

  console.log(`\n📋 Vector IDs found in index (${actual.length}):`);
  for (const id of actual) console.log(`   ${id}`);

  const expected = expectedIds();

  console.log(`\n📄 Expected IDs from knowledge/ (${expected.size}):`);
  for (const [id, source] of [...expected].sort()) {
    console.log(`   ${id.padEnd(28)} ← ${source}`);
  }

  const actualSet = new Set(actual);

  const stale = actual.filter((id) => !expected.has(id));
  const missing = [...expected.keys()].filter((id) => !actualSet.has(id));
  const overwritten = [...expected.keys()].filter((id) => actualSet.has(id));

  console.log("\n────────────────────────────────");
  console.log(`✅ Will be OVERWRITTEN in place: ${overwritten.length}`);

  console.log(`\n🆕 NEW (not yet in index): ${missing.length}`);
  for (const id of missing) console.log(`   ${id}`);

  console.log(`\n⚠️  STALE (in index, no corresponding file): ${stale.length}`);
  for (const id of stale) console.log(`   ${id}`);

  console.log("\n────────────────────────────────");

  if (stale.length === 0) {
    console.log("✅ No stale vectors. No purge needed.");
    console.log("   Re-seed directly: npm run seed");
  } else {
    console.log("⚠️  Stale vectors present. Targeted removal only —");
    console.log("   do NOT use deleteAll. Review the IDs above first, then");
    console.log("   delete exactly those IDs with a one-liner you run manually:");
    console.log("");
    console.log(
      `   await index.deleteMany([${stale.map((id) => `"${id}"`).join(", ")}]);`,
    );
    console.log("");
    console.log("   This script will never delete anything itself.");
  }

  console.log("\n🔍 Inspection complete — nothing was modified.");
}

main().catch((error) => {
  console.error("\n❌ Inspection failed:");
  console.error(error);
  process.exit(1);
});
