---
title: Technical Skills
type: profile
visibility: public
voice: third-person
last_updated: 2026-09-14
version: 2.0
note: Four-level taxonomy. Depth is stated honestly; presence in one project does not imply skill.
---
# Technical Skills

Skills are graded by actual depth of use. A technology used once in one project is listed
as such, not as a strength.

## Strong — frequently used across multiple projects and professional work

- React
- Next.js
- React Native
- TypeScript
- JavaScript (ES6+)
- Tailwind CSS
- Frontend architecture and component design
- State management
- Responsive and platform-adaptive UI
- REST API integration

## Practical working experience — real and shipped, narrower depth

- Node.js / Express
- Python / Flask
- Redux
- Zustand
- MongoDB
- Docker
- Expo (TaskManager, background location)
- Firebase Phone Authentication
- Chrome Extension Manifest V3 and background service workers
- LLM API integration — Gemini, Groq (GPT-OSS models), Claude Bedrock, Azure GPT-4o, ElevenLabs
- Prompt engineering and output guardrails
- Vercel deployment

## Used in one specific project — real, but single instance

| Technology                                                             | Where                       |
| ---------------------------------------------------------------------- | --------------------------- |
| BullMQ + Redis (queues, workers, retries, backoff)                     | AI Curriculum Design Engine |
| Retrieval-augmented generation — embeddings, vector search, LLM layer | One client system at TMCC   |
| Drizzle ORM over SQLite / Postgres                                     | CurryCue                    |
| SQLite                                                                 | Rider Tracker               |
| OpenCV (image preprocessing)                                           | IBC Cube                    |
| Gunicorn, Hugging Face Spaces                                          | WordSense AI                |
| Framer Motion, Radix UI, CMDK                                          | CurryCue                    |
| Material UI                                                            | Trip Planner (archived)     |
| WebSocket*consumption* on the client — never the server layer       | Interconnect, SWINS         |

## Learning / exploratory — studied, not shipped

- LLM fine-tuning — experimented using the Hugging Face Trainer on a dataset. Educational
  only. **Not production fine-tuning experience.**
- System design at production scale
- TensorFlow — used adjacent to models trained by a team lead. **Not a claimable skill.**

## Honest gaps

These are real and worth stating plainly rather than hiding:

- **Automated testing** — rarely written; testing is mostly manual
- **CI/CD** — limited to Vercel auto-deploy on push; no pipelines built
- **Raw SQL** — basic queries; most database work goes through ORMs
- **Monitoring and observability** — no experience
- **Algorithmic interviews** — easy problems solid, medium problems inconsistent

## Explicitly not claimed

AWS, MediaPipe, and TensorFlow as a skill. These appeared in earlier versions of this
knowledge base but describe work done by others.
