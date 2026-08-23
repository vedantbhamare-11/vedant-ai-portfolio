// src/lib/chat-config.ts
import { User, Briefcase, Layers, Sparkles, Mail } from "lucide-react";

export const QUICK_ACTIONS = [
  { id: "me", label: "Me", icon: User, prompt: "Tell me about Vedant." },
  { id: "projects", label: "Projects", icon: Briefcase, prompt: "What projects has Vedant built?" },
  { id: "skills", label: "Skills", icon: Layers, prompt: "What are Vedant's technical skills?" },
  { id: "fun", label: "Fun", icon: Sparkles, prompt: "Tell me something interesting about Vedant." },
  { id: "contact", label: "Contact", icon: Mail, prompt: "How can I contact Vedant?" },
];

export const PRELOADED_RESPONSES: Record<string, string> = {
  me: `![Vedant Bhamare](https://raw.githubusercontent.com/vedantbhamare-11/Portfolio-nextjs/main/public/personal/profile-pic.jpeg)

Hey, I'm **Vedant Bhamare** — a Software Developer (SDE-2 at TMCC) and UI Engineer based in Bangalore.

I specialize in building sleek, high-performance interfaces and scalable, decoupled back-ends. My core stack revolves around **TypeScript, React, Next.js, and React Native** on the frontend, alongside **Node.js and Python** powering backend services and AI systems.

I'm focused on zero-latency streaming architectures, robust system design, and building intuitive developer & consumer tools. Feel free to explore my projects or ask me anything about my technical background!`,

  projects: `Here are some of the flagship projects I've built, ranked by architectural complexity:

1. **AI Curriculum Design & Assessment Engine** — An asynchronous, event-driven assessment creator for educators built with Next.js 15, Express, BullMQ, Redis, and Gemini 2.5 Flash.
2. **WordSense AI** — A zero-latency Chrome Extension streaming domain-tuned definitions at 500+ tokens/sec using Groq LPUs, Meta Llama 3.1, and an isolated Manifest V3 Background Worker.
3. **CurryCue** — A multimodal AI kitchen assistant built with Next.js, Zustand, Drizzle ORM, Claude Bedrock, Azure GPT-4o Vision, and ElevenLabs voice.
4. **FocusForge** — An all-in-one productivity suite with a Pomodoro timer, habit streaks, ambient audio, and gamified productivity tracking.
5. **SWINS** — A real-time peer appreciation mobile platform engineered with React Native, Redux, Node.js, and WebSockets.
6. **Interconnect** — An internal LinkedIn-style research and intelligence sharing network with feed virtualization and debounced search.
7. **Rider Tracker App** — A background location telemetry and battery monitoring React Native app utilizing Expo TaskManager and Flask.
8. **Trip Planner** — A personalized travel itinerary generator with drag-and-drop scheduling using Next.js and Geoapify Places API.
9. **Road Asset & Defect Detection ML** — Computer vision models built with TensorFlow and OpenCV adhering to NHAI road safety inspection standards.
10. **SPI Game** — A browser-based multiplayer biological life simulation with a custom game engine built in vanilla JavaScript.

👉 *Ask me about any specific project (e.g., **"Tell me more about WordSense AI"** or **"How does the Curriculum Engine work?"**) to see a detailed technical breakdown and live project card!*`,

  skills: `Here is a breakdown of my core technical stack:

* **Languages:** TypeScript, JavaScript (ES6+), Python, SQL, HTML5/CSS3, Java
* **Frontend:** React, Next.js (App Router), React Native (Expo), Tailwind CSS, ShadCN UI, Material UI, Redux, Zustand
* **Backend:** Node.js, Express.js, Flask, RESTful APIs, WebSockets
* **AI / ML:** LLM Orchestration, RAG Systems, Groq LPUs, Meta Llama 3.1, Gemini API, Claude Bedrock, Azure GPT-4o, TensorFlow, OpenCV
* **Databases & Queues:** MongoDB (Atlas), PostgreSQL, Redis, BullMQ (Async Job Workers)
* **DevOps & Tools:** Git, Docker, Vercel, Hugging Face Spaces, Render, Chrome Extensions (Manifest V3)`,

  contact: `I am currently open to exciting new opportunities as a Frontend Developer / UI Engineer in Bangalore or remote!

* 📧 **Email:** [vedantdbhamare@gmail.com](mailto:vedantdbhamare@gmail.com)
* 💼 **LinkedIn:** [linkedin.com/in/vedantbhamare11](https://www.linkedin.com/in/vedantbhamare11/)
* 🐙 **GitHub:** [github.com/vedantbhamare-11](https://github.com/vedantbhamare-11)

Feel free to reach out directly via email or connect on LinkedIn!`,

  fun: `A few fun facts about me:
* ⚡ **Speed Obsession:** I engineered WordSense AI to stream at over 500 tokens/sec because waiting on AI loading spinners drove me crazy!
* 🎮 **Built from Scratch:** Rather than using a pre-built game engine, I wrote the entire logic for my multiplayer strategy game (*SPI*) from scratch in pure vanilla JavaScript.
* 😄 **Dad Jokes & Coding:** I believe technical documentation shouldn't be boring — I love writing approachable blogs on Medium with plenty of humor and metaphors.`
};

export const INITIAL_WELCOME = {
  id: 'welcome',
  role: 'assistant',
  parts: [{ 
    type: 'text', 
    text: "Hi there! 👋 I'm Vedant's AI portfolio assistant.\n\nI can help you explore my background as a Frontend Developer & UI Engineer. Feel free to ask me about my **Skills**, check out my **Projects**, or get my **Contact** information. What would you like to explore first?" 
  }]
};