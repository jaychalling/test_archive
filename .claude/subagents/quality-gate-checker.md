# Quality Gate Checker Subagent

> 테스트 품질 검증. 모든 Gate 통과해야 배포 가능.

## 핵심 원칙

**Gate 실패 시 배포 차단. 예외 없음.** (G6~G8 WARNING 제외)

## Gate 목록

| Gate | 검증 | 실패 시 | 단계 |
|------|------|---------|------|
| **G0** | **테스트 구조 검증** | ERROR | 설계 후 |
| **G0.1** | **3-Step State Machine** | ERROR | 설계 후 |
| **G0.2** | **파일 구조 패턴** | ERROR | 설계 후 |
| G1 | 4버튼 그리드 (Result Page) | ERROR | 생성 후 |
| G2 | 프로그레스 바 + 300ms 트랜지션 | ERROR | 생성 후 |
| G3 | URL 기반 결과 공유 (?res=) | ERROR | 생성 후 |
| G4 | OG 이미지 렌더링 | ERROR | 생성 후 |
| G5 | Sitemap 포함 여부 | ERROR | 배포 전 |
| G6 | Core Web Vitals (LCP < 2.5s) | WARNING | 배포 전 |
| G7 | Lighthouse 90+ | WARNING | 배포 전 |
| G8 | Meta Tags (Title, Description) | WARNING | 배포 전 |

---

## G0: 테스트 구조 검증 (설계 단계)

> **테스트 설계 직후 실행. 컴포넌트 구현 전 필수.**

### 필수 파일 체크

| 파일 | 필수 | 설명 |
|------|------|------|
| `page.tsx` | ★★★ | Metadata + Suspense wrapper |
| `[TestName]ClientPage.tsx` | ★★★ | 3-step state machine |
| `components/Landing.tsx` | ★★★ | 랜딩 페이지 |
| `components/QuizUI.tsx` | ★★★ | 퀴즈 UI |
| `components/Report.tsx` | ★★★ | 결과 페이지 |
| `questions.ts` 또는 `data/` | ★★★ | 질문/답변 데이터 |
| `og/og-template.tsx` | ★★ | OG 이미지 렌더링 |

### 통과/실패 조건

```
✅ 통과 조건:
- 모든 필수 파일 존재
- ClientPage에 3-Step State Machine 구현

❌ 실패 조건:
- 필수 파일 누락 → ERROR
- 3-Step State Machine 미구현 → ERROR
```

### 출력 형식

```
┌─────────────────────────────────────────────────┐
│ G0 TEST STRUCTURE CHECK: {테스트명}              │
├─────────────────────────────────────────────────┤
│ page.tsx:           EXISTS ✅                    │
│ ClientPage.tsx:     EXISTS ✅                    │
│ Landing.tsx:        EXISTS ✅                    │
│ QuizUI.tsx:         EXISTS ✅                    │
│ Report.tsx:         EXISTS ✅                    │
│ questions.ts:       EXISTS ✅                    │
│ og-template.tsx:    EXISTS ✅                    │
├─────────────────────────────────────────────────┤
│ 3-Step State Machine: IMPLEMENTED ✅            │
│   - 'landing' state: FOUND                      │
│   - 'quiz' state: FOUND                         │
│   - 'result' state: FOUND                       │
├─────────────────────────────────────────────────┤
│ RESULT: PASS ✅ - 컴포넌트 구현 진행 가능        │
└─────────────────────────────────────────────────┘
```

---

## G0.1: 3-Step State Machine 검증

### 필수 상태

```typescript
type Step = 'landing' | 'quiz' | 'result';
const [step, setStep] = useState<Step>('landing');
```

### 검증 방법

```typescript
// ClientPage.tsx 내용 검사
const has3Step =
  content.includes("'landing'") &&
  content.includes("'quiz'") &&
  content.includes("'result'") &&
  content.includes("useState");
```

---

## G0.2: 파일 구조 패턴 검증

### 필수 디렉토리 구조

```
frontend/app/[test-id]/
├── page.tsx                    # ★★★ 필수
├── [TestName]ClientPage.tsx    # ★★★ 필수
├── components/                 # ★★★ 필수
│   ├── Landing.tsx
│   ├── QuizUI.tsx
│   └── Report.tsx
├── questions.ts 또는 data/     # ★★★ 필수
└── og/
    └── og-template.tsx         # ★★ 필수
```

---

## G1: 4버튼 그리드 (Result Page)

> **Result 페이지에 반드시 4버튼 그리드 구현.**

### 필수 버튼

| 위치 | 버튼 1 | 버튼 2 |
|------|--------|--------|
| 상단 | Share Test | Share Result |
| 하단 | Retake | Home |

### 검증 방법

```typescript
// Report.tsx 내용 검사
const has4Buttons =
  content.includes("Share Test") &&
  content.includes("Share Result") &&
  content.includes("Retake") &&
  (content.includes("Home") || content.includes("홈"));
```

### 출력 형식

```
┌─────────────────────────────────────────────────┐
│ G1 4-BUTTON GRID CHECK                          │
├─────────────────────────────────────────────────┤
│ Share Test:    FOUND ✅                          │
│ Share Result:  FOUND ✅                          │
│ Retake:        FOUND ✅                          │
│ Home:          FOUND ✅                          │
├─────────────────────────────────────────────────┤
│ RESULT: PASS ✅                                  │
└─────────────────────────────────────────────────┘
```

---

## G2: 프로그레스 바 + 300ms 트랜지션

### 필수 요소

| 요소 | 요구사항 |
|------|----------|
| 프로그레스 바 | QuizUI에 progress 표시 |
| 300ms 트랜지션 | 문항 전환 시 애니메이션 |

### 검증 방법

```typescript
// QuizUI.tsx 내용 검사
const hasProgressBar =
  content.includes("progress") ||
  content.includes("Progress");

const hasTransition =
  content.includes("300") ||
  content.includes("transition") ||
  content.includes("animate");
```

---

## G3: URL 기반 결과 공유 (?res=)

### 필수 기능

| 기능 | 요구사항 |
|------|----------|
| 결과 인코딩 | BASE64 또는 유사 인코딩 |
| URL 파라미터 | `?res=[encoded]` 형식 |
| 결과 복구 | useSearchParams()로 자동 감지 |

### 검증 방법

```typescript
// ClientPage.tsx 내용 검사
const hasResultSharing =
  content.includes("useSearchParams") &&
  (content.includes("res=") || content.includes("'res'"));
```

---

## G4: OG 이미지 렌더링

### 필수 요소

| 요소 | 요구사항 |
|------|----------|
| og-template.tsx | OG 이미지 렌더링 로직 |
| API 라우트 | /api/og?type=[test-id] 처리 |
| 이미지 포맷 | .png 또는 .jpg (webp 금지) |

### 검증 방법

```typescript
// og/og-template.tsx 존재 확인
const hasOgTemplate = fileExists('og/og-template.tsx');

// api/og/route.tsx에 핸들러 등록 확인
const hasApiHandler =
  apiRouteContent.includes(testId);
```

---

## G5: Sitemap 포함 여부

### 필수 요소

| 요소 | 요구사항 |
|------|----------|
| sitemap.ts | 테스트 URL 포함 |

### 검증 방법

```typescript
// frontend/app/sitemap.ts 내용 검사
const inSitemap =
  sitemapContent.includes(testId) ||
  sitemapContent.includes(testUrl);
```

---

## G6~G8: 성능/SEO 검증 (WARNING)

### G6: Core Web Vitals

| 지표 | 목표 | 실패 시 |
|------|------|---------|
| LCP | < 2.5s | WARNING |
| CLS | < 0.1 | WARNING |
| INP | < 200ms | WARNING |

### G7: Lighthouse

| 지표 | 목표 | 실패 시 |
|------|------|---------|
| Performance | 90+ | WARNING |

### G8: Meta Tags

| 요소 | 목표 | 실패 시 |
|------|------|---------|
| Title | 존재 + 키워드 포함 | WARNING |
| Description | 존재 + 150자 이내 | WARNING |
| OG Tags | og:title, og:description, og:image | WARNING |

---

## 사용법

### 전체 검증

```
테스트 품질 검증해줘
rice-purity-test 전체 Gate 검사해줘
```

### 특정 Gate만 검증

```
G0 구조 검증만 해줘
G1~G5 기능 검증해줘
```

---

## FAIL Report 형식

```
⛔ GATE FAIL

[FAIL REPORT]
────────────────────────────────────────
Gate: G1 4버튼 그리드
Scope: Result page
Files:
  - frontend/app/rice-purity-test/components/Report.tsx
Reason:
  - "Retake" 버튼 누락
Violated Rule:
  - CLAUDE.md Core Rules - Result Page
Allowed Fix Types:
  - 4버튼 그리드 컴포넌트 추가
  - Report.tsx 재생성
Suggested Subagent:
  - test-revamp-specialist
────────────────────────────────────────

🔴 QA 역할 완료. PM 결정 대기.

PM 결정 필요:
1. Allowed Fix Types 중 선택
2. Subagent 재호출 또는 수동 수정
3. 재검증 요청
```

---

## 스펙 참조

- [quality-gate-spec.md](../specs/quality-gate-spec.md)
- [CLAUDE.md Core Rules](../../CLAUDE.md)
