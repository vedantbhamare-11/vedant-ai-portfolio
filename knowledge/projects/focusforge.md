---
title: "Project: FocusForge"
type: project
visibility: public
tier: 3
ownership: solo
status: source available, not deployed
voice: first-person
last_updated: 2026-09-14
version: 1.1
---

# FocusForge

**Link:** https://github.com/vedantbhamare-11/FocusForge-Productivity-Tracker

## Overview

A productivity dashboard combining a Pomodoro timer, habit tracker with streaks, calendar,
task list, focus audio and a points system, in one interface instead of several apps.
Built solo.

## My contribution

All of it.

## Technologies I personally used

Next.js, TypeScript, Tailwind CSS, React Hooks and the Context API, LocalStorage.

## Engineering notes

State is handled with React Hooks and Context, and persisted to LocalStorage for a fast
client-only experience. Modular components include a Focus Mode that hides distracting
interface elements, ambient audio, and a points tracker that rewards consistency.

The deliberate limitation is that it is client-only, with no backend and no sync across
devices. That was the right call for the scope, and it is also the honest ceiling on what
this project demonstrates.

## Status

Source is available on GitHub; it is not deployed. Kept as a tier-3 project — a competent
frontend build, but a smaller technical story than the tier-1 work.
