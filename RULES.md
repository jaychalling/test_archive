# Project Rules & Guidelines

> **New Test Implementation Guide**: For a step-by-step workflow on adding new tests, refer to `.agent/workflows/standard_test_implementation.md`.

## 1. Project Structure & Architecture

### Frontend (Next.js)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Directory Structure
- `frontend/app/test/[test-id]`: Individual test pages.
- `frontend/utils`: Shared utilities (e.g., metadata, helpers).
- `frontend/app/api/og`: Open Graph image generation.

## 2. Coding Standards

### A. Metadata Generation
- **DO NOT** duplicate `generateMetadata` logic in page components.
- **USE** `generateTestMetadata` from `@/utils/metadata` for all test pages to ensure consistent title/description formatting and OG image linkage.
- **Pattern**:
  ```typescript
  import { generateTestMetadata } from '@/utils/metadata';
  
  export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
      return generateTestMetadata({
          searchParams,
          testType: 'your-test-id',
          baseTitle: "Test Title",
          description: "Test Description",
          getResultTitle: (res) => `result specific title`
      });
  }
  ```

### B. Open Graph (OG) Image Generation
- **Single Route**: The entry point is `frontend/app/api/og/route.tsx`.
- **Renderer Separation**: **DO NOT** write rendering logic inside `route.tsx`.
- **Location**: Place specific rendering logic in `frontend/app/api/og/renderers/`.
  - Example: `renderers/kpop.tsx`, `renderers/health.tsx`.
- **Pattern**:
  - `route.tsx` handles query param parsing and routing.
  - Separate renderer files export a handle function (e.g., `handleKPopRequest`) that returns an `ImageResponse`.

### C. Test/Quiz Implementation
- **Separation of Concerns**:
  - **Data**: Questions, weights, and scoring logic MUST be separated from UI components.
  - **Location**: Use `questions.ts` or a `data/` folder within the test directory.
  - **UI**: Components (e.g., `QuizUI.tsx`, `AnalysisReport.tsx`) should be presentational and accept data/logic as props or imports.
- **Result Calculation**:
  - Encapsulate result calculation in a pure function (e.g., `calculateResult`) that can be tested independently and used on both client (result page) and server (OG image generation).

### D. File Types
- **Images**: Use `.png` or `.jpg` for OG image assets compatibility with `@vercel/og`. Avoid `.webp` for OG generation if possible, or test thoroughly.

### E. UI/UX Standards
- **Result Page Actions (Critical)**:
  - ALWAYS implement the **Standardized 4-Button Grid** at the bottom of `AnalysisReport.tsx`:
    1. **Share Test**: Copies test URL or uses Web Share API.
    2. **Share Result**: Copies result-specific URL (with params).
    3. **Retake**: Restarts authentication/quiz flow.
    4. **Home**: Links back to `/`.
- **Quiz Interaction**:
  - **Auto-Advance**: For single-choice questions (e.g., Likert scale), automatically move to the next question after a selection (with a short ~250ms delay) to reduce clicks.
  - **Progress Bar**: Always display a visual progress indicator.
- **Hero Section**:
  - The "Featured" test in `frontend/app/page.tsx` gets a dedicated Hero section. Ensure a high-quality Hero image is added to `public/` when promoting a test to Featured status.

## 3. Deployment Rules

- **[CRITICAL] Pre-Push Verification**:
  **Before running `git push`, YOU MUST ALWAYS perform the following checks:**
  1. **Run Build Verification**:
     - From **Root** or **frontend** directory: `npm run build`
     - **IF THE BUILD FAILS**: STOP IMMEDIATELY. Fix the errors shown in the terminal. Do **NOT** push broken code.
     - **IF THE BUILD SUCCEEDS**: Proceed to commit and push.
  2. **Update Sitemap**: Check `frontend/app/sitemap.ts` and ensure all new routes are included.
  3. Commit changes: `git add .` -> `git commit -m "..."` -> `git push`

- **Deploying to Vercel**:
  - Always deploy from the **Project Root** (parent of `frontend`).
  - Command: `vercel --prod`
  - If prompted, confirm settings. The `vercel.json` at root handles the rewrite configuration.

- **Platform Configuration**:
  - **Platform**: Vercel
  - **Routes** (managed by `vercel.json`):
    - `/api/(?!og)(.*)` -> Backend (Flask)
    - `/api/og` -> Frontend (Next.js)
    - `/(.*)` -> Frontend (Next.js)