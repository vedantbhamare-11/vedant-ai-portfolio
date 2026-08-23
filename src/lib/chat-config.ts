import {
  User,
  Briefcase,
  Layers,
  Sparkles,
  Mail,
  Camera,
} from "lucide-react";

export const systemPrompt = `You are Vedant Bhamare's AI portfolio assistant.

You represent Vedant Bhamare and answer questions about his professional experience,
technical skills, projects, interests, hobbies, and background.

## About Vedant

Vedant is a Software Developer and UI Engineer with experience in frontend engineering,
AI/ML engineering, RAG systems, LLM integrations, and scalable application development.

His professional strengths include:
- React
- Next.js
- TypeScript
- React Native
- UI engineering
- Frontend architecture
- Performance optimization
- AI-powered applications
- LLM integrations
- RAG architectures
- Vector databases
- Backend/API development

## Personal Interests

Vedant also has creative interests outside of software engineering.

Photography is one of his hobbies and creative outlets. He enjoys capturing moments
through his lens, including both landscape and portrait photography.

He also enjoys travelling, exploring places, and building creative software projects.

## Answering Rules

- Answer questions specifically about Vedant.
- Use the retrieved knowledge context whenever it is provided.
- Do not invent information about Vedant.
- Do not assume something is a hobby, skill, job, or achievement unless the available
  context supports it.
- Clearly distinguish between Vedant's professional skills and personal interests.
- If the user asks about photography, hobbies, interests, travel, or other personal
  topics, prioritize relevant personal-interest information from the retrieved context.
- If the requested information is not available in the context, say that you don't have
  enough information rather than making something up.
- Reference Vedant's specific projects accurately.
- When discussing technical skills, focus on his actual experience rather than assigning
  arbitrary numerical ratings.
- If asked for a subjective rating such as "What is Vedant 10/10 at?", explain that
  ratings are subjective and identify a strong area based on his demonstrated work.
- Keep responses concise unless the user asks for a detailed explanation.
- Use Markdown when it improves readability.
- Be professional, technically knowledgeable, natural, and engaging.

## Response Style

For professional questions:
Be confident, precise, and technically detailed when necessary.

For personal questions:
Be conversational and concise while staying grounded in the available information.

For questions such as "Does Vedant do photography?":
Answer directly. For example, explain that photography is one of Vedant's creative
interests/hobbies and that his collection includes both landscape and portrait
photography.

Never claim that photography is Vedant's profession unless the provided context
explicitly says so.
`;

export const QUICK_ACTIONS = [
  {
    id: "me",
    label: "Me",
    icon: User,
    prompt: "Tell me about Vedant.",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Briefcase,
    prompt: "What projects has Vedant built?",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    prompt: "Tell me about Vedant's professional experience.",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Layers,
    prompt: "What are Vedant's technical skills?",
  },
  {
    id: "photography",
    label: "Photography",
    icon: Camera,
    prompt: "Tell me about Vedant's photography and creative interests.",
  },
  {
    id: "fun",
    label: "Fun",
    icon: Sparkles,
    prompt: "Tell me something interesting about Vedant.",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    prompt: "How can I contact Vedant?",
  },
];

export const PRELOADED_RESPONSES: Record<string, string> = {
  me: `![Vedant Bhamare](https://raw.githubusercontent.com/vedantbhamare-11/Portfolio-nextjs/main/public/personal/profile-pic.jpeg)

Hey, I'm **Vedant Bhamare** — a Software Developer and UI Engineer.

I specialize in building **high-performance interfaces, AI-powered applications, and scalable backend systems** using technologies like React, Next.js, TypeScript, React Native, Node.js, and Python.

Outside of engineering, I also enjoy **photography, travelling, and exploring new places**.`,

  projects: `I've built projects across **AI, frontend engineering, real-time systems, and productivity**.

### Featured Projects

**AI Curriculum Design & Assessment Engine**  
An asynchronous AI assessment platform built with **Next.js, Express, BullMQ, Redis, and Gemini 2.5 Flash**.

**WordSense AI**  
A context-aware Chrome Extension that streams AI-powered definitions at **500+ tokens/sec**, using Groq, Llama, and a Manifest V3 background worker.

**CurryCue**  
A multimodal AI kitchen assistant using **Next.js, Zustand, Drizzle ORM, Claude, GPT-4o Vision, and ElevenLabs**.

**FocusForge**  
A productivity platform combining **Pomodoro sessions, habit tracking, tasks, calendar functionality, and ambient audio**.

I've also built **SWINS, Interconnect, Rider Tracker, Trip Planner, Road Asset & Defect Detection, and SPI Game**.

Ask me about any project for a deeper technical breakdown.`,

  experience: `I've worked across **software development, AI/ML engineering, system architecture, and technical mentorship**.

### Professional Experience

**TMCC — Developer & AI/ML Engineer**  
*Sept 2024 – Present*  
Working with **React Native, Next.js, RAG systems, and LLMs** on production applications.

**WOFO — Freelance Developer & Mentor**  
*Feb 2024 – May 2024*  
Designed system architectures, developed frontend applications with **Next.js and TypeScript**, and mentored React/Next.js developers.

**Procedure — Product Development Bootcamp**  
*Aug 2023 – Sept 2023*  
Built production-ready applications using **React, TypeScript, HTML, and CSS**.

**IBC Cube — Machine Learning Intern**  
*June 2023 – Aug 2023*  
Worked on **computer vision and road infrastructure defect detection** using Python, TensorFlow, and OpenCV.`,

  skills: `My technical skills are focused around **frontend engineering, AI systems, and scalable application development**.

- **Languages:** TypeScript, JavaScript, Python, SQL, Java
- **Frontend:** React, Next.js, React Native, Tailwind CSS, ShadCN, Redux, Zustand
- **Backend:** Node.js, Express.js, Flask, REST APIs, WebSockets
- **AI / ML:** LLMs, RAG, Groq, Llama, Gemini, Claude, GPT-4o, TensorFlow, OpenCV
- **Infrastructure:** PostgreSQL, MongoDB, Redis, BullMQ, Docker, Vercel

My strongest areas are **React/Next.js, UI engineering, AI integrations, RAG architectures, and performance optimization**.`,

  photography: `Photography is one of Vedant's **creative interests and hobbies**.

He enjoys capturing moments through his lens and works with both **landscape and portrait photography**.

His photography is more of a **personal creative outlet** rather than his professional specialization. It also reflects his interest in visual composition, travelling, exploring places, and documenting interesting moments.

So yes — **Vedant does photography**, although his primary professional focus is software development and AI engineering.`,

  contact: `I'd be happy to connect! I'm currently open to opportunities in **Frontend Engineering, UI Engineering, and AI-powered application development**.

Whether it's an opportunity, collaboration, or just a technical discussion, feel free to reach out or connect with me online.`,

  fun: `A few things that reflect how I approach engineering and life:

- ⚡ **Performance:** WordSense AI was designed to stream AI responses at **500+ tokens/sec**.
- 🎮 **From scratch:** I built the logic for my multiplayer **SPI game** using vanilla JavaScript.
- 🤖 **AI:** A lot of my recent work explores **LLMs, RAG, streaming, and multimodal AI systems**.
- 📸 **Photography:** Outside of coding, I enjoy **photography**, including both landscape and portrait photography.
- ✈️ **Exploration:** I also enjoy **travelling and exploring new places**, which ties into my interest in photography.`,
};