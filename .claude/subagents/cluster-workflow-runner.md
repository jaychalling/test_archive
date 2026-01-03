# Cluster99 Workflow Runner

> Query-Driven SEO 기반 클러스터 개발 전체 워크플로우 자동화

## 목적

Cluster99의 핵심 철학인 **"페이지 수를 줄이고, 질문 단위로 역할을 분리"**하는 구조를 자동화된 워크플로우로 구현한다.

## 트리거 명령어

```bash
워크플로우대로 진행해줘!                           # 전체 자동화
워크플로우대로 진행해줘! target=inflation          # 특정 클러스터 지정
워크플로우대로 진행하고 배포까지 해줘!              # 배포 포함
클러스터 새로 만들어줘! topic="cost-of-living"    # 신규 클러스터 생성
```

## 실행 순서

```
┌─────────────────────────────────────────────────────────────────┐
│ CLUSTER99 WORKFLOW (Query-Driven SEO)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ PHASE 1: IDEA VALIDATION (아이디어 검증)                         │
│ ─────────────────────────────────────────────────────────────── │
│ STEP 0:  대상 클러스터/토픽 결정                                  │
│ STEP 1:  idea-gate-checker (G0~G9) ⛔ 35점 미만 즉시 탈락        │
│          → Gate 0 (구조 적합성) 실패 시 중단                      │
│          → Gate 2 (E-E-A-T) 3점 미만 시 중단                     │
│          → Gate 3 (중복리스크) 3점 미만 시 중단                   │
│                                                                 │
│ PHASE 2: CLUSTER DESIGN (클러스터 설계)                          │
│ ─────────────────────────────────────────────────────────────── │
│ STEP 2:  cluster-architect - 클러스터 구조 설계                  │
│          → Entry 1개 설계                                        │
│          → Supporting 1개 + 앵커 6-12개 설계                     │
│          → Depth 6-7개 설계                                      │
│          → Glue-SEO 1개 설계                                     │
│          → Glue-UX (선택) 설계                                   │
│ STEP 3:  structure-validator (구조 검증) ⛔ FAIL시 STEP 2 재실행 │
│                                                                 │
│ PHASE 3: IMPLEMENTATION (구현)                                   │
│ ─────────────────────────────────────────────────────────────── │
│ STEP 4:  role-page-generator - 역할별 페이지 생성                │
│          → Entry Page 생성                                       │
│          → Supporting Page 생성                                  │
│          → Depth Pages 생성 (6-7개)                              │
│          → Glue-SEO Page 생성                                    │
│          → Glue-UX Page 생성 (noindex)                           │
│ STEP 5:  eeat-implementer - E-E-A-T 구현 (Gate 2-A)              │
│          → Data Sources 섹션 추가                                │
│          → Methodology 섹션 추가                                 │
│          → Last Updated 추가                                     │
│ STEP 6:  engagement-optimizer - High Engagement UI 적용          │
│          → UI Block 5종 이상 적용                                │
│          → 체류시간 최적화 체크                                   │
│                                                                 │
│ PHASE 4: QUALITY ASSURANCE (품질 검증)                           │
│ ─────────────────────────────────────────────────────────────── │
│ STEP 7:  duplicate-detector - near-duplicate 검사 ⛔ FAIL시 수정 │
│ STEP 8:  indexability-checker - 인덱싱/sitemap/robots 검증       │
│          → noindex 페이지 sitemap 제외 확인                      │
│          → canonical self-reference 확인                         │
│ STEP 9:  ⚡ 병렬 실행                                            │
│          → seo-optimizer (메타/OG/Schema)                        │
│          → performance-optimizer (Core Web Vitals)               │
│          → code-quality (lint/타입)                              │
│ STEP 10: link-checker - 404/끊어진 링크 검증                     │
│                                                                 │
│ PHASE 5: BUILD & DEPLOY                                          │
│ ─────────────────────────────────────────────────────────────── │
│ STEP 11: npm run build                                           │
│ STEP 12: deploy [선택] - Vercel 배포                             │
│ STEP 13: post-mortem-analyzer [권장] - 작업 분석                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 클러스터 구조 규칙 (불변)

### 인덱스 절대량

| 구성       | 개수    | robots         | sitemap |
|:-----------|:--------|:---------------|:--------|
| Entry      | 1       | index,follow   | 포함    |
| Supporting | 1       | index,follow   | 포함    |
| Depth      | 6-7     | index,follow   | 포함    |
| Glue-SEO   | 1       | index,follow   | 포함    |
| Glue-UX    | noindex | noindex,follow | 제외    |

**총 index 페이지: 6-12개 (절대 초과 금지)**

### 역할 혼합 금지

- Entry는 허브가 아니다 (링크 3-5개 제한)
- Supporting은 1페이지 + 앵커 6-12개
- Depth는 체류/신뢰 문서 (표/비교/해석 필수)
- Glue-UX는 도구 전용 (SEO 담당 X)

## 디렉토리 구조

```
frontend/app/{cluster-name}/
├── page.tsx                    # Entry Page
├── config.ts                   # 클러스터 설정 (테마, 색상, 메타)
├── components/
│   ├── Entry/
│   │   ├── QuickAnswer.tsx
│   │   ├── ResultCard.tsx
│   │   └── NextClicks.tsx
│   ├── Supporting/
│   │   ├── AnchorNav.tsx
│   │   └── AnchorSection.tsx
│   ├── Depth/
│   │   ├── StatBlock.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── InfoCard.tsx
│   │   └── FAQAccordion.tsx
│   └── Shared/
│       ├── SeoHead.tsx
│       ├── TrustBadge.tsx
│       └── DataSources.tsx
├── supporting/
│   └── page.tsx                # Supporting Page (앵커 6-12)
├── depth/
│   ├── [depth-slug]/
│   │   └── page.tsx            # Depth Pages (6-7개)
├── index/
│   └── page.tsx                # Glue-SEO (목록 허브)
├── calculator/
│   └── page.tsx                # Glue-UX (noindex)
├── data/
│   ├── entry.json
│   ├── supporting.json
│   ├── depths.json
│   └── faq.json
└── og/
    └── og-template.tsx
```

## FAIL 처리 흐름

```
┌─────────────────────────────────────────────────────────────────┐
│ FAIL 발생!                                                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. FAIL Report 생성                                              │
│    - Gate: {실패한 Gate}                                         │
│    - Score: {현재 점수} / {필요 점수}                             │
│    - Files: {실패 파일}                                          │
│    - Reason: {실패 원인}                                         │
│    - Suggested Fix: {수정 방법}                                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. 결정 옵션                                                     │
│    A: 자동 수정 후 재검증                                        │
│    B: 수동 수정 요청 후 대기                                     │
│    C: 워크플로우 중단                                            │
│    D: Sandbox (/labs/) 이동 (Gate 8-A)                          │
└─────────────────────────────────────────────────────────────────┘
```

## Sandbox 규칙 (Labs)

Gate 총점 25-34점인 경우 Sandbox 실험 가능:

- URL: `/labs/{cluster-name}/`
- robots: `noindex,follow`
- 내부 링크: Labs 내부에서만 순환
- 실험 기간: 30-60일
- 정식 편입 조건: Impression 증가 + Depth 체류시간 평균 이상

## 성공 기준

- [ ] 클러스터 인덱스 페이지 6-12개 이내
- [ ] Entry 링크 3-5개 이내
- [ ] Supporting 1페이지 + 앵커 6-12개
- [ ] 모든 Depth 구조 다양화 (near-duplicate 0)
- [ ] Glue-UX noindex + sitemap 제외
- [ ] E-E-A-T 구현 (Data Sources, Methodology, Last Updated)
- [ ] UI Block 5종 이상 (Depth)
- [ ] npm run build 성공
