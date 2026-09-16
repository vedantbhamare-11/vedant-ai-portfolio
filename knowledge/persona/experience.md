---
title: Professional Experience
type: profile
visibility: public
voice: third-person
last_updated: 2026-09-14
version: 2.0
note: Contribution is separated from team/system scope throughout. Client-specific detail is excluded per the disclosure rule.
---

# Professional Experience

Vedant Bhamare is a software developer with roughly 18 months of full-time experience,
spanning frontend engineering, mobile development, AI application work, and smaller
end-to-end systems.

| Organisation | Period | Location | Role |
|---|---|---|---|
| TMCC | Sept 2024 – Feb 2026 | Chennai | Software Developer |
| WOFO | Feb – May 2024 | Pune | Freelance / early-stage engagement |
| Procedure (Product Development 101) | Aug – Sept 2023 | Mumbai | Bootcamp participant |
| IBC Cube | Jun – Aug 2023 | Mumbai | Machine Learning Engineer Intern |

The last three took place during his B.Tech.

---

# TMCC

**Software Developer · Chennai · September 2024 – 28 February 2026**

TMCC is a service-based branding and technology company building web and mobile products
for local and multinational clients, alongside internal products.

Vedant's work covered frontend engineering, UI development, React, Next.js, React Native,
TypeScript, Redux, AI and LLM application work, API integration, deployment, and
performance optimisation. On most client systems he owned the frontend while backends were
built by other engineers; on smaller systems he owned the whole thing.

## Projects at TMCC

### Rider Tracker — full ownership

A React Native application tracking delivery riders in real time, including background
location, device model and battery telemetry. Vedant built it end to end: React Native
client, Python/Flask backend, SQLite storage, Firebase Phone Authentication, architecture
and production deployment. Shipped to the Play Store. See `rider-tracker.md`.

### Interconnect — frontend

A LinkedIn-style professional networking and research-sharing platform built for a client,
with both a Next.js web client and a React Native mobile client. Vedant built the frontend
on both. His contributions included the chat interface with separate desktop and mobile
interaction flows, debounced search and filtering, the analytics dashboard UI, and feed
performance work. The Node.js, REST and MongoDB backend and the WebSocket server layer were
built by others. The client reported the platform passing 1,000 users. See
`interconnect.md`.

### SWINS — frontend plus selected backend endpoints

An internal peer-appreciation product with a social feed, leaderboards and chat. Vedant
built the React Native UI across onboarding, posts, profiles, chat and leaderboards,
handled client-side state with Redux, implemented real-time feed updates and push
notifications on the client, and wrote the points and leaderboard endpoints on the backend.
The rest of the Node.js and MongoDB backend, and the WebSocket server layer, were built by
others. Shipped to the Play Store. This was his first React Native project. See `swins.md`.

### Whizz web application — frontend

A local food-delivery product built around WhatsApp ordering and a web application,
initially operating in Nungambakkam and Anna Nagar in Chennai. Vedant built the menu pages,
client dashboards and order interfaces in Next.js, TypeScript and Redux, including the flow
for tracking orders through delivery stages. The client reported the application passing
500 users.

### TeambO — frontend

An internal hierarchical task-tracking tool with boards, time tracking and analytics.
Vedant's contribution was frontend and UI only.

### Jupiter and Cashflow

Client projects Vedant contributed to in a limited capacity. Not representative of his work
and not featured in the portfolio.

## AI and LLM work at TMCC

Vedant worked on LLM-backed application features including classification, structured
extraction from documents, chatbots, summarisation, content generation, and evaluation of
generated output. He has worked with or experimented across ChatGPT, Gemini, Claude,
Perplexity, Groq and Hugging Face Llama models.

He also worked on a retrieval-augmented generation system for a client. Details of that
system are held privately and are not part of the public portfolio.

**Fine-tuning:** Vedant experimented with fine-tuning using the Hugging Face Trainer on a
dataset, for learning purposes. This is exploratory experience and must not be described
as production-scale fine-tuning.

## Frontend engineering at TMCC

Dashboards, forms, data visualisation, chat interfaces, mobile applications, responsive
layouts, component systems, animation, state management, API integration, authentication
flows and performance optimisation, across both web and mobile.

## Hardest problems solved at TMCC

**Background location under a React Native CLI constraint.** Rider Tracker needed to keep
tracking riders while backgrounded, and the project was constrained to React Native CLI,
which did not provide this in the way Vedant initially expected. He investigated
picture-in-picture approaches and home-screen mechanisms before settling on a hybrid: Expo
libraries used inside the React Native CLI application, with Expo's TaskManager and
Location APIs providing the background capability. It shipped to production.

**Chat across two interaction models.** Interconnect's chat needed to work on desktop and
mobile, where the user flows genuinely differed rather than simply needing responsive
layout. Vedant separated the interaction flows for the two rather than forcing both into a
single model, consuming the WebSocket layer for real-time delivery.

---

# WOFO

**Freelance / early-stage engagement · Pune · February – May 2024**

WOFO was a startup building a digital document-tracking system aimed at reducing the
difficulty of getting documents approved across levels of educational institutions. The
product involved organisational hierarchies, document generation, digital signatures,
letterheads, templates, and approval workflows.

Vedant joined early and worked on system architecture, database schema design, React
component architecture, and frontend implementation. The architecture needed to represent
institutional hierarchies and support approval workflows between levels.

He also mentored interns, focusing on clean and modular code, project structure, React and
Git, with the aim of helping them build maintainable applications rather than merely
working ones.

The engagement was short but gave him experience of early-stage product work, where
architecture, structure and standards have to be decided rather than inherited.

---

# Procedure — Product Development 101 Bootcamp

**Mumbai · August – September 2023**

A full-stack product development bootcamp with a group of around ten participants,
emphasising collaborative development, architecture, TypeScript and design patterns.

The group used **mob programming**: one person writing code while the rest reviewed and
guided the implementation, with roles rotating frequently. Projects included an elevator
problem and a more involved IPL auctioning system. Participants were assigned design
patterns and taught them to the group; Vedant worked with the Observer and Decorator
patterns.

**On the 60% figure.** Vedant has previously described the bootcamp as improving issue
resolution speed by around 60%. That reflects the effect of continuous peer review in a
mob-programming workflow, in the context of a two-month bootcamp. It is not a formal
benchmark and should not be presented as a professional outcome.

---

# IBC Cube

**Machine Learning Engineer Intern · Mumbai · June – August 2023**

Vedant's first internship, working on computer vision for road infrastructure surveying.

**His contribution:** substantial image and data labelling and annotation, data
preprocessing using OpenCV, data cleaning, contributing to model evaluation alongside the
team lead, collaborative dataset creation, and Python automation of repetitive
data-processing steps.

**Handled by the team lead:** model development, training and deployment.

The system analysed road survey imagery and video — captured in part via bonnet camera test
runs — to identify infrastructure assets and surface defects, aligned with NHAI guidelines.

The specific model architecture used is not remembered, and the work should never be
described as using YOLO or any named CNN. See `road-assets-ml.md`.

---

# Career progression

**IBC Cube** — applied machine learning, computer vision, data preprocessing and labelling,
Python automation.

**Procedure** — product development, full-stack work, TypeScript, architecture, design
patterns, collaborative development.

**WOFO** — system architecture, database design, React component architecture, early-stage
product development, mentoring.

**TMCC** — frontend and mobile engineering at production scale, AI and LLM application
work, end-to-end ownership on smaller systems, deployment, performance optimisation.

The through-line is movement from specialised ML support work toward product engineering
combined with AI application development.

---

# Preferred work

Vedant most enjoys building interfaces, solving difficult frontend problems, developing AI
applications, working with retrieval systems, and thinking about system architecture and
product development. His strongest interest sits at the intersection of frontend
engineering, product development and AI-powered applications.

---

# Frequently asked questions

**What did Vedant do at TMCC?**
He was a Software Developer from September 2024 to February 2026, working primarily on
frontend and mobile engineering for client and internal products, plus AI and LLM
application features, API integration and deployment. On Rider Tracker he owned the entire
application including its backend.

**What is his strongest area?**
Frontend and UI engineering — React, Next.js and React Native — with growing practical
experience in backend work and AI application development.

**Which project was most technically challenging?**
Rider Tracker, because of background location tracking under a React Native CLI constraint.

**Which project is he most proud of?**
Rider Tracker, because he built it from scratch across frontend, backend, architecture and
deployment. He is also proud of Interconnect's chat experience, which required separate
interaction models for desktop and mobile.

**Has he worked with RAG?**
Yes, on one client system at TMCC. Details are private; he can discuss it at a generic
architectural level only.

**Has he fine-tuned LLMs?**
He has experimented with fine-tuning using the Hugging Face Trainer for learning purposes.
This is not production fine-tuning experience.

**What backend work has he actually done?**
A Python/Flask backend with SQLite for Rider Tracker, a Python/Flask inference service for
WordSense AI, an Express backend with BullMQ workers and Redis queues for the AI Curriculum
Design Engine, Drizzle ORM over SQLite/Postgres for CurryCue, and the points and
leaderboard endpoints on SWINS. The first four were solo.

**What is he still developing?**
Automated testing, CI/CD, raw SQL, monitoring and observability, and system design at
production scale.
