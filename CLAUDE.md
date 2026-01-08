# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Test-archive.com** is an entertainment quiz/test portal designed as a traffic-generating UX product. The core business flow is: Completion Rate → Result Page Dwell Time → Internal Circulation (Pages/Session) → Ad Revenue (RPM).

**IMPORTANT - Language Policy:**
- **Conversation with developer**: Korean (한국어로 대화)
- **All test content (questions, results, UI text)**: ENGLISH ONLY
- Never mix languages - keep developer communication and user-facing content strictly separated

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
- Test page naming: `src/pages/test/{slug}-test/index.tsx` (exception: rice-purity which has no `-test` suffix)
- Data file naming: `src/data/{testName}Questions.ts` (camelCase)
- SEO: Use `react-helmet-async` for meta tags (see `SEOHead` component)
- Icons: Lucide React library is available
- State: Local state with `useState` for test answers; TanStack Query available if needed

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

**IMPORTANT**: Follow the detailed workflow in `src/docs/new-test-workflow.md` for E-E-A-T compliant tests.

Quick steps:
1. Create question data in `src/data/{testName}Questions.ts` (camelCase)
2. Create page component in `src/pages/test/{test-name}-test/index.tsx` (kebab-case)
3. Add route in `src/App.tsx`
4. Add TestCard to Index.tsx grid
5. Add SEO config to `src/data/testSeoConfig.ts`

Key conventions:
- Data files use camelCase: `bigFiveQuestions.ts`, `loveLanguageQuestions.ts`
- Page directories use kebab-case with `-test` suffix: `big-five-test/`, `love-language-test/`
- URL paths match page directories: `/test/big-five-test`, `/test/love-language-test`

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

## Implemented Tests (16 Tests - All Tier 0 Complete + 6 High-Traffic Tests)

### Tier 0 - Launch Essential (10 tests) ✅
| Test Name | URL Path | Data File |
|-----------|----------|-----------|
| Rice Purity Test | `/test/rice-purity` ⚠️ | `ricePurityQuestions.ts` |
| Political Compass Test | `/test/political-compass-test` | `politicalCompassQuestions.ts` |
| BDSM Test | `/test/bdsm-test` | `bdsmTestQuestions.ts` |
| Love Language Test | `/test/love-language-test` | `loveLanguageQuestions.ts` |
| Attachment Style Test | `/test/attachment-style-test` | `attachmentStyleQuestions.ts` |
| Big Five Test | `/test/big-five-test` | `bigFiveQuestions.ts` |
| Enneagram Test | `/test/enneagram-test` | `enneagramQuestions.ts` |
| 16 Personality Test | `/test/16-personality-test` | `personalityTypeQuestions.ts` |
| Moral Alignment Test | `/test/moral-alignment-test` | `moralAlignmentQuestions.ts` |
| Introvert/Extrovert Test | `/test/introvert-extrovert-test` | `introvertExtrovertQuestions.ts` |

### Additional Tests (High Search Volume - Data-Driven Selection)
| Test Name | URL Path | Data File | Questions | Monthly Searches |
|-----------|----------|-----------|-----------|------------------|
| **Love Compatibility Test** | `/test/love-compatibility-test` | `loveCompatibilityQuestions.ts` | 30 (5 categories) | **527,720** ⭐ |
| **Anxiety vs Calm Test** | `/test/anxiety-calm-test` | `anxietyCalmQuestions.ts` | 30 (tendency scale) | **169,390** ⚠️ |
| **Self-Esteem Test** | `/test/self-esteem-test` | `selfEsteemQuestions.ts` | 25 (Rosenberg Scale) | **13,910** |
| Emotional Intelligence Test | `/test/emotional-intelligence-test` | `emotionalIntelligenceQuestions.ts` | 25 (5 categories) | - |
| Career Aptitude Test | `/test/career-aptitude-test` | `careerAptitudeQuestions.ts` | 30 (Holland RIASEC) | - |
| Communication Style Test | `/test/communication-style-test` | `communicationStyleQuestions.ts` | 28 (4 styles) | 5,240 |

⚠️ Rice Purity Test uses legacy URL without `-test` suffix (distributed links exist)
⚠️ Anxiety vs Calm Test: Uses ONLY softening language, NOT medical diagnosis. Entertainment only.

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

## Development Workflow & Best Practices

### Pre-Work Checklist (MANDATORY)
Before starting ANY task, verify:
1. ✅ **Language**: Is this user-facing content? → Must be ENGLISH
2. ✅ **Existing patterns**: Check similar files first (e.g., look at existing tests before creating a new one)
3. ✅ **Requirements**: List all requirements explicitly before coding
4. ✅ **State management**: Does the component need proper state initialization? (common React pitfall)

### Tool Selection Guidelines
- **Direct Edit**: Use for simple, repetitive tasks (translations, bulk edits across files)
- **Subagents**: Use ONLY for complex multi-step tasks requiring decision-making
- **Never**: Use subagents for simple find-replace or translation tasks (too slow)

### Common Pitfalls & Solutions

#### 1. Start Button Not Working
**Problem**: Using existing state as landing condition breaks re-initialization
```tsx
// ❌ BAD: setCurrentQuestion(0) won't trigger re-render if already 0
{currentQuestion === 0 && answeredCount === 0 && (
  <Button onClick={() => setCurrentQuestion(0)}>Start</Button>
)}

// ✅ GOOD: Use dedicated state variable
const [testStarted, setTestStarted] = useState(false);
{!testStarted && (
  <Button onClick={() => setTestStarted(true)}>Start Test</Button>
)}
```

#### 2. Language Confusion
**Problem**: Creating content in Korean when it should be English
- **Check**: "Claude should communicate in Korean" means CONVERSATION, not CONTENT
- **Always**: Read CLAUDE.md's Language Policy section before creating test content
- **Verify**: All questions, UI text, results = ENGLISH

#### 3. Duplicate Navigation
**Problem**: Adding "Back to Tests" links when Header already has navigation
- **Check**: Does Header.tsx already have this navigation?
- **Rule**: Minimize distracting navigation on test pages (business rule)
- **Always**: Review existing test pages before adding new navigation elements

#### 4. Not Following Existing Patterns
**Problem**: Reinventing the wheel instead of copying proven patterns
- **Always**: Look at 2-3 existing test files before creating a new one
- **Copy**: Structure, state management, styling patterns
- **Maintain**: Consistency across all tests (user experience)

### Code Review Self-Checklist
Before committing:
- [ ] All content is in ENGLISH (no Korean in user-facing text)
- [ ] Follows existing file naming conventions (camelCase data, kebab-case pages)
- [ ] Copied patterns from existing tests (state management, UI structure)
- [ ] Start button works (uses dedicated state, not re-using existing state)
- [ ] No duplicate navigation elements
- [ ] Build passes without errors
- [ ] E-E-A-T requirements met (if creating test content)

## Reference Documents
- [Test-archive operation rule.md](plans/Test-archive%20operation%20rule.md) - Operating philosophy and rules
- [Test-archive.com 개발 Rule v1.0.md](plans/Test-archive.com%20개발%20Rule%20v1.0.md) - Detailed development rules
- [Tier 0 런칭 필수 10개.md](plans/Tier%200%20런칭%20필수%2010개.md) - Launch-essential test list
- [new-test-workflow.md](src/docs/new-test-workflow.md) - Step-by-step guide for adding new tests

## Statistical Data for Result Pages (Data Integrity Reference)

When creating or updating result pages, use these research-backed statistics for percentile calculations, averages, and distribution displays. Sources include academic research, surveys, and established testing organizations.

### Rice Purity Test
- **Global Average**: 63.98 (alternative source: 61.46)
- **Age Distribution**:
  - Under 25: 85-91
  - High school students: 90+
  - College students/young adults: 70-80
- **Gender (US)**: Male avg 56.1, Female avg 59.9
- **Score Ranges**: 0-30 (Very Experienced), 31-44 (Experienced), 45-76 (Above Average), 77-93 (Average), 94-100 (Pure)

### Big Five Personality Test (OCEAN)
- **Average**: 50% is perfectly average on each trait
- **Distribution**: Most people have 1-2 high traits, 1-2 low traits, rest near 50%
- **Reliability coefficient**: 0.88
- **Score interpretation**: Uses percentile (50th = average)

### 16 Personality Types (MBTI-style)
| Type | % Population | Notes |
|------|-------------|-------|
| ISFJ | 13.8% | Most common |
| ESFJ | 12.0% | |
| ISTJ | 11.6% | |
| ISFP | 8.8% | |
| ENFP | 8.1% | Most common N type |
| ESFP | 8.5% | |
| INFP | 4.4% | |
| INFJ | 1.5% | Rarest |
| INTJ | 2.1% | |
| ENTJ | 1.8% | |

### Attachment Style
| Style | % Population |
|-------|-------------|
| Secure | 50-65% |
| Avoidant (Dismissive) | 15-25% |
| Anxious (Preoccupied) | 5-20% |
| Fearful-Avoidant | 5-24% |

### Enneagram
| Type | Name | % Population |
|------|------|-------------|
| 9 | Peacemaker | 16.2% (most common) |
| 6 | Loyalist | 16.1% |
| 1 | Reformer | 16.3% |
| 2 | Helper | 8.5% |
| 3 | Achiever | ~10% |
| 4 | Individualist | ~10% |
| 7 | Enthusiast | 9% |
| 8 | Challenger | 6.3% |
| 5 | Investigator | 4.8% (rarest) |

### Love Language
| Language | % Population |
|----------|-------------|
| Quality Time | 38-40% (most common) |
| Physical Touch | 24% |
| Words of Affirmation | 19% |
| Acts of Service | 16% |
| Receiving Gifts | 10% (least common) |

### Introvert/Extrovert
| Type | % Population |
|------|-------------|
| Ambivert | 68-77% (majority) |
| Extrovert | 12-16% |
| Introvert | 5-16% |

### Emotional Intelligence (EQ)
- **Average Score**: 75/100 (on Emotional Intelligence Appraisal)
- **Standard Score**: Mean 100, SD 15
- **Average Range**: 85-115
- **High EQ**: Only 36% of population
- **Top performers**: 90% have high EQ

### Holland RIASEC (Career Aptitude)
- No definitive population distribution available
- **Gender patterns**: Men score higher on Realistic (R), Women higher on Social (S) and Artistic (A)
- Use balanced distribution for ScoreDistributionChart

### Political Compass
- No standardized population data
- Create bell curve centered slightly left-libertarian (based on online test-taker trends)

### BDSM Test
- No academic population data
- Create balanced distribution across categories

### Moral Alignment (D&D style)
- No population data (fictional framework)
- Create equal distribution across 9 alignments

### Communication Style
- No standardized population data
- Estimate: Assertive 25%, Passive 30%, Aggressive 15%, Passive-Aggressive 30%

### Usage in Code
When implementing `ScoreDistributionChart` or percentile calculations:
1. Use test-specific mean/SD where available
2. For tests without data, use default mean=50%, SD=15%
3. Always include disclaimer: "Based on estimated population data"
4. Celebrity comparisons should use plausible scores within normal ranges
