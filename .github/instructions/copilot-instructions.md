---
description: Copilot instructions for a college full-stack project using Astro, Svelte 5 islands, and Node/Express/MongoDB.
applyTo: "**"
---

# Project Context

This repository is a **college full-stack development course project**.

Primary stack:

- **Frontend/SSG:** Astro (multi-page static site generation)
- **Interactive UI islands:** Svelte 5 components in Astro islands
- **Backend API:** Node.js + Express
- **Database:** MongoDB (native driver)

Hard constraints:

- **Do NOT use Mongoose**
- **Do NOT use Tailwind CSS**

When proposing dependencies, patterns, or code, always respect these constraints.

# Goals for Generated Code

When generating or modifying code, optimize for:

- Readability and learning value (this is coursework)
- Clear separation of concerns (Astro pages/components vs API server)
- Small, explainable modules
- Minimal magic and minimal hidden framework behavior

Prefer straightforward implementations over clever abstractions.

# Architecture Guidelines

## Frontend (Astro + Svelte 5)

- Use Astro for routing and page composition.
- Keep pages static-first; add Svelte islands only where interactivity is needed.
- Use Svelte 5 idioms and modern patterns appropriate for class projects.
- Keep component responsibilities focused and simple.

## Backend (Express)

- Keep API routes REST-style and resource-oriented.
- Use clear layers when helpful:
  - routes
  - controllers/handlers
  - data-access (MongoDB)
- Validate request input server-side.
- Return consistent JSON response shapes.
- Handle errors with centralized Express error middleware.

## Database (MongoDB Native Driver)

- Use the official `mongodb` Node.js driver.
- Reuse a shared Mongo client connection utility.
- Keep database operations in dedicated modules (not inline in route files when avoidable).
- Use ObjectId conversion/validation carefully in route handlers.

# Styling Rules

- Do not generate Tailwind classes or Tailwind config.
- Prefer plain CSS, CSS modules, or scoped component styles.
- Keep styling simple and maintainable.

# Code Quality Conventions

- Use descriptive names (avoid one-letter names except simple loop indexes).
- Prefer async/await over raw Promise chains.
- Add comments only when they provide real value.
- Keep functions small and single-purpose.
- Avoid dead code and placeholder TODO blocks unless requested.

# Security and Reliability

- Never hardcode secrets or credentials.
- Use environment variables for configuration (DB URI, ports, etc.).
- Include basic request validation and error handling.
- Sanitize/validate user input before DB operations.

# Dependency Rules

Allowed examples:

- `astro`, `svelte`, `express`, `mongodb`

Forbidden examples:

- `mongoose`
- `tailwindcss`

If a suggestion would normally involve forbidden tools, provide an alternative compatible with this project.

# Testing and Verification

When adding features or fixes:

- Suggest lightweight verification steps (run app, hit endpoint, inspect output).
- Prefer minimal, targeted tests if test infrastructure exists.
- Do not add heavy testing frameworks unless asked.

# Documentation Expectations

When creating new features, include concise documentation updates for:

- Setup steps
- Required environment variables
- How to run frontend and backend
- API endpoints (if changed)

# Copilot Response Style for This Repo

When answering in this repository:

- Be concise and practical.
- Explain decisions in plain language suitable for students.
- Offer the simplest correct solution first.
- Avoid overengineering.
