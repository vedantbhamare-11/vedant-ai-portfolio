# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm start` — run production build
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npx tsx scripts/seed.ts` — re-embed `knowledge/**/*.md` and upsert into the Pinecone `portfolio-index` (requires `GEMINI_API_KEY` and `PINECONE_API_KEY` in `.env.local`)

There is no test suite in this repo.

## Architecture

This is a single-page conversational portfolio: one chat UI (`src/app/page.tsx`) backed by one RAG API route (`src/app/api/chat/route.ts`). There's no routing beyond the root page.

**Two response paths coexist for the same quick-action prompts, and they must stay in sync:**

1. **Preloaded** — `QUICK_ACTIONS` and `PRELOADED_RESPONSES` in `src/lib/chat-config.ts` are hardcoded (id → label/icon/prompt → canned markdown string). Clicking a quick action button matches on `id` and injects the canned response directly via `setMessages`, bypassing the API entirely (see `handleActionClick` in `page.tsx`).
2. **RAG** — free-typed questions go through `POST /api/chat`, which embeds the query with Gemini (`gemini-embedding-001`, truncated to 768 dims to match the Pinecone index), queries Pinecone `portfolio-index` (topK 3), stuffs the retrieved chunks into a system prompt, and streams a completion from Groq (`openai/gpt-oss-20b` via `@ai-sdk/groq` + `ai`'s `streamText`).

When adding a new quick action or editing an existing one, update `chat-config.ts`. When adding new facts about Vedant, add/edit files under `knowledge/persona/` or `knowledge/projects/` (frontmatter parsed via `gray-matter`, see `src/lib/knowledge.ts`) and re-run the seed script — `knowledge.ts`'s `getKnowledgeBase()` reads these files at runtime for reference, but the actual retrieval path at request time is Pinecone, not the filesystem, so editing markdown alone does not change chat answers until reseeded.

**Message rendering (`src/components/chat/ChatMessage.tsx`) keys custom UI off the message `id` prefix**, not message content: `preloaded-contact-*` mounts `SocialLinks`, `preloaded-photography-*` mounts `Photography`, `preloaded-fun-*` mounts `DevGame` (an in-chat mini game). These ids are set in `page.tsx`'s `handleActionClick` as `` `preloaded-${actionId}-${timestamp}` ``, so the mapping between a quick action's `id` and its mounted component lives in two files — keep them consistent when renaming an action id.

The assistant is instructed (system prompt in `chat-config.ts`) to always answer in first person as Vedant and to avoid inventing facts not present in retrieved context.

## Ingestion contract

Every file under `knowledge/` needs an explicit `visibility` frontmatter field.
The seed script fails closed: missing visibility = skipped with a warning,
never assumed public. Never weaken this gate. Files under `private/` are
gitignored and must never be moved into `knowledge/`.

## Working agreement

Understand before changing. Read the surrounding code and match its
architecture rather than imposing a preferred structure.

Find the root cause before editing. State your hypothesis and the evidence
for it. If you're guessing, say so.

Smallest change that solves the problem. Separate required from optional.

Don't optimise prematurely — no caching, queues, or abstraction layers unless
there's a demonstrated need.

Never commit secrets. Flag it if I'm about to introduce one.

I rarely write tests. When a change is risky, tell me what to test, and offer
to write it — don't silently skip it.
