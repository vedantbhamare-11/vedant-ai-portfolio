
# Project: Rider Tracker App

* **Title:** Rider Tracker App
* **Description:** A real-time React Native tracking application for delivery riders ensuring continuous background location monitoring, battery health tracking, and secure authentication.
* **Technologies:** React Native, Expo, Firebase Auth, Python, Flask, SQLite
* **Link:** https://play.google.com/store/apps/details?id=com.whizz.delivery

## Deep Dive & Architectural Context for AI Knowledge

I developed the Rider Tracker App to solve the operational challenges of monitoring delivery fleets in real-time. I built the frontend using React Native (Expo) and created a custom Python Flask backend to handle the telemetry data.

A major engineering challenge was ensuring continuous tracking even when the app was closed. I solved this by leveraging Expo's TaskManager and Location APIs to ping the backend every 15 seconds with GPS coordinates, timestamps, and the device's battery level. For security, I integrated Firebase Phone Auth (OTP) to bind unique rider IDs to their devices securely. I also implemented Android-specific optimizations for background channel permissions and secure API headers for data transmission.
