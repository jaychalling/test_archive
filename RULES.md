# Project Rules & Guidelines

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

## 3. Deployment
- **Platform**: Vercel
- **Configuration**: `vercel.json` manages routing between Next.js frontend and Flask backend.
- **Routes**:
  - `/api/(?!og)(.*)` -> Backend (Flask)
  - `/api/og` -> Frontend (Next.js)
  - `/(.*)` -> Frontend (Next.js)