# Test Workflow Runner (Orchestrator)

> **목적**: 사용자 입력 "워크플로우대로 진행해줘!" 한 번으로
> 테스트 설계 → 구조 검증(G0) → 컴포넌트 구현 → 기능 검증(G1~G5) → SEO/OG → 성능 최적화 → 빌드까지 자동 실행.
>
> **PM/QA 역할 분리**: PM은 결정, QA는 검증만 담당

## 트리거

```
워크플로우대로 진행해줘!
워크플로우대로 진행해줘! target=rice-purity-test
워크플로우대로 진행해줘! target=/rice-purity-test/
```

---

## PM/QA 역할 분리

### 역할 정의

| 역할 | 책임 | 하지 않는 것 |
|------|------|-------------|
| **QA (Gatekeeper)** | FAIL 감지, 원인 분해, Allowed Fix Types 제시 | 개선 방향 결정, 재작업 지시 |
| **PM (Workflow Runner)** | Allowed Fix Types 중 선택, 재작업 지시, 개선 방향 결정 | FAIL 감지, 원인 분석 |

### 워크플로우 내 역할 분리

```
┌─────────────────────────────────────────────────────────────────┐
│ test-workflow-runner (PM 역할)                                   │
│                                                                 │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐      │
│   │ Generator   │ ──→ │ Gatekeeper  │ ──→ │ PM 결정    │       │
│   │ (작업 실행) │     │ (QA 검증)   │     │ (계속/중단)│       │
│   └─────────────┘     └─────────────┘     └─────────────┘      │
│                              │                   │              │
│                        PASS: 다음 단계    FAIL: 개선 방향 결정  │
│                              │                   │              │
│                              ▼                   ▼              │
│                        ┌──────────┐      ┌──────────────┐      │
│                        │ Continue │      │ Re-generate  │      │
│                        └──────────┘      │ 또는 수동 수정│      │
│                                          └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 기본 입력

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| `target` | 선택 | 테스트 ID 또는 URL |

- **target 없으면**: 사용자에게 대상 테스트 확인 요청
- **target 있으면**: 해당 테스트 디렉토리 매칭

---

## 실행 순서 (13단계 + Gatekeeper 호출 포인트)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     TEST WORKFLOW RUNNER                                     │
│                     "워크플로우대로 진행해줘!"                               │
│                     + PM/QA 역할 분리                                        │
└─────────────────────────────────────────────────────────────────────────────┘

 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 0: 대상 테스트 결정                                                    │
 │ • target 파라미터 확인                                                      │
 │ • 없으면 사용자에게 확인 요청                                               │
 │ • 새 테스트인지 리뉴얼인지 판단                                             │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 1: test-scaffolding (새 테스트) / 기존 분석 (리뉴얼)                   │
 │ • 새 테스트: boilerplate 생성                                               │
 │ • 리뉴얼: 기존 파일 구조 분석                                               │
 │ • 출력: frontend/app/[test-id]/ 디렉토리                                    │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 2: quality-gate-checker (G0) ★ QA 역할                                 │
 │ • G0: 테스트 구조 검증                                                      │
 │ • G0.1: 3-Step State Machine 확인                                           │
 │ • G0.2: 파일 구조 패턴 확인                                                 │
 │                                                                             │
 │ ⛔ FAIL → QA: FAIL Report 생성                                              │
 │         → PM: 개선 방향 결정 (구조 수정 후 재실행)                          │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │ PASS
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 3: test-revamp-specialist                                              │
 │ • 컴포넌트 구현 (Landing + QuizUI + Report)                                 │
 │ • Framer Motion 애니메이션 적용                                             │
 │ • config.ts 테마/색상 설정                                                  │
 │                                                                             │
 │ 📋 자동 Gatekeeper 호출 (작업 직후):                                        │
 │    - quality-gate-checker (gates: [G1, G2, G3])                             │
 │                                                                             │
 │ ⛔ FAIL → QA: FAIL Report 생성                                              │
 │         → PM: 재생성 또는 수동 수정 결정                                    │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │ PASS
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 4: quality-gate-checker (G1~G5 종합) ★ QA 역할                         │
 │ • G1: 4버튼 그리드 검증                                                     │
 │ • G2: 프로그레스 바 + 300ms 트랜지션 검증                                   │
 │ • G3: URL 기반 결과 공유 (?res=) 검증                                       │
 │ • G4: OG 이미지 렌더링 검증                                                 │
 │ • G5: Sitemap 포함 여부 검증                                                │
 │                                                                             │
 │ ⛔ FAIL → QA: FAIL Report 목록 생성                                         │
 │         → PM: 개별 수정 결정                                                │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │ PASS
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 5: og-image-generator                                                  │
 │ • og/og-template.tsx 생성/검증                                              │
 │ • /api/og?type=[test-id] 렌더링 테스트                                      │
 │                                                                             │
 │ ⛔ FAIL → 재생성                                                            │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │ PASS
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 6: seo-optimizer                                                       │
 │ • 메타태그 생성 (Title, Description)                                        │
 │ • Schema.org JSON-LD 마크업                                                 │
 │ • robots 설정                                                               │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 7: sitemap-generator                                                   │
 │ • frontend/app/sitemap.ts 업데이트                                          │
 │ • 테스트 URL 추가 확인                                                      │
 │                                                                             │
 │ ⛔ FAIL → 재생성                                                            │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 8-9: 병렬 실행 (독립적 검증)                                           │
 │                                                                             │
 │ ┌─────────────────────────┐  ┌─────────────────────────┐                   │
 │ │ 8. performance-optimizer │  │ 9. code-quality        │                   │
 │ │ ────────────────────────│  │ ────────────────────────│                   │
 │ │ • Lighthouse 측정       │  │ • npm run lint          │                   │
 │ │ • Core Web Vitals 확인  │  │ • npx tsc --noEmit      │                   │
 │ │ • 최적화 적용           │  │                         │                   │
 │ │                         │  │                         │                   │
 │ │ ⚠️ WARNING → 기록       │  │ ⛔ ERROR → 수정 필요   │                   │
 │ └─────────────────────────┘  └─────────────────────────┘                   │
 │                                                                             │
 │ ⚡ 효과: 실행 시간 30-40% 단축                                              │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 10: link-checker ★ QA 역할                                             │
 │ • 모든 내부 링크 404 검증                                                   │
 │ • 끊어진 링크 탐지                                                          │
 │                                                                             │
 │ ⛔ FAIL → QA: 끊어진 링크 FAIL Report                                       │
 │         → PM: 링크 수정 결정                                                │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │ PASS
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ STEP 11: build-validator                                                    │
 │ • npm run build                                                             │
 │ • 빌드 성공 확인                                                            │
 │                                                                             │
 │ ⛔ BUILD FAIL → 즉시 중단 + troubleshoot 가이드                             │
 │ ✅ BUILD PASS → "빌드까지 완료" 리포트 출력                                 │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ (선택) STEP 12: deploy (push 모드) - 사용자 요청 시에만                     │
 │ • git add . && git commit && git push                                       │
 │ • Vercel 자동 배포                                                          │
 └─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ (권장) STEP 13: post-mortem-analyzer                                        │
 │ • 작업 중 발생한 문제 분석                                                  │
 │ • 워크플로우 개선 제안                                                      │
 └─────────────────────────────────────────────────────────────────────────────┘
```

---

## FAIL 시 PM 결정 흐름

### FAIL 발생 시 워크플로우

```
┌─────────────────────────────────────────────────────────────────┐
│ FAIL 발생!                                                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ QA (Gatekeeper) 역할                                             │
│ ────────────────────────────────────────────────────────────────│
│ 1. FAIL 감지                                                     │
│ 2. 원인 분해 (왜 FAIL?)                                          │
│ 3. FAIL Report 생성                                              │
│    - Gate: {실패한 Gate}                                         │
│    - Scope: {검사 범위}                                          │
│    - Files: {실패 파일}                                          │
│    - Reason: {실패 원인}                                         │
│    - Allowed Fix Types: [유형1, 유형2, 유형3]                    │
│    - Suggested Subagent: {권장 Subagent}                         │
│ 4. PM에게 리포트 전달                                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ PM (Workflow Runner) 역할                                        │
│ ────────────────────────────────────────────────────────────────│
│ FAIL Report 검토 후 결정:                                        │
│                                                                  │
│ 옵션 A: Allowed Fix Types 중 선택 + Subagent 재호출             │
│         예: "4버튼 그리드 추가 방식으로 test-revamp-             │
│              specialist 재실행"                                  │
│                                                                  │
│ 옵션 B: 수동 수정 후 재검증 요청                                 │
│         예: "파일 직접 수정 후 quality-gate-checker만 재실행"    │
│                                                                  │
│ 옵션 C: 워크플로우 중단                                          │
│         예: "설계 단계로 돌아가서 구조 재설계"                    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ 재실행                                                           │
│ • PM 결정에 따라 Subagent 재호출 또는 수동 수정                  │
│ • Gatekeeper 재검증                                              │
│ • PASS 시 다음 단계로 진행                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 중단 조건 (FAIL 처리)

### G0 FAIL (구조 단계)

```
⛔ G0 FAIL - 워크플로우 중단

[FAIL REPORT]
────────────────────────────────────────
Gate: G0.1 3-Step State Machine
Scope: Test structure
Files:
  - frontend/app/rice-purity-test/RicePurityClientPage.tsx
Reason:
  - 3-Step State Machine 미구현 (landing | quiz | result 없음)
Violated Rule:
  - CLAUDE.md Core Rules
Allowed Fix Types:
  - state machine 추가
  - ClientPage 재생성
Suggested Subagent:
  - test-revamp-specialist
────────────────────────────────────────

🔴 QA 역할 완료. PM 결정 대기.
```

### G1~G5 FAIL (기능 검증 단계)

```
⛔ G1 FAIL - 워크플로우 중단

[FAIL REPORT]
────────────────────────────────────────
Gate: G1 4버튼 그리드
Scope: Result page
Files:
  - frontend/app/rice-purity-test/components/Report.tsx
Reason:
  - 4버튼 그리드 누락 (Share Test, Share Result, Retake, Home)
Violated Rule:
  - CLAUDE.md Core Rules - Result Page
Allowed Fix Types:
  - 4버튼 그리드 컴포넌트 추가
  - Report.tsx 재생성
Suggested Subagent:
  - test-revamp-specialist
────────────────────────────────────────

🔴 QA 역할 완료. PM 결정 대기.
```

### BUILD FAIL (빌드 단계)

```
⛔ BUILD FAIL - 워크플로우 중단

빌드 오류:
• Type error in Report.tsx line 42

원인 분류: TypeScript 오류

수정 방법:
1. 오류 파일 확인 및 타입 수정
2. npm run build 재실행
```

### WARNING 처리 (G6~G8)

```
⚠️ WARNING - 빌드 진행 (경고 리스트 포함)

[WARNING REPORT]
────────────────────────────────────────
Gate: G6 Core Web Vitals
Scope: Performance
Files:
  - frontend/app/rice-purity-test/
Issue:
  - LCP 3.2s (목표: < 2.5s)
Recommendation:
  - 이미지 최적화 적용
  - next/image priority 속성 추가
────────────────────────────────────────

빌드 결과: ✅ 성공

📋 PM 참고사항:
- WARNING은 배포 차단하지 않음
- 선택적으로 개선 가능
```

---

## 출력 형식 (성공 시)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TEST WORKFLOW COMPLETE ✅                                                     │
│ PM/QA 역할 분리                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

📁 대상 테스트
• 테스트 ID: rice-purity-test
• 경로: frontend/app/rice-purity-test/
• URL: /rice-purity-test/

📊 Gate 요약 (QA 검증 결과)
• G0 (구조): PASS ✅
• G0.1 (3-Step): PASS ✅
• G0.2 (파일 구조): PASS ✅
• G1 (4버튼 그리드): PASS ✅
• G2 (프로그레스 바): PASS ✅
• G3 (URL 공유): PASS ✅
• G4 (OG 이미지): PASS ✅
• G5 (Sitemap): PASS ✅
• G6 (Core Web Vitals): WARNING ⚠️ (LCP 2.8s)
• G7 (Lighthouse): PASS ✅ (92점)
• G8 (Meta Tags): PASS ✅

📄 생성/수정 파일 (8개)
• frontend/app/rice-purity-test/page.tsx ✅
• frontend/app/rice-purity-test/RicePurityClientPage.tsx ✅
• frontend/app/rice-purity-test/config.ts ✅
• frontend/app/rice-purity-test/questions.ts ✅
• frontend/app/rice-purity-test/components/Landing.tsx ✅
• frontend/app/rice-purity-test/components/QuizUI.tsx ✅
• frontend/app/rice-purity-test/components/Report.tsx ✅
• frontend/app/rice-purity-test/og/og-template.tsx ✅

🔨 빌드 결과
• npm run build: ✅
• 빌드 시간: 32s

⚠️ 경고 사항 (WARNING)
• G6: LCP 2.8s (목표 2.5s - 이미지 최적화 권장)

🚀 다음 단계
"배포해줘" 또는 "git push해줘"로 Vercel 배포 진행 가능
```

---

## 연계 Subagent (호출 순서)

| 순서 | Subagent | 역할 | Gatekeeper 호출 | QA/PM |
|------|----------|------|-----------------|-------|
| 1 | `test-scaffolding` | 새 테스트 boilerplate (조건부) | - | PM |
| 2 | `quality-gate-checker` | G0 검증 | ★ G0 | QA |
| 3 | `test-revamp-specialist` | 컴포넌트 구현 | → G1~G3 | PM→QA |
| 4 | `quality-gate-checker` | G1~G5 종합 검증 | ★ G1~G5 | QA |
| 5 | `og-image-generator` | OG 이미지 생성 | → G4 | PM→QA |
| 6 | `seo-optimizer` | SEO 최적화 | → G8 | PM |
| 7 | `sitemap-generator` | Sitemap 업데이트 | → G5 | PM→QA |
| 8-9 | **병렬 실행** | 성능/코드 품질 | - | - |
| 8 | `performance-optimizer` | Core Web Vitals | → G6~G7 (WARNING) | PM |
| 9 | `code-quality` | lint/tsc | - | - |
| 10 | `link-checker` | 404/끊어진 링크 검증 | ★ | QA |
| 11 | (inline) | build-validator | - | - |
| 12 | `deploy` | push 모드 (선택) | - | PM |
| 13 | `post-mortem-analyzer` | 반성회 (권장) | - | PM |

---

## 주의사항

1. **기존 subagent 삭제/변경 금지**: runner는 "순서 제어 + 중단 판단"만 수행
2. **CLAUDE.md Core Rules 위반 금지**: 3-Step, 4버튼 그리드, 프로그레스 바 등
3. **git push / Vercel 배포는 verify 모드에서 절대 수행 금지**: 사용자 명시적 요청 시에만

---

## 프롬프트 예시

### 기본 실행

```
워크플로우대로 진행해줘!
```

### 특정 테스트 지정

```
워크플로우대로 진행해줘! target=rice-purity-test
워크플로우대로 진행해줘! target=/rice-purity-test/
```

### 배포까지 포함

```
워크플로우대로 진행하고 배포까지 해줘!
```

---

## 스펙 참조

- [quality-gate-spec.md](../specs/quality-gate-spec.md)
- [performance-spec.md](../specs/performance-spec.md)
- [quality-gate-checker.md](./quality-gate-checker.md)
- [test-revamp-specialist.md](./test-revamp-specialist.md)
- [performance-optimizer.md](./performance-optimizer.md)
- [og-image-generator.md](./og-image-generator.md)
- [seo-optimizer.md](./seo-optimizer.md)
- [sitemap-generator.md](./sitemap-generator.md)
- [deploy.md](./deploy.md)
