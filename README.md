
# WeatherLy

A production-deployed weather client built with React + TypeScript, featuring real-time geolocation, OpenWeather API integration, and a Vercel-powered CI/CD pipeline.

Live Demo: https://weatherly-sigma-six.vercel.app/

Source Code: https://github.com/tanqdev/WeatherLy


## Features

- Real-time weather using browser geolocation
- Current conditions + multi-day forecast
- Reverse geocoding for readable location names
- Optimized data fetching with caching (TanStack Query)
- Dark / Light mode support
- Fully responsive UI
- Multi-route navigation (dashboard + city views)


## Tech Stack

**Frontend**

- React 19 + TypeScript
- Vite (build tool)

**State & Data**

- TanStack Query (server-state management, caching, refetching)

**UI**

- Tailwind CSS
- ShadCN UI + Radix UI (accessible components)

**Routing**

- React Router

**APIs**

- OpenWeatherMap API
- Reverse Geocoding API

**Deployment**

- Vercel (CI/CD + environment config)


## Overview
- Client-side SPA with modular component structure
- Server-state handled via TanStack Query (avoids unnecessary API calls)
- Environment variables injected at build time via Vite
- Separation of concerns between UI, API layer, and state logic
## Installation

Install this project with npm

```bash
# Clone the repository
git clone https://github.com/tanqdev/WeatherLy.git

# Navigate into the project
cd WeatherLy

# Install dependencies
npm install

# Start development server
npm run dev
```

