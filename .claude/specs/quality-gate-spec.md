# Quality Gate Specification

> 테스트 품질 검증 게이트 상세 스펙.

## Gate 목록

| Gate | 검증 | 실패 시 | 단계 | 자동화 |
|------|------|---------|------|--------|
| **G0** | 테스트 구조 검증 | ERROR | 설계 후 | O |
| **G0.1** | 3-Step State Machine | ERROR | 설계 후 | O |
| **G0.2** | 파일 구조 패턴 | ERROR | 설계 후 | O |
| G1 | 4버튼 그리드 | ERROR | 생성 후 | O |
| G2 | 프로그레스 바 + 300ms | ERROR | 생성 후 | O |
| G3 | URL 결과 공유 | ERROR | 생성 후 | O |
| G4 | OG 이미지 렌더링 | ERROR | 생성 후 | △ |
| G5 | Sitemap 포함 | ERROR | 배포 전 | O |
| G6 | Core Web Vitals | WARNING | 배포 전 | △ |
| G7 | Lighthouse 90+ | WARNING | 배포 전 | △ |
| G8 | Meta Tags | WARNING | 배포 전 | O |

---

## G0: 테스트 구조 검증

### 목적
테스트 설계 단계에서 필수 파일 구조와 3-Step State Machine 구현 여부를 검증합니다.

### 필수 파일

```
frontend/app/[test-id]/
├── page.tsx                    # ★★★ 필수
├── [TestName]ClientPage.tsx    # ★★★ 필수
├── components/
│   ├── Landing.tsx             # ★★★ 필수
│   ├── QuizUI.tsx              # ★★★ 필수
│   └── Report.tsx              # ★★★ 필수
├── questions.ts 또는 data/     # ★★★ 필수
└── og/og-template.tsx          # ★★ 필수
```

### G0.1: 3-Step State Machine

```typescript
// 필수 구현 패턴
type Step = 'landing' | 'quiz' | 'result';
const [step, setStep] = useState<Step>('landing');
```

**검증 방법**:
- ClientPage.tsx에 `'landing'`, `'quiz'`, `'result'` 문자열 존재
- `useState` 훅 사용

### G0.2: 파일 구조 패턴

**검증 방법**:
- 필수 파일 존재 여부 확인
- 디렉토리 구조 검증

---

## G1: 4버튼 그리드

### 목적
Result 페이지에 표준 4버튼 그리드가 구현되었는지 검증합니다.

### 필수 버튼

| 위치 | 버튼 1 | 버튼 2 |
|------|--------|--------|
| 상단 | Share Test | Share Result |
| 하단 | Retake | Home |

### 검증 방법

```typescript
const has4Buttons =
  content.includes("Share Test") &&
  content.includes("Share Result") &&
  content.includes("Retake") &&
  (content.includes("Home") || content.includes("홈"));
```

---

## G2: 프로그레스 바 + 300ms 트랜지션

### 목적
QuizUI에 프로그레스 바와 문항 전환 애니메이션이 구현되었는지 검증합니다.

### 필수 요소

| 요소 | 구현 방법 |
|------|----------|
| 프로그레스 바 | progress 상태 + width 스타일링 |
| 300ms 트랜지션 | transition-all duration-300 또는 Framer Motion |

### 검증 방법

```typescript
const hasProgressBar =
  content.includes("progress") || content.includes("Progress");

const hasTransition =
  content.includes("duration-300") ||
  content.includes("300") ||
  content.includes("transition");
```

---

## G3: URL 기반 결과 공유

### 목적
`?res=[BASE64]` 파라미터로 결과를 복구할 수 있는지 검증합니다.

### 필수 구현

```typescript
// useSearchParams로 파라미터 읽기
const searchParams = useSearchParams();
const res = searchParams.get('res');

// 결과 인코딩/디코딩
const encoded = btoa(JSON.stringify(result));
const decoded = JSON.parse(atob(encoded));
```

### 검증 방법

```typescript
const hasResultSharing =
  content.includes("useSearchParams") &&
  (content.includes("res=") || content.includes("'res'"));
```

---

## G4: OG 이미지 렌더링

### 목적
OG 이미지가 정상적으로 생성되는지 검증합니다.

### 필수 요소

| 요소 | 요구사항 |
|------|----------|
| 파일 | og/og-template.tsx 존재 |
| API | /api/og?type=[test-id] 핸들러 등록 |
| 크기 | 1200x630 |
| 포맷 | .png 또는 .jpg (webp 금지) |

### 검증 방법

수동 확인 필요:
- 브라우저에서 `/api/og?type=[test-id]` 접속
- 이미지 정상 렌더링 확인

---

## G5: Sitemap 포함

### 목적
새 테스트가 sitemap.ts에 포함되었는지 검증합니다.

### 검증 방법

```typescript
// frontend/app/sitemap.ts 내용 검사
const inSitemap = sitemapContent.includes(testId);
```

---

## G6~G8: 성능/SEO 검증 (WARNING)

### G6: Core Web Vitals

| 지표 | 목표 | 측정 |
|------|------|------|
| LCP | < 2.5s | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| INP | < 200ms | Lighthouse |

### G7: Lighthouse

| 지표 | 목표 |
|------|------|
| Performance | 90+ |

### G8: Meta Tags

| 요소 | 요구사항 |
|------|----------|
| Title | 존재 + 60자 이내 |
| Description | 존재 + 150자 이내 |
| OG Tags | og:title, og:description, og:image |

---

## FAIL 처리 프로세스

### ERROR (G0~G5)

```
1. QA: FAIL 감지 + 원인 분석
2. QA: FAIL Report 생성
   - Gate ID
   - 실패 파일
   - 실패 원인
   - Allowed Fix Types
   - Suggested Subagent
3. PM: 개선 방향 결정
4. 재작업 또는 수동 수정
5. 재검증
```

### WARNING (G6~G8)

```
1. QA: WARNING 감지
2. QA: WARNING Report 생성
3. 배포 진행 (차단 안 함)
4. PM: 선택적 개선
```

---

## 자동화 수준

| 자동화 | Gate |
|--------|------|
| 완전 자동 | G0, G0.1, G0.2, G1, G2, G3, G5, G8 |
| 반자동 | G4 (API 호출 확인), G6, G7 (Lighthouse 실행) |
| 수동 | - |
