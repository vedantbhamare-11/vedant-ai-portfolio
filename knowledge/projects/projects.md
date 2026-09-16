---
title: Project Index
type: index
visibility: public
voice: third-person
last_updated: 2026-09-14
version: 2.0
note: Tiered. Stacks here must match the deep-dive files. Unverified metrics have been removed.
---

# Projects

Ordered by how much of the work is Vedant's and how verifiable it is.

---

## Tier 1 — lead with these

### WordSense AI
Chrome extension for context-aware reading. Highlight a word or short phrase on any page
and a concise, domain-tuned definition streams in place. Built solo; live on the Chrome
Web Store.
**Stack:** Vanilla JavaScript (ES6+), Chrome Extension Manifest V3, Python 3, Flask,
Gunicorn, Docker on Hugging Face Spaces, Groq LPUs running Llama-3.1-8B-Instant with
failover to Llama-3.3-70b-versatile
**Link:** https://chromewebstore.google.com/detail/wordsense/mnbcfmjkkeojdmhjcbelnijejfipehdj
**Detail:** `wordsense.md`

### AI Curriculum Design Engine
Assessment generator for educators, producing curriculum-aligned question papers and
marking schemes from uploaded material. Fully asynchronous so that large uploads never
block the interface. Built solo; live.
**Stack:** Next.js 15, Express.js, BullMQ, Upstash Redis, MongoDB Atlas, Gemini 2.5 Flash,
Zustand, Tailwind CSS
**Link:** https://ai-curriculum-design-engine.vercel.app/
**Detail:** `ai-curriculum.md`

### CurryCue
AI kitchen assistant that manages pantry inventory, suggests recipes from what is actually
available, and supports hands-free cooking through voice. Built solo; live.
**Stack:** Next.js 15, React 18, Zustand, Tailwind CSS, Drizzle ORM over SQLite/Postgres,
Claude Bedrock, Azure GPT-4o, ElevenLabs, Stability AI, Framer Motion, Radix UI, CMDK
**Link:** https://curry-cue.vercel.app/
**Detail:** `currycue.md`

### Rider Tracker
Real-time tracking application for delivery riders, with continuous background location,
device and battery telemetry, and OTP authentication. Built end to end by Vedant at TMCC —
frontend, backend, architecture and deployment.
**Stack:** React Native (CLI with Expo libraries), Expo TaskManager and Location, Firebase
Phone Auth, Python, Flask, SQLite
**Link:** Google Play — *package ID pending verification*
**Detail:** `rider-tracker.md`

---

## Tier 2 — supporting work

### Interconnect
Professional networking and research-sharing platform for a client, with both web and
mobile clients. Vedant built the frontend on both; the backend and WebSocket server were
built by other engineers. The client reported the platform passing 1,000 users.
**His stack:** Next.js, React Native, TypeScript, Redux, WebSocket consumption
**Link:** https://interconnect.blockchainforimpact.in/landing
**Detail:** `interconnect.md`

### SWINS
Peer-appreciation platform with a social feed, leaderboards and chat. Vedant built the
React Native UI, client state and real-time client behaviour, and wrote the points and
leaderboard endpoints on the backend. The rest of the backend was built by others.
**His stack:** React Native, TypeScript, Redux; Node.js for the endpoints he wrote
**Link:** Google Play — *package ID pending verification*
**Detail:** `swins.md`

### Whizz web application
Local food-delivery web application. Vedant built the menu pages, client dashboards and
order interfaces, including the order-stage tracking flow. The client reported the
application passing 500 users.
**His stack:** Next.js, TypeScript, Redux

### TeambO
Internal hierarchical task-tracking tool with boards, time tracking and analytics.
Vedant's contribution was frontend and UI only.

---

## Tier 3 — archive

### FocusForge
Productivity dashboard combining a Pomodoro timer, habit tracker, calendar, focus audio and
a points system. Client-side only. Built solo.
**Stack:** Next.js, TypeScript, Tailwind CSS, React Hooks and Context, LocalStorage
**Link:** https://github.com/vedantbhamare-11/FocusForge-Productivity-Tracker
**Detail:** `focusforge.md`

### SPI Game
Browser-based multiplayer strategy simulation with a hand-built game loop, no framework.
Early project, kept for the from-scratch engine work.
**Stack:** JavaScript, HTML5, CSS
**Detail:** `spi-game.md`

### Road Assets ML
Computer-vision project at IBC Cube detecting road infrastructure assets and surface
defects. Vedant's contribution was labelling, preprocessing, cleaning and evaluation
support; models were developed, trained and deployed by the team lead.
**His tools:** Python, OpenCV
**Detail:** `road-assets-ml.md`

---

## Not featured

- **Trip Planner** — travel itinerary generator. Archived. See `trip-planner.md`.
- **Jupiter** — AI content generation platform, TMCC client work. Limited contribution.
- **Cashflow** — contract and invoicing system, TMCC client work. Limited contribution.
