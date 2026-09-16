---
title: "Project: Road Asset and Defect Detection"
type: project
visibility: public
tier: 3
ownership: contributor (labelling, preprocessing, evaluation support)
employer: IBC Cube
status: internship project
voice: first-person
last_updated: 2026-09-14
version: 2.0
warning: Scope corrected. Model development, training and deployment were the team lead's work. Never name a model architecture.
---

# Road Asset and Defect Detection

**Organisation:** IBC Cube · **Period:** June – August 2023 · **Role:** Machine Learning
Engineer Intern

## Overview

A computer vision project automating the identification of road infrastructure assets and
surface defects from road survey imagery, aligned with National Highways Authority of India
guidelines. This was my first internship.

## Problem

Road infrastructure inspection in India was manual, slow and inconsistent. Surveying roads
by eye does not scale across a highway network, and defects get caught late. The goal was
to move from manual inspection toward automated detection from survey footage.

## My contribution

Being precise about this, because an earlier version of this file overstated it:

- **Image and data labelling and annotation** — a substantial amount, and my largest
  contribution
- **Data preprocessing** using OpenCV
- **Data cleaning** and preparation
- **Model evaluation** — contributed alongside the team lead
- **Dataset creation** — collaborative across the team
- **Python automation** of repetitive data-processing steps

## What the team did — not my work

- **Model development and training:** the team lead
- **Deployment:** the team lead

I was present for the training process and gained exposure to it, but I did not run it.

**I do not remember the model architecture used.** This project must never be described as
using YOLO, or any named CNN, unless that information is recovered from the original work.

## Technologies I personally used

Python, OpenCV.

TensorFlow was used on the project, but by the team lead for model work. I am not claiming
TensorFlow as a skill on the basis of this project. AWS and MediaPipe appeared in an earlier
version of this file and were not part of my work at all.

## System context

The system analysed road survey images and video — including test runs using a bonnet-mounted
camera — to detect infrastructure assets such as street lights, crash barriers, medians,
trees and kerbs, and surface defects such as potholes and road scaling. Detected items could
then be counted and analysed.

## What I learned

Most of what I took from this was about data rather than models. Labelling a large volume of
survey imagery gives you opinions you cannot get any other way: about ambiguous cases,
inconsistent labelling between people, class imbalance, and how much model performance is
determined before training starts.

I also learned how much repetitive data work can be automated with Python scripts, which is
a habit I have kept.

> Earlier versions claimed the system significantly reduced future maintenance costs.
> Nothing supports that, and it has been removed.
