---
title: "Project: Rider Tracker"
type: project
visibility: public
tier: 1
ownership: full (built end to end)
employer: TMCC
status: shipped
voice: first-person
last_updated: 2026-09-14
version: 2.0
---

# Rider Tracker

**Link:** Google Play — *package ID pending verification (`com.whizzrider` vs
`com.whizz.delivery`)*

## Overview

A React Native application for tracking delivery riders in real time, including location
while the app is backgrounded, device details and battery level. Built at TMCC as part of
the Whizz delivery ecosystem. I built the entire application.

## Problem

Fleet operations need to know where riders are, and a rider's phone spends most of its time
with the app in the background or the screen off. A tracker that only reports while the app
is in the foreground is not a tracker. The project was also constrained to React Native CLI,
which does not provide reliable background location in a straightforward way.

## My contribution

All of it: architecture, React Native client, Python/Flask backend, SQLite storage,
authentication, the background location implementation, Android permission configuration,
API security, and production deployment.

This is the project where I own every layer, and it is the one I would pick if asked to
walk through a system end to end.

## Overall system architecture

The React Native client registers a background task that periodically reports GPS
coordinates, a timestamp and battery level to the Flask backend, which persists telemetry
to SQLite. Riders authenticate by phone OTP, binding a rider identity to a device.

## Technologies I personally used

React Native (CLI, with Expo libraries integrated), Expo TaskManager and Location APIs,
Firebase Phone Authentication, Python, Flask, SQLite, Android background permission
configuration, secure API headers.

## Engineering challenges

**Background location under a CLI constraint.** This was the hard part. React Native CLI
did not give me the background location behaviour I expected. I worked through several
approaches first — picture-in-picture style tricks, home-screen mechanisms, and other React
Native techniques for staying alive in the background — and none of them held up.

The solution was a hybrid: pulling Expo's libraries into the React Native CLI application
so I could use Expo TaskManager and the Location APIs for background reporting, without
migrating the whole project to managed Expo. That kept the CLI constraint intact while
giving me the one capability the project actually needed.

**Android background permissions.** Background location on Android requires explicit
channel and permission handling, and behaviour varies by version. This needed
device-specific configuration rather than a single code path.

**Securing telemetry.** Location data is sensitive, so API requests carry secure headers
and rider identity is bound to a device through OTP authentication rather than being
trusted from the client.

## Important decisions and tradeoffs

- **Hybrid Expo-inside-CLI rather than a full Expo migration.** Unusual, and it means
  carrying Expo dependencies in a CLI project. It was the smallest change that solved the
  problem without violating the project's constraint.
- **Flask and SQLite rather than a heavier stack.** The workload is periodic small writes
  from a bounded set of devices. Anything larger would have been infrastructure for its own
  sake — though SQLite is the first thing I would replace if the fleet grew substantially.
- **Periodic reporting rather than continuous streaming**, trading location granularity for
  battery life and data use, which matters on a rider's own phone.

## Outcome

Shipped to the Google Play Store and used in production. Background tracking worked.

## What I learned

That platform constraints are often solved sideways rather than head-on. I spent real time
trying to make the officially-supported path work before accepting that combining two
toolchains was the pragmatic answer. Also that owning the backend changes how you design
the client — knowing exactly what the server does with a payload led to a simpler protocol
than I would have designed against someone else's API.
