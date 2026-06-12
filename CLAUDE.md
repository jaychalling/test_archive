# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Test-archive.com** -- entertainment quiz/test portal. Core flow: Completion Rate -> Result Page Dwell Time -> Internal Circulation -> Ad Revenue (RPM).

**Language Policy:**
- **Developer conversation**: Korean (한국어)
- **All test content (questions, results, UI)**: ENGLISH ONLY

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server (localhost:8080)
npm run build        # Production build
npm run lint         # ESLint

# E2E Testing
npx playwright test                              # All tests
npx playwright test e2e/big-five-test.spec.ts   # Single file
npx playwright test --ui                         # UI mode
```

## Architecture

- **Stack**: React 18 + TypeScript + Vite (SWC), shadcn/ui + Tailwind, React Router DOM, TanStack Query
- **Path alias**: `@/` maps to `src/`
- **Canonical domain**: `https://www.test-archive.com` (with www)
- **Deploy**: Vercel (git push -> auto deploy)

### Directory Structure
```
src/
├── pages/test/[test-name]-test/   # index.tsx (questions) + result.tsx (results)
├── components/ui/                  # shadcn/ui (do not modify)
├── data/{testName}Questions.ts     # Questions + result bands (camelCase)
├── templates/                      # E-E-A-T data + result UI templates
├── docs/new-test-workflow.md       # Step-by-step creation guide
└── lib/utils.ts                    # cn() helper
e2e/                                # Playwright E2E tests
```

## URL Structure

```
/                     -> Hub (test directory)
/tests/               -> Test listing
/test/{slug}/         -> Test page (questions)
/test/{slug}/result/  -> Result page (revenue)
```
- Trailing slashes required on all URLs
- No query strings for results (use localStorage)
- Legacy: `/test/rice-purity` (no `-test` suffix, distributed links exist)

## Business Rules (Critical)

### Test Pages (Completion Rate = KPI)
- **NO ads, popups, or external links on test pages**
- Progress bar required
- 100+ questions: implement session save/auto-save

### Result Pages (Revenue Core)
Must follow this exact section order:
1. Hero Result  2. Range/Percentile  3. "What This Typically Means"
4. Common Traits (5-8 bullets)  5. FAQ (3-6 items)  6. Share Block
7. Related Tests (3-5 links)  8. Ads (after Related Tests only)

### Content Guidelines
- Softening language: "typically", "often", "tend to" (avoid definitive statements)
- Prohibited: medical diagnosis, legal advice, political advocacy
- Disclaimer "For entertainment purposes only" -- in page body only, NOT in meta tags

## Key Patterns

- **File naming**: Data = camelCase (`bigFiveQuestions.ts`), Pages = kebab-case + `-test` (`big-five-test/`)
- **Separation**: Questions in `index.tsx`, Results in `result.tsx` -- never combine
- **localStorage**: Key pattern `{testName}Answers` (camelCase)
- **SEO**: Use `SEOHead` component + `react-helmet-async`, config in `src/data/testSeoConfig.ts`
- **Icons**: Lucide React
- **State**: `useState` for test answers, TanStack Query available

## Skills (detailed guides -- `.claude/skills/`)

| Skill | When to use |
|-------|-------------|
| `test-result-separation` | Creating/refactoring test pages, localStorage conventions |
| `seo-meta-tags` | Writing CTR-optimized titles/descriptions for tests |
| `e2e-testing` | Writing Playwright tests, timeout strategies |
| `statistical-data` | Result page percentiles, population distributions |
| `new-test-workflow` | Adding a new test end-to-end, JSON schema |
| `common-pitfalls` | Start button bugs, language confusion, code review checklist |
| `seo-infrastructure` | JSON-LD schemas, sitemap, GSC, domain config |

## Reference Documents

- **[STRATEGY-2026-06.md](plans/STRATEGY-2026-06.md) - 현행 전략·백로그·제작 게이트·KPI (단일 기준 문서)**
- [Test-archive operation rule.md](plans/Test-archive%20operation%20rule.md) - Operating philosophy
- [new-test-workflow.md](src/docs/new-test-workflow.md) - Detailed test creation guide
- Superseded (참고용): `plans/archive/` — 구 사업계획서, Tier 런칭 리스트 (2026-06-12 폐기. 신규 제작은 반드시 STRATEGY 문서의 게이트를 통과해야 함)
