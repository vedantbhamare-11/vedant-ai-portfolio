---
title: "Project: CurryCue"
type: project
visibility: public
tier: 1
ownership: solo (AI logic and data layer); UI/boilerplate scaffolded via Creatr AI
status: live
voice: first-person
last_updated: 2026-09-17
version: 2.0
note: Corrected to disclose Creatr AI's role in scaffolding UI and boilerplate, per the same what-I-built-vs-what-the-tool-did standard applied to every other project in this knowledge base.
---
# CurryCue

**Link:** https://curry-cue.vercel.app/
**Repository:** https://github.com/vedantbhamare-11/CurryCue

## Overview

An AI kitchen assistant connecting pantry inventory to daily cooking. It tracks what you
have, suggests recipes you can actually make, and talks you through cooking hands-free.

## Problem

Recipe suggestion from an LLM goes wrong in a specific way: it will happily invent dishes
nobody cooks, or suggest something requiring four ingredients you do not have. The
interesting constraint is not generating recipes, it is refusing to generate bad ones.

## My contribution and what the tooling did

**Creatr AI**, an AI app-scaffolding tool, generated the initial UI and project boilerplate.

**Mine:** the AI provider abstraction (routing between Claude Bedrock and Azure GPT-4o for
text and vision, ElevenLabs for TTS, Stability AI for image generation), the prompt design
and recipe guardrails, the Drizzle ORM data layer and schema, and the feature logic built
on top of the scaffold — pantry sync, vision-based inventory detection, dietary filtering,
and the voice-guided cooking flow.

If asked how this was built, the honest answer names both: a scaffolding tool for the UI
shell, and hand-written AI integration and data logic on top of it.

## Overall system architecture

A Next.js application with a configurable AI provider layer, so text, vision, speech and
image generation each route to an appropriate service rather than forcing one model to do
everything. Inventory state lives in a relational store accessed through Drizzle ORM.

## Technologies I personally used

Claude Bedrock, Azure GPT-4o, ElevenLabs, Stability AI, Drizzle ORM over SQLite/Postgres,
prompt design and guardrail logic. (Next.js, Zustand, Tailwind, Framer Motion, Radix UI,
and CMDK are the stack Creatr AI scaffolded the UI in; I built and extended within it.)

## Engineering challenges

**Guardrails against plausible nonsense.** The system only suggests verified, recognisable
dishes built from a subset of what the user actually has. It assumes staples — salt, oil,
turmeric — are present, because treating those as missing ingredients makes every
suggestion useless. Dietary filters and cuisine constraints are applied as hard filters
rather than prompt suggestions.

**Multiple input modes into one inventory model.** Ingredients arrive by grocery-app sync,
by manual entry with quantity autocomplete, or by photographing a grocery bag and running
vision detection. All three have to converge on the same normalised inventory, including
parsing bundled quantities like "2 nos." or a weight in grams.

**Hands-free use.** Cooking means wet hands, so ElevenLabs TTS reads instructions aloud
with selectable voices.

**Provider configurability.** Text and vision run through Claude Bedrock and Azure GPT-4o
behind a common interface supporting both streaming and non-streaming, so swapping a
provider does not mean rewriting feature code.

## Important decisions and tradeoffs

- **Scaffold the UI, hand-build the logic.** Using Creatr AI for the UI shell traded some
  control over initial structure for speed, which freed time to spend on the part that
  actually differentiates the product: the guardrail and provider logic.
- **Constrain the model rather than trusting it.** Restricting output to known dishes
  reduces variety, which is the right trade when the failure mode is a user cooking
  something inedible.
- **A provider abstraction from the start**, accepting extra indirection early in exchange
  for not being locked to one vendor's availability, pricing or capability.

## Outcome

Live, with pantry sync, vision-based inventory updates, guarded recipe suggestion, and
voice-guided cooking.

## What I learned

That the useful engineering in an AI product is usually in the constraints, not the UI
shell. Scaffolding the interface and spending the saved time on guardrails and provider
logic was the right allocation of effort for what this product actually needed to get right.
