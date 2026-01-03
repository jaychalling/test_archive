# Cluster99 Quality Gate Specification

> Query-Driven SEO 기반 품질 검증 시스템

## 개요

Cluster99의 품질 Gate는 두 가지 단계로 나뉜다:

1. **Idea Gate (G0-G9)**: 아이디어 필터링 - 만들기 전 검증
2. **Implementation Gate (I1-I8)**: 구현 품질 검증 - 만든 후 검증

---

## Part 1: Idea Gate (G0-G9)

> 자세한 내용은 [idea-gate-checker.md](../subagents/idea-gate-checker.md) 참조

### 요약

| Gate | 검증 내용 | 점수 | 실패 시 |
|:-----|:----------|:-----|:--------|
| G0 | 구조 적합성 | Pass/Fail | 즉시 탈락 |
| G1 | 검색 의도 밀도 | 0-5 | - |
| G2 | E-E-A-T 구현 가능성 | 0-5 | **최소 3점 필수** |
| G3 | Thin/near-duplicate 위험도 | 0-5 | **최소 3점 필수** |
| G4 | AI Overviews/GEO 적합성 | 0-5 | - |
| G5 | 광고 적합성 (RPM/CPC) | 0-5 | - |
| G6 | 데이터 확보/유지 가능성 | 0-5 | - |
| G7 | 기술 구현 난이도 | 0-5 | - |
| G8 | 섹션 품질 리스크 | 0-5 | - |
| G9 | 성공 판정 기준 정의 | 0-5 | - |

### 통과 기준

```
총점 ≥ 35점
+ Gate 2 (E-E-A-T) ≥ 3점
+ Gate 3 (중복리스크) ≥ 3점
= ✅ 통과

총점 25-34점 = 🧪 Sandbox (/labs/)
총점 < 25점 또는 필수 Gate 미달 = ❌ 탈락
```

---

## Part 2: Implementation Gate (I1-I8)

> 구현 완료 후 배포 전 검증

### I1: 클러스터 구조 검증

**검증 대상:** 인덱스 페이지 수, 역할 분리

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| 인덱스 페이지 수 | 6-12개 | ERROR |
| Entry | 1개 | ERROR |
| Supporting | 1개 | ERROR |
| Depth | 6-7개 | ERROR |
| Glue-SEO | 1개 | ERROR |
| Glue-UX | noindex | ERROR |

**검증 방법:**

```bash
# 인덱스 페이지 수 확인
grep -r "robots.*index" frontend/app/{cluster-name}/ | wc -l

# 역할별 개수 확인
# Entry: page.tsx 1개
# Supporting: supporting/page.tsx 1개
# Depth: {depth-slug}/page.tsx 6-7개
# Glue-SEO: guide/page.tsx 1개
# Glue-UX: calculator/page.tsx (noindex)
```

---

### I2: Entry 링크 제한 검증

**검증 대상:** Entry 페이지 내부 링크 수

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| 내부 링크 총합 | 3-5개 | ERROR |
| 허브화 방지 | Entry ≠ Hub | ERROR |

**권장 링크 구성:**
- Supporting 1개
- Depth 2개
- Glue-SEO 1개

---

### I3: Supporting 구조 검증

**검증 대상:** Supporting 페이지 구조

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| 페이지 수 | 1페이지 | ERROR |
| 앵커 수 | 6-12개 | ERROR |
| 앵커 구조 | 답+해석+링크 | WARNING |

**검증 방법:**

```bash
# 앵커 개수 확인
grep -c "id=" frontend/app/{cluster-name}/supporting/page.tsx
```

---

### I4: Depth 다양화 검증

**검증 대상:** Depth 페이지 간 구조 차별화

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| 섹션 타입 배열 | 각각 다름 | ERROR |
| near-duplicate | 0% | ERROR |
| UI Block 수 | 5종 이상 | WARNING |

**검증 방법:**

```bash
# 각 Depth의 섹션 타입 추출 후 비교
# 동일한 배열이 있으면 FAIL
```

**허용되는 예:**
- A: StatBlock → Table → Interpretation → FAQ
- B: Story → Chart → Scenario → Myths → FAQ
- C: Comparison → Pros/Cons → Checklist → FAQ

**금지되는 예:**
- A: StatBlock → Table → FAQ
- B: StatBlock → Table → FAQ ❌ (동일 구조)

---

### I5: 인덱싱/Sitemap 검증

**검증 대상:** robots 메타, sitemap 포함 여부

| 페이지 역할 | robots | sitemap |
|:-----------|:-------|:--------|
| Entry | index,follow | 포함 |
| Supporting | index,follow | 포함 |
| Depth | index,follow | 포함 |
| Glue-SEO | index,follow | 포함 |
| Glue-UX | **noindex,follow** | **제외** |

**검증 방법:**

```bash
# noindex 페이지가 sitemap에 없는지 확인
grep "noindex" frontend/app/{cluster-name}/**/*.tsx
# 해당 경로가 sitemap.ts에 없어야 함
```

---

### I6: Canonical 검증

**검증 대상:** canonical 중복/탈취

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| Self-canonical | 모든 페이지 | ERROR |
| 중복 canonical | 0개 | ERROR |
| Entry canonical 탈취 | 발생 안 함 | ERROR |

**검증 방법:**

```bash
# 모든 canonical 태그 추출
grep -r "canonical" frontend/app/{cluster-name}/

# 중복 확인
# 서로 다른 URL인데 canonical이 동일하면 FAIL
```

---

### I7: E-E-A-T 구현 검증 (Gate 2-A)

**검증 대상:** Entry/Depth E-E-A-T 구현

#### Entry 페이지

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| Data Sources | 2개 이상 | ERROR |
| Methodology | 3-7줄 | ERROR |
| Last Updated | YYYY-MM-DD | ERROR |

#### Depth 페이지

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| Calculation Box 또는 Assumptions Box | 1개 이상 | ERROR |
| 단순 서술만 | 금지 | ERROR |

---

### I8: Engagement UI 검증

**검증 대상:** High Engagement UI 구현

| 체크 | 기준 | 실패 시 |
|:-----|:-----|:--------|
| Depth UI Block | 5종 이상 | WARNING |
| 멈출 포인트 | 5회 이상 | WARNING |
| 숫자/표/비교 블록 | 3개 이상 | WARNING |
| 텍스트-only 구간 | 2단락 이하 | WARNING |

---

## 검증 실행 순서

```
┌─────────────────────────────────────────────────────────────────┐
│ IMPLEMENTATION GATE EXECUTION ORDER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ STEP 1: I1 클러스터 구조 검증                                    │
│         ⛔ ERROR 발생 시 중단                                    │
│                                                                 │
│ STEP 2: I2 Entry 링크 제한 검증                                  │
│         ⛔ ERROR 발생 시 중단                                    │
│                                                                 │
│ STEP 3: I3 Supporting 구조 검증                                  │
│         ⛔ ERROR 발생 시 중단                                    │
│                                                                 │
│ STEP 4: I4 Depth 다양화 검증                                     │
│         ⛔ ERROR 발생 시 중단                                    │
│                                                                 │
│ STEP 5: I5 인덱싱/Sitemap 검증                                   │
│         ⛔ ERROR 발생 시 중단                                    │
│                                                                 │
│ STEP 6: I6 Canonical 검증                                        │
│         ⛔ ERROR 발생 시 중단                                    │
│                                                                 │
│ STEP 7: I7 E-E-A-T 구현 검증                                     │
│         ⛔ ERROR 발생 시 중단                                    │
│                                                                 │
│ STEP 8: I8 Engagement UI 검증                                    │
│         ⚠️ WARNING은 권고, 배포 가능                             │
│                                                                 │
│ ALL PASS → npm run build → deploy                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 출력 형식

```
┌─────────────────────────────────────────────────────────────────┐
│ IMPLEMENTATION GATE REPORT                                       │
├─────────────────────────────────────────────────────────────────┤
│ Cluster: {클러스터명}                                            │
│ Date: {날짜}                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ I1: 클러스터 구조 ─────────────────────────────────── ✅ PASS   │
│     Index pages: 10 (6-12 ✓)                                    │
│     Entry: 1, Supporting: 1, Depth: 6, Glue-SEO: 1              │
│                                                                 │
│ I2: Entry 링크 제한 ───────────────────────────────── ✅ PASS   │
│     Internal links: 4 (3-5 ✓)                                   │
│                                                                 │
│ I3: Supporting 구조 ───────────────────────────────── ✅ PASS   │
│     Pages: 1, Anchors: 7 (6-12 ✓)                               │
│                                                                 │
│ I4: Depth 다양화 ──────────────────────────────────── ✅ PASS   │
│     Unique structures: 6/6                                      │
│     Near-duplicate: 0%                                          │
│                                                                 │
│ I5: 인덱싱/Sitemap ────────────────────────────────── ✅ PASS   │
│     noindex in sitemap: 0                                       │
│                                                                 │
│ I6: Canonical ─────────────────────────────────────── ✅ PASS   │
│     Duplicate canonicals: 0                                     │
│                                                                 │
│ I7: E-E-A-T 구현 ──────────────────────────────────── ✅ PASS   │
│     Entry: DataSources ✓, Methodology ✓, LastUpdated ✓          │
│     Depth: 6/6 have Calculation/Assumptions Box                 │
│                                                                 │
│ I8: Engagement UI ─────────────────────────────────── ⚠️ WARN   │
│     Depth UI Blocks: avg 4.5 (min 5 recommended)                │
│     Recommendation: Add more blocks to purchasing-power         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ OVERALL: ✅ PASS (1 warning)                                    │
│ Ready for: npm run build                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pre-Deploy Checklist

배포 전 최종 확인:

```
┌─────────────────────────────────────────────────────────────────┐
│ PRE-DEPLOY CHECKLIST                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ STRUCTURE                                                        │
│ [ ] 인덱스 페이지 6-12개 이내                                    │
│ [ ] Entry 1개, Supporting 1개, Depth 6-7개, Glue-SEO 1개        │
│ [ ] Entry 링크 3-5개 이내                                        │
│ [ ] Supporting 앵커 6-12개                                       │
│ [ ] Glue-UX noindex + sitemap 제외                              │
│                                                                 │
│ CONTENT QUALITY                                                  │
│ [ ] 각 Depth 구조 다양화 (near-duplicate 0)                     │
│ [ ] E-E-A-T 구현 (Data Sources, Methodology, Last Updated)      │
│ [ ] UI Block 5종 이상 (Depth)                                   │
│ [ ] 텍스트-only 구간 2단락 이하                                  │
│                                                                 │
│ TECHNICAL SEO                                                    │
│ [ ] 모든 페이지 self-canonical                                   │
│ [ ] sitemap에 noindex 페이지 없음                               │
│ [ ] OG/Twitter 메타 전 페이지 적용                              │
│ [ ] datePublished/dateModified 고정값 반복 없음                 │
│                                                                 │
│ BUILD                                                            │
│ [ ] npm run build 성공                                          │
│ [ ] 타입 에러 0개                                               │
│ [ ] lint 에러 0개                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
