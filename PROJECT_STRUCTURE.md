# Project Structure & Documentation

This document provides a detailed overview of the project's architecture, technology stack, and operational logic, intended for external LLMs or new developers.

## 1. Project Overview

The project is a **hybrid web application** designed to host various personality and health tests (e.g., Cognitive Brain Test, K-Pop Hunter, Diabetes Risk).

It currently employs a dual-stack architecture:
1.  **Backend (Flask)**: Handles the original logic, serves server-side rendered templates for legacy/fallback purposes, and manages the database connection to Supabase.
2.  **Frontend (Next.js)**: A modern, React-based frontend using the App Router, intended to be the primary user interface. It currently features a polished landing page with mock data and specific test pages.

## 2. Technology Stack

### Backend
-   **Language**: Python
-   **Framework**: Flask
-   **Database**: Supabase (PostgreSQL)
-   **Libraries**: `supabase` (client), `python-dotenv` (env vars)
-   **Key Features**: Robust fallback mechanism (serves mock data if DB connection fails).

### Frontend
-   **Framework**: Next.js 14+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **Deployment**: Vercel (configured via `vercel.json`)

## 3. Directory Structure

```
/
├── backend/                  # Flask Backend
│   ├── app.py                # Main Flask entry point
│   ├── services/
│   │   └── db_supabase.py    # Database service with fallback logic
│   ├── templates/            # HTML templates (main.html, test.html, result.html)
│   ├── static/               # Static assets for Flask
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # Next.js Frontend
│   ├── app/                  # App Router directory
│   │   ├── page.tsx          # Main landing page (contains hardcoded test list)
│   │   ├── api/              # API Routes
│   │   │   └── og/           # Open Graph Image Generation
│   │   │       ├── route.tsx # Main OG route
│   │   │       └── renderers/# Specific renderers for different tests
│   │   └── test/             # Test pages (e.g., /test/[id])
│   ├── utils/
│   │   └── metadata.ts       # Shared metadata generation logic
│   ├── components/           # React components
│   └── package.json          # Frontend dependencies
│
├── vercel.json               # Vercel deployment config (routing rules)
└── RULES.md                  # Development guidelines and architectural rules
```

## 4. Backend Architecture

### `backend/app.py`
The core Flask application. It defines routes that correspond to the user flow:
-   `/`: Main lobby (renders `main.html`).
-   `/test/<test_id>`: The quiz interface (renders `test.html`).
-   `/result/<test_id>`: The result page (renders `result.html`).

### `backend/services/db_supabase.py`
Handles all database interactions.
-   **Initialization**: Attempts to connect to Supabase using env vars.
-   **Fail-safe**: If the connection fails or credentials are missing, it silently falls back to returning hardcoded **Mock Data**.
-   **Methods**:
    -   `get_all_tests()`: Fetches active tests.
    -   `get_test_data(test_id)`: Fetches questions and metadata for a specific test.
    -   `get_result(test_id, score)`: Calculates/fetches the result based on the user's score.

## 5. Frontend Architecture

### Core Components
-   **Landing Page (`frontend/app/page.tsx`)**:
    -   Uses client-side state (`useState`) for filtering categories.
    -   **Data Source**: Currently uses a hardcoded `INITIAL_TESTS` array for display purposes, effectively acting as a mock while the backend integration is finalized.
    -   **Styling**: Features a responsive grid, hero section, and category filters using Tailwind.

### Specific Architectural Patterns (from `RULES.md`)

#### A. Metadata (`frontend/utils/metadata.ts`)
-   Centralized logic for generating SEO and Open Graph metadata.
-   Ensures consistent title formatting (e.g., "My Result: ...") and OG image linkage.
-   **Usage**: All test pages import `generateTestMetadata` instead of duplicating logic.

#### B. Dynamic OG Images (`frontend/app/api/og/`)
-   **Entry Point**: `route.tsx` handles the request.
-   **Renderers**: Specific drawing logic is separated into `renderers/` (e.g., `kpop.tsx`, `cognitive.tsx`) to keep the route handler clean.
-   **Runtime**: configured to `nodejs` to support larger base64 images if needed.

## 6. Data Flow & Routing

### Routing (`vercel.json`)
The project uses `vercel.json` to manage traffic between the Next.js frontend and Flask backend:
-   `/api/(?!og)(.*)`: Routed to the **Python Backend** (API endpoints).
-   `/api/og`: Routed to **Next.js** (Frontend OG generation).
-   `/(.*)`: Default routed to **Next.js** (Frontend UI).

### Data Strategy
-   **Current State**: The frontend heavily relies on local mock data (`page.tsx`) for the lobby.
-   **Intended State**: The frontend should eventually fetch test configurations from the Flask API (which in turn gets them from Supabase).

## 7. Key Features / Tests
The platform hosts several tests, some active and some placeholders:
1.  **Cognitive Brain Test**: Features a specialized 20-question analysis.
2.  **K-Pop Hunter**: A fun personality test with custom character results.
3.  **Diabetes Risk**: A health-focused assessment.
4.  **Body Age**: Biological vs Chronological age comparison.

## 8. Development Guidelines
-   **Images**: Use `.png` or `.jpg` for OG assets.
-   **Separation of Concerns**: Test logic (questions/scoring) should be separated from UI components.
-   **Environment**: Requires `.env` for Supabase credentials (`SUPABASE_URL`, `SUPABASE_KEY`).
