---
title: "Project: Interconnect"
type: project
visibility: public
tier: 2
ownership: frontend (web and mobile)
employer: TMCC
status: in production
voice: first-person
last_updated: 2026-09-14
version: 2.0
---

# Interconnect

**Link:** https://interconnect.blockchainforimpact.in/landing

## Overview

A professional networking and research-sharing platform, built at TMCC for a client. Users
publish research, post content, connect with each other, and collaborate. It has both a
Next.js web client and a React Native mobile client.

## Problem

Client research was scattered and siloed, so the same work was repeated across teams. The
product needed to centralise it in something people would actually use, which meant it had
to feel like a social platform rather than a document repository.

## My contribution

I built the frontend, on both the web and mobile clients. Specifically:

- The chat interface, including separate interaction flows for desktop and mobile
- Debounced search and filtering across research by industry and client type
- The analytics dashboard UI, consuming analytics endpoints built by others
- Feed performance work: lazy loading and pagination through heavy content

## Overall system architecture — not my work

The backend was Node.js with REST APIs over MongoDB, and the real-time layer was a
WebSocket server. Both were built by other engineers on the team. I consumed the WebSocket
connection from the client; I did not build or operate the socket layer.

This distinction matters: I can talk about consuming real-time events in a React client,
and I cannot claim to have designed a WebSocket backend.

## Technologies I personally used

Next.js, React Native, TypeScript, Redux, WebSocket client consumption.

## Engineering challenges

**Chat across two genuinely different interaction models.** The hard part was not
responsive layout. On desktop, users expect a conversation list beside an open thread and
move between conversations without losing context. On mobile, a thread is a full-screen
view you navigate into and back out of. Forcing both into one component tree produces
something that feels wrong on both.

I built separate flows for the two rather than one adaptive flow, accepting duplicated
interaction logic in exchange for each platform behaving the way its users expect.

**Feeds with heavy media.** Posts carry images, video and PDFs, so the feed needed lazy
loading and pagination to scroll smoothly rather than loading everything.

**Search that does not fire on every keystroke.** Debounced filtering across research by
industry and client type, so the interface stays responsive while typing.

## Important decisions and tradeoffs

- **Two interaction flows rather than one responsive one**, trading duplicated logic for
  platform-appropriate behaviour.
- **Client-side debouncing** to reduce query volume without backend changes, since the
  backend was not mine to alter.

## Outcome

In active use by the client, who reported the platform passing 1,000 users. I built the UI
quickly and contributed to how the frontend was structured.

## What I learned

That "make it responsive" and "make it work on mobile" are different requirements, and
conflating them produces interfaces that technically fit the screen while feeling wrong.
Also how much of frontend performance work on a content feed is about what you avoid
loading.
