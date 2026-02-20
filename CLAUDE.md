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

# E2E Testing (Playwright)
npx playwright test                              # Run all E2E tests
npx playwright test e2e/big-five-test.spec.ts   # Run single test file
npx playwright test --ui                         # Run with UI mode
npx playwright test --reporter=list              # Run with list reporter
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
│   ├── About.tsx, Contact.tsx         # Static pages
│   ├── Privacy.tsx, Terms.tsx         # Legal pages
│   ├── NotFound.tsx
│   └── test/
│       └── [test-name]-test/
│           ├── index.tsx              # Questions page
│           └── result.tsx             # Results page
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
e2e/
└── [test-name]-test.spec.ts           # Playwright E2E tests
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
- Include disclaimer: "For entertainment purposes only." (in page body only, NOT in meta tags)

## SEO Meta Tags (CTR-Optimized)

test-archive's SERP strategy focuses on **identity / emotion / anxiety / curiosity** — NOT speed or utility.
Meta tags must trigger emotional engagement, not provide factual descriptions.

### Title Formula
```
[Provocative identity question] + (hidden truth / twist / result preview)
```

**Examples:**
- ✅ "How Innocent Are You Really? Rice Purity Test (100 Questions)"
- ✅ "What Personality Type Are You Really? 16 Types Test"
- ✅ "Your Self-Esteem Might Be Lower Than You Think"
- ❌ "Original Rice Purity Test - 100 Questions" (too descriptive)
- ❌ "Discover Your Personality Type" (generic)

### Description Formula
```
[Surprise/tension first sentence] + [What people find most surprising] + (time/question count)
```

**Examples:**
- ✅ "Most people score lower than they expect. Answer 100 questions and see what your purity score actually reveals."
- ✅ "Many people mistype themselves. Find your true personality across four key dimensions."
- ❌ "Take the Rice Purity Test with 100 questions. For entertainment purposes only." (boring + disclaimer)

### 4 Mandatory Rules

| Rule | ❌ Forbidden | ✅ Required |
|------|-------------|-------------|
| 1. No generic verbs | "Discover", "Measure", "Take", "Find out" | "Are you really...", "What your... reveals", "You might be..." |
| 2. Must include You/Your | "The Big Five Test measures..." | "What Your Personality Is Really Like" |
| 3. First description sentence = tension | "This test has 50 questions." | "Most people are surprised by their results." |
| 4. No disclaimer in meta | "For entertainment purposes only" | Move disclaimer to page body |

### Result Page Meta Tags
Result pages should also follow CTR principles:
- Title: "Your [Result Type] — [Reveal/Insight Hook]"
- Description: "Your results are in. See [specific insight]..."

**Examples:**
- ✅ Title: "Your Rice Purity Score — See What It Actually Means"
- ✅ Description: "Your Rice Purity score is in. See how you compare to others and what your number really says about you."

### Adding New Test SEO Config
When adding a new test, add config to `src/data/testSeoConfig.ts`:
```typescript
'new-test': {
  slug: 'new-test',
  title: '[Provocative Question]? [Test Name]',  // Must include You/Your
  resultTitle: 'Your [Result] — [Insight Hook]',
  description: '[Tension/surprise sentence]. [What test reveals].',  // NO disclaimer
  resultDescription: 'Your [result type] is in. [Specific insight about their results].',
  path: '/test/new-test/',
}
```

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
2. Create question page in `src/pages/test/{test-name}-test/index.tsx` (kebab-case)
3. Create result page in `src/pages/test/{test-name}-test/result.tsx`
4. Add **both routes** in `src/App.tsx`:
   ```tsx
   import TestName from "./pages/test/{test-name}-test";
   import TestNameResult from "./pages/test/{test-name}-test/result";

   // In Routes:
   <Route path="/test/{test-name}-test" element={<TestName />} />
   <Route path="/test/{test-name}-test/result/" element={<TestNameResult />} />
   ```
5. Add TestCard to Index.tsx grid
6. Add SEO config to `src/data/testSeoConfig.ts`

Key conventions:
- Data files use camelCase: `bigFiveQuestions.ts`, `loveLanguageQuestions.ts`
- Page directories use kebab-case with `-test` suffix: `big-five-test/`, `love-language-test/`
- URL paths match page directories: `/test/big-five-test`, `/test/love-language-test`
- **Always create both index.tsx (questions) and result.tsx (results)** - never combine them

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

## Test/Result Page Separation Pattern

Starting from recent refactoring, tests follow a strict separation pattern for better code organization and maintainability.

### Question Page (index.tsx)
- **Location**: `src/pages/test/{test-name}-test/index.tsx`
- **Responsibilities**:
  - Render questions and progress bar
  - Handle user answers (useState)
  - Save answers to localStorage on completion
  - Navigate to result page using React Router
- **Must NOT contain**: Result rendering, scoring logic, share functions

### Result Page (result.tsx)
- **Location**: `src/pages/test/{test-name}-test/result.tsx`
- **Responsibilities**:
  - Read answers from localStorage
  - Calculate scores/results
  - Render all result sections (following Result Page Rules order)
  - Handle sharing functionality
  - Display ads (after Related Tests section only)
- **Must NOT contain**: Question rendering logic

### Implementation Checklist
When splitting or creating new tests:
1. ✅ Import `useNavigate` from react-router-dom in index.tsx
2. ✅ Save answers to localStorage before navigation:
   ```tsx
   const handleSubmit = () => {
     localStorage.setItem('{testName}Answers', JSON.stringify(answers));
     navigate('/test/{test-slug}/result/');
   };
   ```
3. ✅ Create dedicated result.tsx file
4. ✅ Add both routes in App.tsx:
   ```tsx
   <Route path="/test/{slug}" element={<TestPage />} />
   <Route path="/test/{slug}/result/" element={<ResultPage />} />
   ```
5. ✅ Use consistent localStorage key: `{testName}Answers` (camelCase)
6. ✅ Remove `showResults` state and result rendering from index.tsx
7. ✅ Remove `handleReset` and `handleShare` functions from index.tsx

### localStorage Key Convention
| Test | localStorage Key |
|------|-----------------|
| Emotional Intelligence | `eqTestAnswers` |
| Rice Purity | `ricePurityAnswers` |
| Big Five | `bigFiveAnswers` |
| 16 Personality | `personalityTypeAnswers` |
| Attachment Style | `attachmentStyleAnswers` |
| Love Language | `loveLanguageAnswers` |
| Enneagram | `enneagramAnswers` |
| BDSM | `bdsmAnswers` |
| Political Compass | `politicalCompassAnswers` |
| Moral Alignment | `moralAlignmentAnswers` |
| Introvert/Extrovert | `introvertExtrovertAnswers` |
| Love Compatibility | `loveCompatibilityAnswers` |
| Self-Esteem | `selfEsteemAnswers` |
| Anxiety/Calm | `anxietyCalmAnswers` |
| Career Aptitude | `careerAptitudeAnswers` |
| Communication Style | `communicationStyleAnswers` |

**Pattern**: `{testName}Answers` (camelCase), except special cases like `eqTestAnswers`

### Reading from localStorage in Result Page
```tsx
// In result.tsx
const [answers, setAnswers] = useState<Record<number, number>>({});

useEffect(() => {
  const savedAnswers = localStorage.getItem('{testName}Answers');
  if (savedAnswers) {
    setAnswers(JSON.parse(savedAnswers));
  } else {
    // Redirect to test page if no answers found
    navigate('/test/{test-slug}/');
  }
}, [navigate]);
```

## Implemented Tests (19 Tests - All Tier 0 Complete + 9 Additional Tests)

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
| Mental Age Test | `/test/mental-age-test` | `mentalAgeQuestions.ts` | 30 | - |
| Dark Triad Test | `/test/dark-triad-test` | `darkTriadQuestions.ts` | 27 | - |
| Toxic Trait Test | `/test/toxic-trait-test` | `toxicTraitQuestions.ts` | 30 | - |

⚠️ Rice Purity Test uses legacy URL without `-test` suffix (distributed links exist)
⚠️ Anxiety vs Calm Test: Uses ONLY softening language, NOT medical diagnosis. Entertainment only.

See `plans/Tier 0 런칭 필수 10개.md` for Tier 1 and Tier 2 test lists.

## E2E Testing (Playwright)

### Test Structure
Each E2E test file covers 3 scenarios:
1. **Full workflow**: Start → Answer all questions → View Results → Verify result page elements
2. **localStorage persistence**: Verify answers are saved correctly
3. **Navigation**: Previous/Next button functionality

### Test Patterns
```typescript
// Use extended timeout for tests with many questions
test.setTimeout(120000);  // 120s for 30-60 questions
test.setTimeout(180000);  // 180s for 100 questions (Rice Purity)

// Use force:true to bypass transition animations
await option.click({ force: true });

// Use .first() to avoid strict mode violations
await expect(page.getByRole('heading', { name: /Openness/ }).first()).toBeVisible();

// Wait for transitions between questions
await page.waitForTimeout(200);

// Different progress formats - check actual UI before writing test
await expect(page.locator('text=1/50')).toBeVisible();           // "X/Y" format
await expect(page.locator('text=Question 1 /')).toBeVisible();   // "Question X / Y" format
await expect(page.locator('text=/1\\/100/i')).toBeVisible();     // Regex for "X/100"

// Different answer button formats
page.locator('button').filter({ hasText: /^3$/ });      // Likert number
page.locator('button').filter({ hasText: 'Neutral' });  // Text option
page.getByRole('button', { name: 'No' });               // Yes/No
```

### Implemented E2E Tests
| Test | File | Questions | Format |
|------|------|-----------|--------|
| Self-Esteem | `self-esteem-test.spec.ts` | 25 | Likert 1-5 |
| Anxiety-Calm | `anxiety-calm-test.spec.ts` | 30 | Likert 1-5 |
| Introvert-Extrovert | `introvert-extrovert-test.spec.ts` | 20 | Likert 1-5 |
| Love Language | `love-language-test.spec.ts` | 30 | A/B choice |
| Big Five | `big-five-test.spec.ts` | 50 | Likert 1-5 |
| 16 Personality | `16-personality-test.spec.ts` | 60 | A/B choice |
| Enneagram | `enneagram-test.spec.ts` | 36 | Likert 1-5 |
| Attachment Style | `attachment-style-test.spec.ts` | 30 | Likert 1-5 |
| Love Compatibility | `love-compatibility-test.spec.ts` | 30 | Likert 1-5 |
| Emotional Intelligence | `emotional-intelligence-test.spec.ts` | 25 | Text options |
| Rice Purity | `rice-purity-test.spec.ts` | 100 | Yes/No |
| Political Compass | `political-compass-test.spec.ts` | 22 | Likert 1-5 |

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

#### 5. Combining Test and Result in One File
**Problem**: Putting questions and results in the same component file
```tsx
// ❌ BAD: Single file with both test and result
const TestPage = () => {
  const [showResults, setShowResults] = useState(false);

  if (showResults) {
    return <div>Results...</div>;  // Don't do this!
  }
  return <div>Questions...</div>;
}

// ✅ GOOD: Separate files
// index.tsx - Questions only
const TestPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.setItem('testAnswers', JSON.stringify(answers));
    navigate('/test/test-name/result/');
  };
  return <div>Questions...</div>;
}

// result.tsx - Results only
const ResultPage = () => {
  // Read from localStorage and calculate results
  return <div>Results...</div>;
}
```
- **Why**: Better code organization, SEO (separate URLs), cleaner responsibility separation
- **Always**: Create both index.tsx and result.tsx when adding new tests

### Code Review Self-Checklist
Before committing:
- [ ] All content is in ENGLISH (no Korean in user-facing text)
- [ ] Follows existing file naming conventions (camelCase data, kebab-case pages)
- [ ] Copied patterns from existing tests (state management, UI structure)
- [ ] Start button works (uses dedicated state, not re-using existing state)
- [ ] No duplicate navigation elements
- [ ] Build passes without errors
- [ ] E-E-A-T requirements met (if creating test content)
- [ ] SEO: canonical URLs use `www.test-archive.com` (not bare domain)
- [ ] SEO: Result pages include both BreadcrumbList + FAQPage JSON-LD schemas
- [ ] SEO: New test added to `sitemap.xml` with `<lastmod>`
- [ ] Temporary work files (*.txt, *_SUMMARY.md) removed before commit

### Temporary Files Policy
- **Allowed during development**: Work-in-progress files like `modify_tests.txt`, `SPLIT_TESTS_SUMMARY.md`
- **Must remove before commit**: All temporary files should be deleted or added to .gitignore
- **Exception**: Planning documents in `plans/` directory are permanent reference materials

## SEO Technical Infrastructure

### Domain & Canonical
- **Canonical domain**: `https://www.test-archive.com` (with www)
- **SEOHead BASE_URL**: `https://www.test-archive.com` in `src/components/SEOHead.tsx`
- **CRITICAL**: All canonical URLs, sitemap, robots.txt, OG tags MUST use `www.test-archive.com`
- Non-www (`test-archive.com`) should 301 redirect to www (configured at hosting/CDN level)

### Structured Data (JSON-LD)
All pages use `SEOHead` component with JSON-LD support:
- **Index page**: `WebSite` schema
- **Test pages** (index.tsx): `BreadcrumbList` schema
- **Result pages** (result.tsx): `BreadcrumbList` + `FAQPage` schemas (combined via array)
- SEOHead supports both single object and `object[]` for `jsonLd` prop

```tsx
// Single schema
<SEOHead jsonLd={breadcrumbSchema} />

// Multiple schemas (result pages)
<SEOHead jsonLd={[breadcrumbSchema, faqSchema]} />
```

### Helper Functions in SEOHead
- `createBreadcrumbSchema(items)` — Breadcrumb navigation
- `createFAQSchema(faqs)` — FAQ rich results (requires `{ question, answer }[]`)
- `createWebSiteSchema()` — Site-level schema
- `createMultipleSchemas(...schemas)` — Combine schemas

### Sitemap & Robots
- **Sitemap**: `public/sitemap.xml` — 43 URLs (19 test + 19 result + 5 static pages)
- **Robots.txt**: `public/robots.txt` — References `https://www.test-archive.com/sitemap.xml`
- Sitemap includes `<lastmod>` dates — update when content changes

### GSC (Google Search Console)
- **Property**: `https://www.test-archive.com/`
- **Service account**: `test-66@gen-lang-client-0698230269.iam.gserviceaccount.com`
- **Key file**: `E:\2026\Projects\GSC\gen-lang-client-0698230269-f4b11b3bb976.json`
- **API scopes**: `webmasters.readonly` (read), `webmasters` (submit sitemap)
- **Package**: `googleapis` (devDependency)

### Deployment
- **Platform**: Vercel (Git 연동 자동 배포)
- **Trigger**: `git push origin main` → 자동 빌드 및 배포
- **After deploy**: GSC에서 sitemap 재제출 권장 (변경 사항이 클 때)

## SEO Changelog

### 2026-02-21: GSC 기반 SEO 대규모 개선
- **www 도메인 일치**: SEOHead BASE_URL, sitemap.xml, robots.txt 모두 `www.test-archive.com`으로 통일 (이전: `test-archive.com` no-www)
- **Index 페이지 CTR 최적화**: title/description에서 "For entertainment only" 제거, 감정적 훅 추가
- **FAQ Schema 추가**: 16개 결과 페이지 전체에 `FAQPage` JSON-LD 추가 (Google 리치 결과 대상)
- **SEOHead 다중 스키마**: `jsonLd` prop이 `object[]` 배열도 지원
- **Sitemap lastmod**: 모든 URL에 `<lastmod>` 날짜 추가
- **Rice Purity 결과 페이지**: CTR 최적화 타이틀 + canonical URL 수정

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
