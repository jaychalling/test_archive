# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Test-archive.com** is an entertainment quiz/test portal designed as a traffic-generating UX product. The core business flow is: Completion Rate → Result Page Dwell Time → Internal Circulation (Pages/Session) → Ad Revenue (RPM).

**Claude should communicate in Korean (한국어로 대화)**

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:8080)
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## Architecture

### Tech Stack
- **Framework**: React 18 + TypeScript
- **Build**: Vite with SWC
- **UI**: shadcn/ui (Radix primitives) + Tailwind CSS
- **Routing**: React Router DOM
- **State**: TanStack Query (configured), React Hook Form + Zod (available)

### Directory Structure
```
src/
├── pages/
│   ├── Index.tsx                      # Hub page
│   ├── NotFound.tsx
│   └── test/
│       └── [test-name]-test/
│           └── index.tsx              # Each test's page + result
├── components/
│   ├── ui/                            # shadcn/ui (do not modify)
│   ├── Header.tsx, TestCard.tsx
│   ├── ProgressBar.tsx, ResultCard.tsx
│   └── QuestionItem.tsx
├── data/
│   └── [testName]Questions.ts         # Questions + result bands
├── templates/
│   ├── eeat-data-template.ts          # E-E-A-T data interface
│   └── eeat-result-sections.tsx       # Reusable result UI
├── agents/                            # AI agent prompts
├── docs/
│   └── new-test-workflow.md           # Step-by-step test creation guide
├── hooks/
└── lib/utils.ts                       # cn() helper
```

### Key Patterns
- Path alias: `@/` maps to `src/`
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Test file naming: `src/pages/test/{slug}-test/index.tsx` (exception: rice-purity)
- Data file naming: `src/data/{testName}Questions.ts`

## Business Rules (Critical)

### Test Page Rules (Completion Rate is KPI)
- **NO ads, popups, or external links on test pages**
- Minimize distracting navigation
- Progress bar is required
- For 100+ questions: implement session save/auto-save

### Result Page Rules (Revenue Core)
Result pages must follow this exact section order:
1. Hero Result (score/type displayed large)
2. Range / Percentile
3. "What This Typically Means" (2-3 paragraphs)
4. Common Traits / Behaviors (5-8 bullet points)
5. FAQ section (3-6 items)
6. Share Block (Copy + Social)
7. Related Tests (3-5 links)
8. Ads start here (after Related Tests only)

### Content Guidelines
- Use softening language: "typically", "often", "tend to" (avoid definitive statements)
- Prohibited: medical diagnosis, legal advice, political advocacy, named person criticism
- Include disclaimer: "For entertainment purposes only."

## URL Structure
```
/                     → Hub (test directory)
/tests/               → Test listing
/test/{slug}/         → Test page (questions)
/test/{slug}/result/  → Result page (revenue)
```
- Trailing slashes required on all URLs
- No query strings for results (use localStorage/sessionStorage or URL hash)

### URL Exceptions (Legacy Links)
| Test | URL | Reason |
|------|-----|--------|
| Rice Purity Test | `/test/rice-purity` | Already distributed links exist (no `-test` suffix) |

## Adding New Tests

1. Create question data in `src/data/{test-name}Questions.ts`
2. Create page component in `src/pages/{TestName}.tsx`
3. Add route in `src/App.tsx`
4. Add TestCard to Index.tsx grid

### Test JSON Schema (for future data-driven tests)
```json
{
  "id": "test-slug",
  "title": "Test Name",
  "questions": [{ "id": 1, "text": "Question?", "weight": 1 }],
  "scoring": { "type": "sum", "maxScore": 100, "direction": "lower_is_more_experienced" },
  "resultBands": [
    {
      "min": 0, "max": 20,
      "label": "Band Label",
      "meaning": ["paragraph 1", "paragraph 2"],
      "traits": ["trait 1", "trait 2", "..."],
      "faqs": [{"q": "Question?", "a": "Answer"}]
    }
  ],
  "related": ["other-test-1", "other-test-2"]
}
```
Requirements: minimum 4 resultBands, each with 5+ traits and 3+ FAQs.

## Implemented Tests (Tier 0 - Complete)
All 10 launch-essential tests are implemented:
1. Rice Purity Test (`/test/rice-purity` - legacy URL, no `-test` suffix)
2. Political Compass Test
3. BDSM Test (adult content - check ad policies)
4. Love Language Test
5. Attachment Style Test
6. Big Five Personality Test (OCEAN)
7. Enneagram Test
8. 16 Personality Style Test (avoid "MBTI" trademark)
9. Moral Alignment Test (D&D alignment)
10. Introvert vs Extrovert Test

See `plans/Tier 0 런칭 필수 10개.md` for Tier 1 and Tier 2 test lists.

## Quality Gates (CI Checks)
These should fail deployment:
- Test page contains ad components
- Result sections missing or reordered
- resultBands < 4
- traits < 5 or FAQs < 3 per band
- related tests < 3 or > 5
- Missing canonical or OG tags
- Trailing slash violations

## Reference Documents
- [Test-archive operation rule.md](plans/Test-archive%20operation%20rule.md) - Operating philosophy and rules
- [Test-archive.com 개발 Rule v1.0.md](plans/Test-archive.com%20개발%20Rule%20v1.0.md) - Detailed development rules
- [Tier 0 런칭 필수 10개.md](plans/Tier%200%20런칭%20필수%2010개.md) - Launch-essential test list
- [new-test-workflow.md](src/docs/new-test-workflow.md) - Step-by-step guide for adding new tests
