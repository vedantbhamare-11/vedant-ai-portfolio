---
title: "Project: SPI Game"
type: project
visibility: public
tier: 3
ownership: solo
status: archive
voice: first-person
last_updated: 2026-09-14
version: 1.1
---

# SPI Game

**Link:** https://drive.google.com/file/d/1E50ZcTTCGdU-7QJAog6ffIHoD4XDnsJg/view

## Overview

A browser-based multiplayer strategy simulation. Players each start with a single entity
and manage energy and space to reproduce, move and survive, with the simulation running
until one player outlasts the rest. Multiple players share one device.

An early project, kept for one reason: I wrote the game engine myself.

## My contribution

All of it.

## Technologies I personally used

JavaScript, HTML5, CSS. No game framework.

## Engineering notes

Rather than using an existing engine, I wrote the game loop, state model and rules from
scratch in vanilla JavaScript — entity lifecycle (birth, reproduction, mortality), resource
constraints, turn resolution and win conditions.

## Status

Archived. It predates my professional work and does not represent my current level, but the
from-scratch engine is a reasonable answer to "have you ever built something without a
framework doing the work for you."
