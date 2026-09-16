---
title: "Project: AI Curriculum Design Engine"
type: project
visibility: public
tier: 1
ownership: solo
status: live
voice: first-person
last_updated: 2026-09-14
version: 2.0
---

# AI Curriculum Design Engine

**Link:** https://ai-curriculum-design-engine.vercel.app/

## Overview

An assessment generator for educators. Teachers upload source material and the system
produces curriculum-aligned question papers, worksheets and marking schemes. Built solo.
Live.

## Problem

Document-processing systems built naively around AI break in predictable ways: HTTP
requests time out on large files, the browser freezes while work happens, and memory runs
out on constrained hosting. A teacher uploading a 20MB textbook should not be watching a
spinner wondering whether the tab has crashed.

## My contribution

Everything — the Next.js frontend, the Express backend, the queue and worker architecture,
the AI grounding strategy, and deployment.

## Overall system architecture

Fully decoupled and asynchronous:

1. The Next.js frontend sends multipart uploads through a custom API wrapper
2. The Express backend stores metadata in MongoDB Atlas, pushes a job into Upstash Redis
   via BullMQ, and immediately returns `202 Accepted`
3. Dedicated BullMQ workers consume jobs independently of the web server, handling PDF
   parsing, text extraction, OCR, compression, curriculum analysis, question generation and
   marking scheme creation
4. The interface never blocks; all heavy work happens behind the queue

## Technologies I personally used

Next.js 15, Express.js, BullMQ, Upstash Redis, MongoDB Atlas, Gemini 2.5 Flash, Zustand,
Tailwind CSS, Gzip compression.

## Engineering challenges

**Surviving worker death.** The system runs on cloud hosting with hard RAM limits, so
workers do get killed mid-job by memory pressure and container restarts. BullMQ holds job
state in Redis, so a crashed job is retried with a fixed backoff and unfinished work
resumes rather than silently disappearing or being processed twice.

**Grounding generation in the right material.** Generated questions have to match what was
actually taught, not just the subject in general. I used a two-tier context hierarchy:
teacher-supplied material — notes, whiteboard photographs, handwritten documents — takes
priority, with curriculum textbooks and syllabus references as the secondary layer. Where
the two disagree, the classroom material wins.

**Large payload storage.** Extracted educational content is Gzip-compressed before storage,
which reduces what is stored and moved across the network.

**Unreliable uploads.** Custom API wrappers on the frontend handle FormData construction
and multipart boundaries, and make requests retry-friendly, because cloud deployments drop
large uploads more often than local development suggests.

## Important decisions and tradeoffs

- **Queue-first rather than request-response.** The cost is more moving parts and a job
  state model to reason about. The benefit is that no user-facing request is ever waiting
  on AI generation, and the system degrades by queuing rather than by timing out.
- **Gemini 2.5 Flash** rather than a larger model, for latency and cost on a workload
  that is high-volume and structurally constrained rather than open-ended.
- **Compression before storage**, accepting CPU cost at write time in exchange for smaller
  storage and faster transfer.

## Outcome

Live and functioning. Large uploads process without blocking the interface, and jobs
survive worker restarts.

> **Performance note.** Two figures previously quoted here — a compression percentage and a
> sub-200ms acknowledgement time — were estimates and have been removed pending
> measurement. Accurate framing: compression reduces large source material before it goes
> through the assessment-generation pipeline, and the API returns an immediate asynchronous
> acknowledgement while generation continues through background workers.

## What I learned

This is where queues stopped being a concept and became something I had actually debugged.
Retry semantics, idempotency, and what happens to in-flight work when a process dies are
things I now think about from the start rather than discovering under load.
