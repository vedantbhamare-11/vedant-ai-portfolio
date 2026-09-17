---
title: "Project: WordSense AI"
type: project
visibility: public
tier: 1
ownership: solo
status: live
voice: first-person
last_updated: 2026-09-17
version: 3.0
note: Corrected after re-architecture — model and delivery mechanism changed from the original build (Groq/Llama, SSE streaming) to the current production system (Groq-hosted GPT-OSS, request/response).
---
# WordSense AI

**Link:** https://chromewebstore.google.com/detail/wordsense/mnbcfmjkkeojdmhjcbelnijejfipehdj
**Repository:** https://github.com/vedantbhamare-11/WordSense-AI

## Overview

A Chrome extension for context-aware reading. Highlight a word or short phrase on any page
and a concise, domain-tuned definition appears in a tooltip. Built solo. Live on the Chrome
Web Store.

The system was re-architected after its initial build: the original version used Groq LPUs
running Llama 3.1 with server-sent-event streaming. The current production version still
runs on Groq's LPU hardware, but serves OpenAI's open-weight GPT-OSS models instead, and
returns a definition as a single request/response rather than streaming it.

## Problem

Reading technical documentation, papers or articles means constantly breaking flow to look
something up. Dictionary lookups also handle technical language badly: they miss modern
acronyms, they cannot resolve a word that means different things in different fields, and
they treat idioms word by word.

## My contribution

Everything. The extension, the backend inference service, the deployment, the prompt
design, and the re-architecture from the original streaming design to the current one are
all mine.

## Overall system architecture

```
User highlights text
  → selection validation (3–60 chars, max 4 words)
  → debounce
  → content script captures the string
  → background service worker (secure bridge, avoids page CSP restrictions)
  → Dockerised Flask container on Hugging Face Spaces
  → Groq inference: gpt-oss-20b (primary), gpt-oss-120b (fallback)
  → HTTPS response returned to the extension
  → definition rendered into a text-only tooltip
```

## Technologies I personally used

Vanilla JavaScript (ES6+), Chrome Extension Manifest V3, background service workers,
Python 3, Flask, Flask-CORS, Gunicorn, Docker, Hugging Face Spaces, Groq API, OpenAI
GPT-OSS-20B with GPT-OSS-120B fallback.

## Engineering challenges

**Content Security Policy.** Sites like GitHub, Dev.to and Medium enforce CSP headers that
block injected scripts from making external fetch requests. Routing all network calls
through the extension's background service worker solves this, because the service worker
operates at browser level rather than inside the page's security context.

**Rendering untrusted model output.** Definitions render via safe text-based DOM operations
rather than inserting raw HTML. If the model returns HTML, script tags, or a
prompt-injection payload picked up from the page, the browser renders it as inert text.
This mattered more than it first appeared, since the input to the model is arbitrary text
from arbitrary websites.

**Not hammering the API.** Selection events are debounced before a request fires. An
in-flight request is cancelled the moment the user deselects, clicks away, switches tabs,
or starts another lookup. A local cache short-circuits repeat lookups of the same term
entirely.

**Re-architecting without breaking the extension's contract.** Moving from a streaming
SSE response to a plain request/response meant the extension's rendering path no longer
needed a typewriter effect, but the debounce, cancellation, and caching logic all had to
keep working unchanged, since none of that is specific to how the response arrives.

## Important decisions and tradeoffs

- **Moving off streaming.** The original SSE design added real complexity — a render loop
  tied to token arrival, cancellation semantics for a partially-streamed response — for a
  UX benefit that mattered less once response latency was already low. Simplifying to
  request/response reduced the client-side surface area at a small cost to perceived speed.
- **GPT-OSS over Llama.** Chosen for the current production deployment; both are served on
  Groq's infrastructure, so the switch was a model change, not an infrastructure change.
- **Vanilla JavaScript, no framework.** Extension bundle size directly affects install
  friction and injection cost on every page. A framework would have bought nothing here.
- **Manifest V3 with minimal permissions** — `storage`, `activeTab`, explicit host matches.
- **Selection limits of 3–60 characters and four words.** Permissive enough for idioms,
  restrictive enough to stop someone accidentally sending a whole paragraph for inference.

## Outcome

Live on the Chrome Web Store. Domain profiles (Computer Science, Law, Medicine, Science,
and custom ones) shift the system prompt so that polysemous terms resolve correctly. It
also handles acronyms absent from static dictionaries, multi-word idioms, and non-English
phrases embedded in English text.

> **Do not describe this as streaming.** The current production version returns a single
> response per lookup. If asked about response speed, describe it qualitatively
> ("responses return quickly enough not to interrupt reading") rather than citing a
> tokens-per-second figure, since that framing no longer applies to how the system works.

## What I learned

That most of the engineering in an LLM product is not the model call. Debouncing,
cancellation, caching, output sanitisation and permission scoping took far more work than
the inference itself. I also learned that an architecture choice made early (streaming)
isn't permanent — simplifying it later, once I understood the actual UX tradeoff, was the
right call rather than a sunk cost to defend.
