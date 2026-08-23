
# Project: WordSense AI

* **Title:** WordSense AI
* **Description:** A lightweight, zero-latency Chrome extension engineered for context-aware reading. Highlight any word or multi-word phrase on any webpage to instantly stream concise, domain-tuned definitions powered by Groq LPUs and Meta Llama 3.1.
* **Technologies:** Vanilla JavaScript (ES6+), Chrome Extension API (Manifest V3), Python 3, Flask, Gunicorn, Docker, Groq LPUs, Meta Llama-3.1-8B-Instant
* **Link:** https://chromewebstore.google.com/detail/wordsense/mnbcfmjkkeojdmhjcbelnijejfipehdj

## Deep Dive & Architectural Context for AI Knowledge

### Core Purpose & Inference Performance

WordSense AI is an active reading companion designed to eliminate context switching while reading technical documentation, research papers, or articles.

* **Streaming Engine:** Powered by Groq's high-speed Language Processing Units (LPUs) running `Meta Llama-3.1-8B-Instant` (with an automated failover tier to `Llama-3.3-70b-versatile`).
* **Throughput:** Delivers real-time server-sent event (SSE) streaming at **500+ tokens per second** using a custom typewriter rendering loop powered by `requestAnimationFrame`.

---

### Architecture & Security Engineering

* **Content Security Policy (CSP) Bypass:** Modern enterprise platforms (e.g., GitHub, Dev.to, Medium) enforce strict CSP headers that block client-side scripts from making unauthorized external fetch requests. WordSense bypasses this by routing all network telemetry through an isolated browser-level **Background Service Worker**.
* **Injection-Proof DOM Sandbox:** Incoming stream chunks are rendered strictly via non-executable `.textContent` DOM nodes rather than `.innerHTML`. Even if an AI response contains raw HTML, scripts, or malicious prompt injection payloads, the browser safely renders it as inert string text.
* **Manifest V3 Compliance:** Built strictly within the Chrome Manifest V3 standard with minimal, granular permission scopes (`storage`, `activeTab`, and explicit host matches) to avoid triggering aggressive browser permission warnings during installation.

---

### Leak-Proof Resource Management & Optimizations

* **AbortController Sentinel Loop:** Actively tracks user interaction lifecycles. If the user deselects text, clicks elsewhere in the viewport, switches tabs, or initiates another selection, the inflight network stream is instantly aborted via `AbortController`, preventing token leakage and saving API quotas.
* **300ms Performance Debounce:** Prevents double-clicks, micro-selections, and cursor dragging from hammering the API.
* **Exact-Word Cache Engine:** Dynamically caches previous lookups in memory. Highlighting the exact same term skips network requests and renders cached definitions immediately.
* **Selection Truncation Metrics:** Filters out pure numbers and enforces strict query boundaries (3 to 60 characters, maximum 4 words) to support multi-word idioms while preventing full-paragraph ingestion.
* **Deterministic Inference Tuning:** The backend forces strict token generation guardrails (`temperature = 0.1`, `max_tokens = 64`) to enforce single-sentence definitions and preserve token quotas.

---

### Emergent Linguistic Capabilities

* **Domain-Specific Context Tuning:** Dynamically shifts the system prompt based on the user's active domain profile (e.g., Computer Science, Law, Medical, Science, Architecture, or custom profiles like Frontend Engineering and Cyber Security).
* **Polysemy Resolution (Contextual Disambiguation):** Automatically resolves words with multiple meanings based on the selected profile (e.g., highlighting `"Pipeline"` in Computer Science yields CI/CD automation; in Finance, it yields sales forecasting).
* **Micro-Phrasal & Idiom Parsing:** Captures multi-word idioms (*"biting the bullet"*) and modern tech slang (*"dogfooding"*), evaluating collective semantic meaning rather than literal word-by-word lookups.
* **Neologism & Acronym Decoding:** Translates cutting-edge developer acronyms (*CSP*, *LPU*, *CORS*, *camelCase*) that are absent from traditional static dictionaries.
* **Cross-Lingual Code-Switching:** Contextually infers and translates non-English phrases or localized loanwords interspersed within English documentation.

---

### System Request Pipeline

```text
User Highlights Text
       │
       ▼
Selection Validation (3-60 chars, max 4 words)
       │
       ▼
300ms Debounce Cooling Window
       │
       ▼
Content Script Captures Target String
       │
       ▼
Background Service Worker Secure Bridge Pipeline (CSP Bypass)
       │
       ▼
Dockerized Python Flask Container (Hugging Face Spaces)
       │
       ▼
Groq High-Speed LPU Inference (Llama-3.1-8B-Instant)
       │
       ▼
Server-Sent Events (SSE) Stream Relays
       │
       ▼
Hardware-Accelerated Typewriter Engine (.textContent Sandbox)
       │
       ▼
Glassmorphic Tooltip Rendered in Viewport
```
