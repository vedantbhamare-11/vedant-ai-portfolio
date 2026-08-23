
# Project: AI Curriculum Design & Asynchronous Assessment Engine

* **Title:** AI Curriculum Design Engine
* **Description:** An AI-driven assessment creator built for educators that generates curriculum-aligned question papers and evaluation grids. It utilizes a fully asynchronous, event-driven architecture to process large educational datasets without freezing the user interface.
* **Technologies:** Next.js 15, Express.js, BullMQ, Redis, MongoDB Atlas, Gemini 2.5 Flash
* **Link:** https://ai-curriculum-design-engine.vercel.app/

## Deep Dive & Architectural Context for AI Knowledge

### System Architecture & Workflow

Traditional AI document processing systems frequently encounter bottlenecks like HTTP timeouts, browser UI freezing, and memory exhaustion. To solve this, this platform adopts a fully decoupled asynchronous monorepo architecture.

* When a teacher uploads a large textbook (20MB+), the Next.js frontend sends optimized multipart requests.
* The Express backend stores metadata in MongoDB, pushes a generation job into Upstash Redis via BullMQ, and instantly returns a `202 Accepted` response to keep frontend response times under 200ms.
* The platform never blocks the user interface. All resource-intensive operations execute through BullMQ and Redis queues.

### Background Processing & Resilience

Dedicated BullMQ workers consume queued jobs independently from the web server.

* **Worker Responsibilities:** PDF parsing, text extraction, OCR processing, compression pipelines, curriculum analysis, question generation, and answer key/marking scheme creation.
* **Failure Recovery:** The system is heavily optimized for cloud deployments with strict RAM limits. If a worker crashes due to memory limits, container restarts, or cloud interruptions, BullMQ preserves the job state in Redis. The system automatically retries failed jobs, applies fixed backoff delays, and recovers unfinished work to prevent duplicate processing.

### AI & RAG (Two-Tier Context Grounding)

The AI follows a strict contextual hierarchy to ensure generated assessments align with classroom instruction:

* **Layer 1 (Highest Priority):** Uploaded teacher notes, whiteboard images, handwritten documents, and classroom materials.
* **Layer 2 (Secondary):** Curriculum textbooks, syllabus references, and subject libraries.
* **Generation Engine:** It creates question papers, practice worksheets, and unit/final exams based on curriculum objectives, grade levels, and difficulty distributions using Google Gemini 2.5 Flash.

### Performance Optimizations & Frontend

* **Automated Data Compression:** Large educational content is compressed using Gzip before storage, reducing database size by up to 90%, lowering costs, and speeding up network transfers.
* **Network-Resilient Frontend:** Custom API wrappers in Next.js provide automatic FormData handling, multipart boundary management, and retry-friendly requests to improve cloud deployment reliability.
* **State Management & Styling:** Uses Zustand for state management and Tailwind CSS for the UI.
