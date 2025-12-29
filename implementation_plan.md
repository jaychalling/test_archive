# Implementation Plan: Refactoring Money Script Test

The current implementation of `money-script-2026` is a monolithic file. I will refactor it to follow the standard project structure defined in `AGENT.md`.

## User Review Required
> [!IMPORTANT]
> This refactor involves identifying and splitting the existing logic into separate files. No functional changes are intended, but the underlying structure will be significantly improved for maintainability and consistency.

## Proposed Changes

### Frontend - New Directory Structure
Target: `frontend/app/test/money-script-2026/`

#### [NEW] `questions.ts`
- Move `MoneyScriptType`, `Question`, `ResultData` interfaces.
- Move `QUESTIONS` array.
- Move `RESULTS` object.
- Implement `calculateResult(answers: number[])` function.

#### [NEW] `components/Landing.tsx`
- Extract the landing page UI (Title, Description, Start Button) from `MoneyScriptClientPage.tsx`.

#### [NEW] `components/QuizUI.tsx`
- Extract the quiz interface (Progress bar, Question card, Likert scale buttons).
- Handle internal state for current question index and answers.
- Propagate completion to parent.

#### [NEW] `components/AnalysisReport.tsx`
- Extract result view (Header, Archetype card, 2026 Forecast, Strategy, Asset Class).
- Add "Share" and "Restart" functionality as per AGENT.md.

#### [NEW] `og/og-template.tsx`
- Create OG image generator using `ImageResponse`.
- Handle default and result-specific OG images.

#### [MODIFY] `MoneyScriptClientPage.tsx`
- Refactor to become a state container (`landing` -> `quiz` -> `result`).
- Use `useSearchParams` to detect result state (`?res=...`).
- Render sub-components based on state.

### Backend / API
#### [MODIFY] `frontend/app/api/og/route.tsx`
- Import and register the `handleMoneyScriptRequest` from the new OG template.

## Verification Plan

### Automated
- Run `npm run build` to ensure type safety and successful static generation.

### Manual Verification
1.  **Flow Test**: Start test -> Answer questions -> Verify result page appearance.
2.  **Result Persistence**: Refresh result page -> Verify result remains (via URL param).
3.  **OG Image**: Test `/api/og?type=money-script-2026` and `/api/og?type=money-script-2026&res=[encoded]` to see if images are generated correctly.
