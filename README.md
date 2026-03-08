# ERTMS Mode Explorer

> An interactive state diagram and scenario simulator for ERTMS/ETCS operating modes — built for railway engineers, students, and researchers.

🔗 **[Live Demo](https://jcampod.github.io/ertms-mode-explorer/)**

## Overview

The ERTMS Mode Explorer is an interactive web application that visualizes the operating modes and transitions defined in the European Train Control System (ETCS) specification. It lets you explore how a train moves between modes such as Full Supervision, Staff Responsible, On Sight, Shunting, and more — and simulate real-world scenarios step by step.

## Features

- **Interactive state diagram** — visualize all ERTMS/ETCS operating modes and their transitions
- **Scenario simulator** — walk through predefined or custom sequences of mode transitions
- **Multilingual support** — available in English, Spanish, German, French, and Italian
- **Animated transitions** — smooth visual feedback powered by Motion
- **Fully client-side** — no backend required, runs entirely in the browser

## Tech Stack

| Component | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Deployment | GitHub Pages |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/jcampod/ertms-mode-explorer.git
cd ertms-mode-explorer
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

The repository includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages on every push to `main`.

## About ERTMS/ETCS

ERTMS (European Rail Traffic Management System) is the standard signalling and control system for European railways. ETCS (European Train Control System) defines the onboard logic, including a set of operating modes that govern how the train behaves under different track conditions and authority states. This tool is based on the ETCS specification (Subset-026).

## License

This project is for educational and research purposes.
