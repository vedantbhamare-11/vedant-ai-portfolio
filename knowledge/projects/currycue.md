
# Project: CurryCue

* **Title:** CurryCue
* **Description:** A smart, AI-powered kitchen assistant built with Next.js that helps manage groceries, discover authentic recipes, and cook hands-free using voice interaction and vision AI.
* **Technologies:** Next.js 15, Zustand, TailwindCSS, Drizzle ORM, Claude Bedrock, Azure GPT-4o, ElevenLabs
* **Link:** https://curry-cue.vercel.app/

## Deep Dive & Architectural Context for AI Knowledge

### Core Purpose & Pantry Management

I built CurryCue to be a complete, real-time AI kitchen assistant that bridges the gap between pantry inventory and daily cooking. Users can sync ingredients directly from grocery apps (like Blinkit or Instamart), manually enter items with smart quantity autocomplete, or even use their camera to scan grocery bags and update their kitchen inventory using Vision AI. The system automatically detects and categorizes bundled items (e.g., "2 nos." or grams).

### Recipe Discovery & AI Guardrails

Unlike standard AI chatbots that often hallucinate impossible or unpalatable dishes, I engineered CurryCue with strict AI guardrails. It only generates and suggests verified, authentic, and community-loved recipes based on a subset of the user's available ingredients. It intelligently assumes staple ingredients (like salt, oil, and turmeric) are always available, dynamically toggles dietary filters (Veg/Non-Veg), and maps to specific cuisines.

### AI Integrations & Configurable Providers

To make the application highly multimodal, I integrated a flexible, configurable AI provider system:

* **Text & Vision AI:** Utilizes Claude Bedrock and Azure GPT-4o for prompt-based responses, ingredient detection from images, and visual recipe suggestions. It fully supports both streaming and non-streaming modes.
* **Text-To-Speech (TTS):** Integrated ElevenLabs to provide hands-free, conversational cooking instructions with multiple high-quality voice options (Aria, Will, Lily).
* **Image Generation:** Connected to Stability AI for generating dynamic visual assets.

### Architecture & UI/UX

The frontend is powered by Next.js 15, React 18, and Zustand for state management. The data layer is robustly handled using Drizzle ORM with SQLite/Postgres. For the user interface, I designed a highly interactive, fluid experience using TailwindCSS, Framer Motion, Radix UI, and CMDK. This includes habit-building features like celebratory visual popups upon dish completion and a friendly chatbot interface for substitution tips.
