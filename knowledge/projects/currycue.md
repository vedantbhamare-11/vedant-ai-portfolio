---
title: "Project: CurryCue"
type: project
visibility: public
tier: 1
ownership: solo
status: live
voice: first-person
last_updated: 2026-09-14
version: 2.0
---

# CurryCue

**Link:** https://curry-cue.vercel.app/

## Overview

An AI kitchen assistant connecting pantry inventory to daily cooking. It tracks what you
have, suggests recipes you can actually make, and talks you through cooking hands-free.
Built solo. Live.

## Problem

Recipe suggestion from an LLM goes wrong in a specific way: it will happily invent dishes
nobody cooks, or suggest something requiring four ingredients you do not have. The
interesting constraint is not generating recipes, it is refusing to generate bad ones.

## My contribution

Everything — frontend, data layer, AI provider integration, prompt design and guardrails.

## Overall system architecture

A Next.js application with a configurable AI provider layer, so text, vision, speech and
image generation each route to an appropriate service rather than forcing one model to do
everything. Inventory state lives in a relational store accessed through Drizzle ORM.

## Technologies I personally used

Next.js 15, React 18, Zustand, Tailwind CSS, Drizzle ORM over SQLite/Postgres, Claude
Bedrock, Azure GPT-4o, ElevenLabs, Stability AI, Framer Motion, Radix UI, CMDK.

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
with selectable voices, and the interaction model assumes the user is not looking at the
screen.

**Provider configurability.** Text and vision run through Claude Bedrock and Azure GPT-4o
behind a common interface supporting both streaming and non-streaming, so swapping a
provider does not mean rewriting feature code.

## Important decisions and tradeoffs

- **Constrain the model rather than trusting it.** Restricting output to known dishes
  reduces variety, which is the right trade when the failure mode is a user cooking
  something inedible.
- **A provider abstraction from the start**, accepting extra indirection early in exchange
  for not being locked to one vendor's availability, pricing or capability.
- **Drizzle over a heavier ORM**, for a schema this size.

## Outcome

Live, with pantry sync, vision-based inventory updates, guarded recipe suggestion,
voice-guided cooking, and completion feedback intended to make the habit stick.

## What I learned

That the useful engineering in an AI product is usually in the constraints. The prompt is
easy; deciding what the system must refuse to do is the part that determines whether anyone
trusts it.
