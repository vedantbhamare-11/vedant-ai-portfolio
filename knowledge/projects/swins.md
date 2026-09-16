---
title: "Project: SWINS"
type: project
visibility: public
tier: 2
ownership: frontend, plus selected backend endpoints
employer: TMCC
status: shipped
voice: first-person
last_updated: 2026-09-14
version: 2.0
---

# SWINS

**Link:** Google Play — *package ID pending verification (`com.tmcc.smallwins` vs
`com.swins`)*

## Overview

An internal peer-appreciation platform. Employees post recognition for colleagues, others
react and comment, and that activity feeds points, leaderboards and badges. Built at TMCC.

This was my first React Native project.

## Problem

Top-down recognition schemes like "employee of the month" are infrequent, arbitrary, and
largely ignored. The product's bet was that continuous peer-to-peer appreciation, shaped
like a social feed, would actually get used.

## My contribution

**Frontend and client:**
- UI across onboarding, post, profile, chat and leaderboard screens
- Client-side state management with Redux
- Real-time feed updates and push notification handling on the client

**Backend:**
- The points and leaderboard endpoints

## Overall system architecture — partly my work

The application ran on a Node.js and MongoDB backend with a WebSocket layer for live feed
updates and notifications. Most of that backend was built by other engineers. My backend
contribution was scoped to the points and leaderboard endpoints; I consumed the WebSocket
layer from the client rather than building it.

## Technologies I personally used

React Native, TypeScript, Redux, and Node.js for the endpoints I wrote.

## Engineering challenges

This was my first React Native project, and most of the difficulty was in learning the
platform while shipping on it:

- **Safe area handling** across devices with notches and varying insets
- **Touchability** — touch targets not registering as expected, a class of bug that does
  not exist in the same form on web
- **Z-index and layering**, which behaves differently from CSS stacking
- **State management** across a feed with live updates

I worked through these using documentation, Stack Overflow, community discussions and LLMs,
learning React Native concepts against real problems rather than in the abstract.

## Important decisions and tradeoffs

- **Redux for client state**, given a feed that updates from both user action and pushed
  events, where predictable state transitions mattered more than minimal boilerplate.
- **Points logic on the server, not the client.** Scores drive leaderboards, so they cannot
  be computed anywhere a user could influence them.

## Outcome

Shipped to the Google Play Store and used internally. Recognition became visible across the
organisation rather than happening in private.

> Earlier versions of this file claimed measurable improvements in morale and retention.
> Nothing supports that, and it has been removed.

## What I learned

React Native, essentially from zero, under delivery pressure. The specific lesson that
stuck is that mobile is not web with a different renderer — safe areas, touch handling and
layering each behave on their own terms, and assuming otherwise cost me time.

Writing the points endpoints also made the frontend/backend boundary concrete for the first
time: deciding what the client is allowed to compute and what the server must own is a
trust question before it is an architecture question.
