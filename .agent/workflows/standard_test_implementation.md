---
description: Guide for adding a new test based on the K-Pop Demon Hunter implementation
---

# New Test Implementation Guide

This guide outlines the standard process for adding a new test to the platform, using the "K-Pop Demon Hunter Test" as a reference implementation.

## 1. File Structure Checklist

Create a new directory: `frontend/app/test/[test-id]`

Required files:
- `page.tsx`: Server Component for metadata and SEO.
- `[TestName]ClientPage.tsx`: Main Client Component wrapper.
- `questions.ts`: Data module containing questions, options, logic, and types.
- `components/`:
    - `QuizUI.tsx`: The interactive quiz interface.
    - `AnalysisReport.tsx`: The results display page.
    - `Landing.tsx` (Optional): If a specific landing page is needed inside the ClientPage logic.

## 2. Step-by-Step Implementation

### Step 1: Define Data & Logic (`questions.ts`)
- Define TypeScript interfaces: `Question`, `Option`, `ResultType`.
- Export `QUESTIONS` array.
- Implement `calculateResult(answers)` function.
- **Reference**: `frontend/app/test/kpop-hunter/questions.ts`

### Step 2: Create Server Page (`page.tsx`)
- Implement `generateMetadata` for dynamic SEO titles based on results.
- Add JSON-LD structured data for Google Rich Snippets (`Quiz` schema).
- Render the Client Page component.
- **Reference**: `frontend/app/test/kpop-hunter/page.tsx`

### Step 3: Create Client Wrapper (`[TestName]ClientPage.tsx`)
- Manage routing state (Quiz vs Result).
- Handle URL parameters (e.g., `?res=XYZ`).
- Use `<Suspense>` for search params.
- **Reference**: `frontend/app/test/kpop-hunter/KPopClientPage.tsx`

### Step 4: Implement Quiz UI (`components/QuizUI.tsx`)
- Manage `step` (current question index) and `answers` state.
- Implement progress bar.
- Add auto-advance or explicit "Next" button.
- Include a "Analyzing..." loading state before showing results.
- **Reference**: `frontend/app/test/kpop-hunter/components/QuizUI.tsx`

### Step 5: Implement Results Page (`components/AnalysisReport.tsx`)
- Display the result main card (Title, Image, Description).
- Show detailed analysis (Strengths, Weaknesses, Compatibility).
- **Standardized Action Buttons**: Always include the 4-button grid at the bottom:
    1. Share Test (Copy URL / Web Share API)
    2. Share Result (Copy URL with params)
    3. Retake Test
    4. Go Home
- **Reference**: `frontend/app/test/kpop-hunter/components/AnalysisReport.tsx`

## 3. Registering the Test

### Register in `frontend/app/page.tsx`
- Add the test entry to `INITIAL_TESTS` array.
- properties:
    - `id`: Unique string (matches folder name).
    - `title`, `description`, `category` (Health, Personality, Fun).
    - `duration` (e.g., "5 min"), `participants`.
    - `icon`: Import from `lucide-react`.
    - `image`: Background color class or gradient (e.g., `bg-pink-600`).
    - `isFeatured`: Boolean (only one test should be featured).

## 4. UI/UX Standards

- **Hero Image (If Featured)**: Use a high-quality PNG in `public/` and reference it in the conditional rendering logic in `page.tsx`.
- **Transitions**: Use `framer-motion` or Tailwind `animate-in` classes for smooth question transitions.
- **Responsiveness**: Ensure touch-friendly buttons for mobile (min-height 44px).
- **Theme**: Use slate-900 for text, proper contrast colors for badges.

## 5. Open Graph & Social Sharing

- **OG Images**:
    - Place default OG image in `public/images/og/[test-id].png`.
    - Recommended size: 1200x630px.
    - If results are dynamic, ensure `page.tsx` metadata logic handles dynamic titles/descriptions.
    - For fully dynamic OG images (e.g., showing the specific character result), use `next/og` (ImageResponse) in a dedicated API route if needed, or fallback to a high-quality static image.

## 6. Deployment Verification

- Check `http://localhost:3000/test/[test-id]`.
- Verify the "Result Sharing" link generates a preview (if configured in metadata).
- Ensure no hydration errors occur (use `suppressHydrationWarning` if needed on dates/randoms).
