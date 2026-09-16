---
title: "Project: WordSense AI"
type: project
visibility: public
tier: 1
ownership: solo
status: live
voice: first-person
last_updated: 2026-09-14
version: 2.0
---

# WordSense AI

**Link:** https://chromewebstore.google.com/detail/wordsense/mnbcfmjkkeojdmhjcbelnijejfipehdj

## Overview

A Chrome extension for context-aware reading. Highlight a word or short phrase on any page
and a concise, domain-tuned definition streams into a tooltip in place. Built solo. Live
on the Chrome Web Store.

## Problem

Reading technical documentation, papers or articles means constantly breaking flow to look
something up. Dictionary lookups also handle technical language badly: they miss modern
acronyms, they cannot resolve a word that means different things in different fields, and
they treat idioms word by word.

## My contribution

Everything. The extension, the backend inference service, the deployment, and the prompt
design are all mine.

## Overall system architecture

```
User highlights text
  → selection validation (3–60 chars, max 4 words)
  → 300ms debounce
  → content script captures the string
  → background service worker (secure bridge, avoids page CSP restrictions)
  → Dockerised Flask container on Hugging Face Spaces
  → Groq LPU inference (Llama-3.1-8B-Instant)
  → server-sent events stream back
  → typewriter render into a .textContent sandbox
  → tooltip in the viewport
```

## Technologies I personally used

Vanilla JavaScript (ES6+), Chrome Extension Manifest V3, background service workers,
server-sent events, Python 3, Flask, Gunicorn, Docker, Hugging Face Spaces, Groq LPUs,
Meta Llama-3.1-8B-Instant with failover to Llama-3.3-70b-versatile.

## Engineering challenges

**Content Security Policy.** Sites like GitHub, Dev.to and Medium enforce CSP headers that
block injected scripts from making external fetch requests. Routing all network calls
through the extension's background service worker solves this, because the service worker
operates at browser level rather than inside the page's security context.

**Rendering untrusted model output.** Stream chunks render via `.textContent` rather than
`.innerHTML`. If the model returns HTML, script tags, or a prompt-injection payload picked
up from the page, the browser renders it as inert text. This mattered more than it first
appeared, since the input to the model is arbitrary text from arbitrary websites.

**Not hammering the API.** A 300ms debounce absorbs double-clicks and cursor dragging. An
`AbortController` cancels the in-flight stream the moment the user deselects, clicks away,
switches tabs, or starts another lookup. An in-memory cache short-circuits repeat lookups
of the same term entirely.

**Keeping answers short.** The backend pins `temperature = 0.1` and `max_tokens = 64`,
which forces single-sentence definitions and keeps token use predictable.

## Important decisions and tradeoffs

- **Groq over a general-purpose API.** Chosen specifically for inference speed, since a
  definition that arrives slowly defeats the point of not breaking reading flow.
- **Vanilla JavaScript, no framework.** Extension bundle size directly affects install
  friction and injection cost on every page. A framework would have bought nothing here.
- **Manifest V3 with minimal permissions** — `storage`, `activeTab`, explicit host matches.
  Broader permissions trigger scarier install warnings, which matter for adoption.
- **Selection limits of 3–60 characters and four words.** Permissive enough for idioms,
  restrictive enough to stop someone accidentally sending a whole paragraph for inference.

## Outcome

Live on the Chrome Web Store. Domain profiles (Computer Science, Law, Medicine, Science,
and custom ones) shift the system prompt so that polysemous terms resolve correctly —
"pipeline" gives CI/CD under a CS profile and sales forecasting under finance. It also
handles acronyms absent from static dictionaries, multi-word idioms, and non-English
phrases embedded in English text.

> **Performance note.** Streaming throughput has not been formally benchmarked. The system
> is designed for low-latency streamed LLM responses using Groq. Earlier versions of this
> file quoted a specific tokens-per-second figure; that was an estimate and has been
> removed pending measurement.

## What I learned

That most of the engineering in an LLM product is not the model call. Debouncing,
cancellation, caching, output sanitisation and permission scoping took far more work than
the inference itself, and they are what determine whether the thing feels good to use.
