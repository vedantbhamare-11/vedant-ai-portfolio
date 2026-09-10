# Vedant AI Portfolio

> An AI-powered portfolio that lets you explore my work, experience, technical skills, projects, and creative interests through a conversational interface.

<p align="center">
  <a href="https://vedant-ai-portfolio.vercel.app/">Live Demo</a>
  ·
  <a href="https://github.com/vedantbhamare-11/vedant-ai-portfolio">GitHub Repository</a>
</p>

---

## Overview

**Vedant AI Portfolio** is a conversational portfolio built with **Next.js, TypeScript, React, and AI-powered retrieval**.

Instead of presenting my portfolio as a traditional collection of static sections, the application allows visitors to interact with an AI assistant and ask questions about:

* Me
* Projects
* Professional experience
* Technical skills
* Photography
* Interests and hobbies
* Contact information

The assistant responds in a conversational, first-person style, allowing the portfolio to feel more like a conversation with me rather than a traditional resume.

The application combines **preloaded portfolio experiences** with a **RAG-powered knowledge system** backed by **Pinecone** and **Gemini embeddings**.

---

## ✨ Features

### 🤖 Conversational AI Portfolio

Ask questions naturally about my:

* Background
* Technical skills
* Projects
* Work experience
* AI/ML experience
* Frontend engineering
* RAG and LLM work
* Photography and creative interests

The assistant is designed to stay grounded in the available portfolio knowledge and avoid inventing information.

---

### ⚡ Quick Actions

The landing screen provides quick actions for common portfolio questions:

* **Me**
* **Projects**
* **Experience**
* **Skills**
* **Photography**
* **Fun**
* **Contact**

These actions provide an easy way to explore the portfolio without having to manually type a question.

---

### 🧠 Retrieval-Augmented Generation

The portfolio includes a RAG pipeline for answering questions using structured knowledge about my background and projects.

The knowledge base is organized into Markdown files:

```text
knowledge/
├── persona/
│   ├── about.md
│   ├── contact.md
│   ├── experience.md
│   ├── hobbies.md
│   └── skills.md
│
└── projects/
    ├── ai-curriculum.md
    ├── currycue.md
    ├── focusforge.md
    ├── interconnect.md
    ├── projects.md
    ├── rider-tracker.md
    ├── road-assets-ml.md
    ├── spi-game.md
    ├── swins.md
    ├── trip-planner.md
    └── wordsense.md
```

This keeps portfolio information separate from the application logic and makes the knowledge base easier to maintain.

---

### 🔎 Vector Search

The knowledge base is embedded and stored in **Pinecone** for semantic retrieval.

The current seeding workflow uses:

* **Google Gemini**
* `gemini-embedding-001`
* **Pinecone**
* `portfolio-index`
* **768-dimensional vectors**

The seed script processes both project and persona Markdown files and stores them as searchable vector records.

---

### 💬 Streaming AI Responses

AI-generated responses are streamed into the chat interface rather than waiting for the complete response before rendering it.

The interface also includes a typewriter-style presentation for assistant responses to create a more conversational experience.

---

### 🎨 Interactive Chat UI

The interface includes:

* Animated message transitions
* Responsive layout
* Markdown rendering
* Markdown tables
* Code blocks
* Links
* Loading states
* Typewriter responses
* Auto-scrolling
* Quick action buttons
* New chat functionality
* Error handling

Animations are powered by **Framer Motion**.

---

### 📸 Photography Gallery

The portfolio includes a dedicated **Photography** experience.

The gallery uses photographs stored locally under:

```text
public/photography/
```

The application maintains separate landscape and portrait image collections and randomly selects:

* 2 landscape photographs
* 2 portrait photographs

The layout alternates between:

```text
Landscape + Portrait
Portrait  + Landscape
```

A **Shuffle** interaction allows visitors to generate another combination of photographs.

Photography is presented as a personal creative interest rather than a professional specialization.

---

## 🏗️ Architecture

At a high level, the application follows this flow:

```text
                         ┌───────────────────┐
                         │      Visitor      │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   Next.js UI      │
                         │   React + TS      │
                         └─────────┬─────────┘
                                   │
                          User question
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   Chat API Route  │
                         │   /api/chat       │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Knowledge Search  │
                         │      + RAG        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     Pinecone      │
                         │  Vector Search    │
                         └─────────┬─────────┘
                                   │
                         Relevant context
                                   │
                                   ▼
                         ┌───────────────────┐
                         │      LLM          │
                         │  AI Generation    │
                         └─────────┬─────────┘
                                   │
                              Streaming
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  Chat Interface   │
                         └───────────────────┘
```

The portfolio also supports **preloaded responses** for common quick actions, allowing certain experiences such as Photography and Contact to render custom UI components directly.

---

## 📁 Project Structure

The current repository structure is:

```text
.
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
│
├── knowledge/
│   ├── persona/
│   │   ├── about.md
│   │   ├── contact.md
│   │   ├── experience.md
│   │   ├── hobbies.md
│   │   └── skills.md
│   │
│   └── projects/
│       ├── ai-curriculum.md
│       ├── currycue.md
│       ├── focusforge.md
│       ├── interconnect.md
│       ├── projects.md
│       ├── rider-tracker.md
│       ├── road-assets-ml.md
│       ├── spi-game.md
│       ├── swins.md
│       ├── trip-planner.md
│       └── wordsense.md
│
├── public/
│   ├── images/
│   │   ├── vedant-profile-pic.png
│   │   └── vedant-profile.jpeg
│   │
│   └── photography/
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       ├── 4.jpg
│       ├── 5.jpg
│       ├── 6.jpg
│       ├── 7.jpg
│       ├── 8.jpg
│       ├── 9.jpg
│       ├── 10.jpg
│       ├── 11.jpg
│       ├── 12.jpg
│       ├── 13.jpg
│       ├── vedant profile pic.png
│       └── vedant-profile-pic.png
│
├── scripts/
│   └── seed.ts
│
└── src/
    ├── app/
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    │
    ├── components/
    │   └── chat/
    │       ├── ChatMessage.tsx
    │       ├── Photography.tsx
    │       └── SocialLinks.tsx
    │
    └── lib/
        ├── chat-config.ts
        ├── knowledge.ts
        └── utils.ts
```

### Important directories

| Directory             | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| `src/app`             | Next.js application routes and pages                  |
| `src/app/api/chat`    | Backend chat endpoint                                 |
| `src/components/chat` | Chat UI and interactive portfolio components          |
| `src/lib`             | Chat configuration, knowledge retrieval and utilities |
| `knowledge/persona`   | Personal and professional information                 |
| `knowledge/projects`  | Project-specific knowledge                            |
| `scripts`             | RAG data preparation and seeding                      |
| `public/images`       | Profile and static images                             |
| `public/photography`  | Photography gallery                                   |

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **Lucide React**
* **React Markdown**
* **remark-gfm**

### AI / RAG

* **Google Gemini**
* **Gemini Embeddings**
* **Pinecone**
* Retrieval-Augmented Generation
* LLM integrations
* Streaming responses

### Backend

* **Next.js API Routes**
* REST-style API handling
* Vector search
* AI inference

### Deployment

* **Vercel**
* **GitHub**

---

## 🚀 Featured Projects

The portfolio knowledge base contains information about projects spanning AI, frontend engineering, mobile development, real-time applications, productivity, and computer vision.

### AI Curriculum Design & Assessment Engine

An asynchronous AI assessment platform designed around curriculum generation and assessment workflows.

**Technologies:**

* Next.js
* Express
* BullMQ
* Redis
* Gemini 2.5 Flash

The architecture uses asynchronous processing to handle AI-related workloads.

---

### WordSense AI

A context-aware Chrome extension designed to provide AI-powered definitions while maintaining a highly responsive user experience.

**Technologies:**

* Chrome Extension
* Manifest V3
* Groq
* Llama
* AI streaming

The project was designed to stream AI responses at **500+ tokens/sec**.

---

### CurryCue

A multimodal AI kitchen assistant designed around AI-powered cooking assistance.

**Technologies:**

* Next.js
* Zustand
* Drizzle ORM
* Claude
* GPT-4o Vision
* ElevenLabs

---

### FocusForge

A productivity platform combining several productivity workflows into one application.

Features include:

* Pomodoro sessions
* Habit tracking
* Tasks
* Calendar functionality
* Ambient audio

---

### SWINS

An internal employee appreciation application developed at TMCC.

**Technologies:**

* React Native
* TypeScript

The application includes functionality such as:

* Employee onboarding
* Posts
* Profiles
* Chat
* Leaderboards

The application was deployed to the Google Play Store.

---

### Interconnect

A LinkedIn-style research and social platform.

**Technologies:**

* Next.js
* TypeScript
* Redux
* WebSockets

The project involved building responsive interfaces, desktop/mobile chat flows, and real-time communication.

The application reached **1,000+ users**.

---

### Rider Tracker

A delivery rider tracking application developed for Whizz.

**Technologies:**

* React Native
* Expo
* Backend APIs
* Location services

A major technical challenge involved implementing background location functionality in a React Native CLI environment.

---

### Trip Planner

An AI-powered travel itinerary application.

The project explores:

* Trip duration
* Destination
* Travel style
* Place discovery
* AI-generated itineraries
* Geolocation
* Maps and travel information

The application was built using Next.js, TypeScript, Material UI, Geoapify, and Gemini.

---

### Road Asset & Defect Detection

A computer-vision project focused on detecting road infrastructure assets and defects.

Examples include:

**Assets**

* Street lights
* Medians
* Trees
* Kerbs
* Crash barriers

**Defects**

* Potholes
* Road scaling
* Other road infrastructure issues

**Technologies:**

* Python
* TensorFlow
* OpenCV
* Computer Vision

---

### SPI Game

A multiplayer game project where the core game logic was developed from scratch using vanilla JavaScript.

The project demonstrates an interest in interactive applications and understanding application logic without relying heavily on frameworks.

---

## 💼 Professional Experience

### TMCC

**Developer & AI/ML Engineer**
**September 2024 – Present**

Working across:

* React Native
* Next.js
* RAG systems
* LLM integrations
* UI engineering
* Application architecture
* AI-powered applications

The work includes both client-facing applications and internal products.

---

### WOFO

**Freelance Developer & Mentor**
**February 2024 – May 2024**

Worked on:

* System architecture
* Next.js applications
* TypeScript
* Digital document workflows
* Digital signatures
* Document generation
* Templates and letterheads
* Mentoring developers

---

### Procedure

**Product Development Bootcamp**
**August 2023 – September 2023**

A product-development-focused environment involving collaborative development and mob programming.

Worked with:

* React
* TypeScript
* HTML
* CSS
* Software architecture
* Design patterns

The experience emphasized collaborative problem solving and rapid peer feedback.

---

### IBC Cube

**Machine Learning Intern**
**June 2023 – August 2023**

Worked on computer vision and road infrastructure analysis using:

* Python
* TensorFlow
* OpenCV

The work involved data preprocessing, cleaning, evaluation, and automation through Python scripting.

---

## 🧠 Technical Skills

### Languages

* TypeScript
* JavaScript
* Python
* SQL
* Java

### Frontend

* React
* Next.js
* React Native
* Tailwind CSS
* ShadCN
* Redux
* Zustand

### Backend

* Node.js
* Express.js
* Flask
* REST APIs
* WebSockets

### AI / ML

* LLMs
* RAG
* Groq
* Llama
* Gemini
* Claude
* GPT-4o
* TensorFlow
* OpenCV

### Infrastructure & Data

* PostgreSQL
* MongoDB
* Redis
* BullMQ
* Docker
* Vercel
* Pinecone

The strongest areas demonstrated throughout the portfolio are **React/Next.js, UI engineering, AI integrations, RAG architectures, and performance-focused application development**.

---

## 🧩 Knowledge Base

The portfolio intentionally separates application code from portfolio knowledge.

For example:

```text
knowledge/persona/about.md
knowledge/persona/experience.md
knowledge/persona/skills.md
```

contain information about me, while:

```text
knowledge/projects/wordsense.md
knowledge/projects/currycue.md
knowledge/projects/interconnect.md
```

contain project-specific information.

This makes it possible to update portfolio information without rewriting the application's core logic.

---

## 🌱 RAG Seeding

The repository includes:

```text
scripts/seed.ts
```

for populating the Pinecone vector database.

The general workflow is:

```text
Markdown Knowledge
       │
       ▼
Gemini Embeddings
       │
       ▼
768-dimensional vectors
       │
       ▼
Pinecone
       │
       ▼
Semantic Retrieval
       │
       ▼
AI Chat Response
```

### Seed the knowledge base

After configuring the required environment variables:

```bash
npx tsx scripts/seed.ts
```

The seed script processes the Markdown files under:

```text
knowledge/projects
knowledge/persona
```

and stores them in the configured Pinecone index.

---

## 🔐 Environment Variables

Create a local environment file:

```text
.env.local
```

Add the required credentials:

```env
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

Additional environment variables may be required depending on the configured AI/chat provider.

**Never commit `.env.local` or API keys to GitHub.**

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/vedantbhamare-11/vedant-ai-portfolio.git
```

### 2. Enter the project

```bash
cd vedant-ai-portfolio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

and add the required API keys.

### 5. Seed the RAG database

```bash
npx tsx scripts/seed.ts
```

### 6. Start the development server

```bash
npm run dev
```

The application will be available locally at:

```text
http://localhost:3000
```

---

## 📦 Production Build

To create a production build:

```bash
npm run build
```

To run the production server:

```bash
npm start
```

---

## ☁️ Deployment

The portfolio is deployed using **Vercel**.

### Live Application

**https://vedant-ai-portfolio.vercel.app/**

### GitHub Repository

**https://github.com/vedantbhamare-11/vedant-ai-portfolio**

The repository is connected to Vercel, allowing pushes to the configured branch to trigger deployments automatically.

---

## 🎨 Design Philosophy

The portfolio intentionally avoids looking like a conventional resume website.

The goal is to make the interface:

* Minimal
* Conversational
* Interactive
* Fast
* Personal
* AI-native

Instead of forcing visitors to navigate through multiple static pages, the chat interface acts as the primary navigation mechanism.

The design combines:

```text
Portfolio
    +
Conversational UI
    +
AI
    +
RAG
    +
Interactive Components
```

---

## 📸 Beyond Engineering

Software engineering is the primary focus of the portfolio, but it also includes a more personal side.

Photography is one of my creative interests. The gallery includes both **landscape and portrait photography**, reflecting interests in visual composition, travelling, and exploring new places.

The portfolio therefore isn't intended to be only a technical resume. It also provides visitors with a small glimpse into the person behind the projects.

---

## 🔮 Future Improvements

Potential improvements include:

* More interactive project cards
* Improved semantic retrieval
* Better conversation memory
* More detailed project walkthroughs
* Additional AI-powered portfolio interactions
* Richer project visualizations
* Improved mobile chat experience
* Additional photography experiences
* More portfolio-specific tools

---

## 📌 Why I Built This

Traditional portfolios usually make visitors scroll through sections to find information.

I wanted to experiment with a different approach:

> **What if my portfolio could answer questions instead?**

This project combines my interests in:

* Frontend engineering
* UI/UX
* AI applications
* LLMs
* RAG systems
* Vector databases
* Product development
* Creative interfaces

The result is an AI-powered portfolio that turns my resume, projects, experience, and interests into an interactive conversation.

---

## 👨‍💻 About Me

I'm **Vedant Bhamare**, a Software Developer and UI Engineer focused on building high-performance interfaces, AI-powered applications, and scalable software systems.

My work spans:

* Frontend engineering
* React / Next.js
* React Native
* AI/ML
* LLM integrations
* RAG systems
* Vector databases
* Backend/API development
* System architecture
* Product development

Outside engineering, I enjoy photography, travelling, and exploring new places.

---

## 🔗 Links

| Resource          | Link                                                    |
| ----------------- | ------------------------------------------------------- |
| 🌐 Live Portfolio | https://vedant-ai-portfolio.vercel.app/                 |
| 💻 GitHub         | https://github.com/vedantbhamare-11/vedant-ai-portfolio |

---

## 📄 License

This project is primarily a personal portfolio and demonstration of my work.

If you find the implementation useful or want to explore the architecture, feel free to inspect the repository and adapt the ideas for your own projects.

---

<p align="center">
  Built with React, Next.js, TypeScript, AI, RAG, and a lot of curiosity.
</p>
