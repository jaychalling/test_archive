# Test-Archive 전략 v2 — 데이터 기반 집중 (2026-06)

> **이 문서가 유일한 전략 기준이다.** 기존 사업계획서·Tier 런칭 리스트는 `plans/archive/`로 이동 (2026-06-12 폐기).
> 운영 룰(`Test-archive operation rule.md`)과 개발 룰(CLAUDE.md)은 계속 유효하다.

## 1. 전략 전환 — 무엇이 바뀌었나

| | 구 전략 (사업계획서 / Tier 리스트) | 신 전략 (v2) |
|---|---|---|
| 제작 기준 | 직관 기반 Tier 0/1/2 리스트 | **실측 검색량 × 경쟁도 × 현재 순위** |
| 목표 | "포털로 보이기 위한 최소 세트" (양적 확장) | 클릭이 나오는 키워드에 집중 (질적 상승) |
| 측정 | 없음 | GA4 (`G-D5FDFLHWQW`) + GSC 주간 추적, 손절 라인 명시 |

**전환 근거 (2026-06-12 실측):** 테스트 19개 / 28일 노출 ~420 / 클릭 9. 양은 채웠지만 순위(평균 60위권)가 트래픽을 막고 있다. 반면 일부 키워드는 이미 1페이지 문턱: "free bdsm test" **5위**, "bdsm quiz" **19위**, "bdsm test free" **22위**, "political compass test" 57위. 시장 수요는 검증됨 — rice purity test 100만/월, personality test 24.6만/월, political compass 11만/월 (Keyword Planner).

> 같은 날 분석에서 자매 사이트 wheretopaylesstax(니치 수요 부족)·quickanswerify(YMYL 권위 장벽)는 동결됐다. Vice CEO 리소스는 이 프로젝트에 집중된다. 전체 분석: https://vice-ceo-reports.vercel.app/reports/adsense-strategy-2026-06-12

## 2. 운영 원칙 (불변)

1. **수요 검증 없는 제작 금지** — 모든 신규 테스트는 §4 제작 게이트를 통과해야 한다. (quickanswerify가 검색량 데이터 없이 49페이지를 만들고 90일간 클릭 1회로 끝난 실패를 반복하지 않는다.)
2. **제작보다 순위** — 새 테스트 1개보다 기존 페이지를 50위→10위로 올리는 것이 먼저다. 신규 제작은 "그 키워드를 받을 페이지가 아예 없을 때"만.
3. **측정 없는 작업 금지** — 모든 작업은 타겟 키워드와 기대 지표(노출/순위/클릭)를 명시하고, 2주 후 GSC로 검증한다.
4. **바이럴은 두 번째 엔진** — 검색 권위가 쌓이기 전까지 공유 카드(소셜 유입)가 초기 트래픽과 백링크를 만든다. 결과 페이지 공유율을 GA4로 추적한다.

## 3. 백로그 — GSC×검색량 매트릭스에서 도출 (2026-06-12, 90일 데이터)

> **백로그 소싱 원칙: 신규 제작이 아니라 GSC가 이미 보여주는 수요에서 할 일을 찾는다.**
> 우선순위 = 실측 검색량(Keyword Planner) × 현재 순위 갭(GSC) × 도달 가능성.
> ※ BDSM 키워드는 KP가 성인 키워드라 검색량 비공개 — GSC 노출량(사이트 1위, 90일 711회)으로 수요 입증.

### 현황 매트릭스 (90일 GSC × 실측 검색량)

| 페이지 | 90일 노출/클릭 | 평균 순위 | 키워드 클러스터 (월 검색량, 경쟁) | 판정 |
|---|---|---|---|---|
| political-compass-test | 867 / 4 | 61위 | political compass test **110k LOW** + spectrum test 8.1k + compass quiz 3.6k + spectrum quiz 1.9k | 최대 상금, 긴 등반 |
| bdsm-test | 711 / 17 | 28위 | KP 비공개 (성인) — 사이트 내 최대 노출 | **문턱권** (test bdsm 16위, bdsm type test 14위) |
| rice-purity | 342 / 27 | 54위 | rice purity test **1M LOW**, rice purity score **60.5k LOW**, rice test 4.4k | 클릭 최다 — score 변형 공략 |
| mental-age-test | 266 / 0 | 79위 | mental age test **49.5k LOW** | 보강 미실시 — 다음 타자 |
| big-five-test | 103 / 0 | 55위 | big five personality test **27.1k LOW**, big five test 2.4k | 보강 미실시 |
| 16-personality-test | 25 / 0 | **6위** | 16 personalities test **201k LOW** | 순위 자산은 있는데 큰 키워드를 안 받음 → 타겟 확장 |
| love-language-test | 25 / 0 | 123위 | love language test 110k **MEDIUM** | 너무 멂 + 경쟁 — 보류 |
| career-aptitude-test | 15 / 0 | 33위 | career aptitude test 27.1k **MEDIUM** | 후순위 |

### T1 — 이번 주 (보강 패턴 횡전개: 콘텐츠+FAQ스키마+내부링크)
| 작업 | 근거 (검색량 × 현재 위치) | 상태 |
|---|---|---|
| bdsm-test·political-compass-test 온페이지 보강 | 사이트 노출 1·2위 페이지 | ✅ 6/12 배포 (e2b01bd) — 재크롤 추적 |
| mental-age-test 동일 보강 | 49.5k LOW × 79위 × 노출 266 (보강 0회) | ✅ 6/12 배포 |
| big-five-test 동일 보강 | 27.1k LOW × 55위 × 노출 103 | ✅ 6/12 배포 |
| 16-personality 클러스터 확장 + rice-purity score 섹션 (T2 조기 실행) | 201k LOW pos6 / 60.5k LOW | ✅ 6/12 배포 |
| 홈/허브 내부링크 가중 (노출 상위 4페이지로) | 전 페이지 | ⬜ |
| 서포트 글 클러스터 1차 (rice purity score 의미 등 — §3.5 레버 2) | 60.5k LOW 외 | ⬜ 다음 빌드 |

### T2 — 다음 (순위 자산 활용)
| 작업 | 근거 | 상태 |
|---|---|---|
| 16-personality 페이지를 "16 personalities test" 클러스터(201k LOW) 타겟으로 확장 — 이미 6위인 순위 자산에 큰 키워드를 연결 (상표 주의: "MBTI-style" 표현) | 201k LOW, pos 6 | ⬜ |
| rice purity score 해설 섹션 (클릭 27회로 사이트 권위 최상 페이지) | 60.5k LOW | ⬜ |

### T3 — 측정 후 결정
| 작업 | 조건 |
|---|---|
| political compass 2차 보강 (위성 쿼리 spectrum test/quiz H2 커버) | 6/12 배포분 재크롤 후 순위 변동 확인 |
| GA4 공유 카드 유입 분석 → 리소스 재배분 | GA4 데이터 축적 (6/14~) |
| love-language·career-aptitude 보강 여부 | T1 효과 검증 후 (MEDIUM 경쟁이라 후순위) |

**참고 — bdsm-test 수익 한계**: 성인 콘텐츠라 AdSense 게재 제외 페이지 (6/11 ad-exclusion 플래그). 트래픽·내부순환·브랜드 가치로만 기여하므로, 수익화 관점 핵심은 mental-age·big-five·16-personality·rice-purity다.

## 3.5 1페이지 플레이북 — 순위를 만드는 4개 레버

> 젊은 도메인이 100k+ 키워드 1페이지에 가는 검증된 경로는 하나다:
> **롱테일 선점 → 체류/클릭 신호 축적 → 토픽 권위 → 헤드 키워드 상승.** 레버 4개를 동시에 돌린다.

### 레버 1 — 온페이지 (실행 중)
- 머니 페이지 전체에 "콘텐츠 팩"(설명+채점 방식+FAQ 스키마+내부링크) 횡전개.
- 6/12 완료: bdsm, political-compass, mental-age, big-five, 16-personality, rice-purity (노출 상위 6페이지 전부).
- 타이틀은 seo-meta-tags 스킬 공식 유지 (정체성 자극형 — 이미 적용돼 있음).

### 레버 2 — 토픽 권위 클러스터 (다음 빌드, 최대 레버)
각 머니 테스트마다 저경쟁 정보성 롱테일을 노리는 **서포트 글 2~4개**를 만들어 허브-스포크로 내부링크한다.
정보성 LOW 키워드는 젊은 사이트도 수 주 내 순위가 잡히고, 노출·클릭·내부 링크 주스가 테스트 페이지를 민다.
- rice-purity 클러스터: "rice purity score 의미"(60.5k LOW), 평균 점수, 테스트 유래
- political-compass 클러스터: 4분면 해설, left vs right 의미, libertarian vs authoritarian
- mental-age 클러스터: mental age 개념, 평균 mental age
- big-five/16-personality 클러스터: OCEAN 특성 해설, big five vs 16 types 비교
- 라우트: `/guides/{slug}/` 신설. 글당 본문 1,200자+, 테스트로 CTA, FAQ 스키마.

### 레버 3 — 검색 밖 신호 (백링크·브랜드)
젊은 도메인의 진짜 병목은 링크다. 구매 불가 → 콘텐츠가 벌게 한다.
- **공유 카드** (6/12 구축): 결과 공유 → 소셜 유입 → 브랜드 검색·자연 링크.
- **링커블 자산**: 점수 분포/통계 페이지 (statistical-data 스킬의 인구 norm 데이터 활용, 출처 명시) — 레딧 스레드·블로그가 인용하는 유형.
- **임베드 위젯**: "이 테스트를 당신 사이트에" — bdsmtest.org가 백링크를 모은 고전 전법. (T3, 트래픽 확인 후)
- **소셜 시딩 캐던스**: Pinterest(퀴즈 핀은 에버그린 복리), 관련 서브레딧, Threads(기존 theads_bot 인프라 재활용 검토). 주 2~3회.

### 레버 4 — 측정 루프
- 주간: GSC 쿼리 순위 변동 + GA4 채널 믹스 → 백로그 갱신 (§5 루틴).
- 클릭이 먼저 잡히는 클러스터에 서포트 글·시딩 리소스 재배분.

### 수익화 게이트 (반드시 순서대로)
1. **지금**: 트래픽 만들기 (위 4개 레버). 광고 없는 빠른 사이트가 순위에 유리.
2. **주 100클릭 도달 시**: AdSense 신청 (서포트 글 클러스터가 승인 심사의 콘텐츠 볼륨 요건도 충족시킴). bdsm 페이지는 게재 제외 유지.
3. **승인 후**: 결과 페이지 Related Tests 아래 단일 슬롯부터 (운영 룰 §결과 페이지 순서 준수). RPM 측정 후 확장.

## 4. 신규 테스트 제작 게이트 (전부 충족해야 제작)

1. 대표 키워드 실측 검색량 **월 30,000 이상** (Keyword Planner, `E:\VICE CEO\shared\tools\keyword-planner\`)
2. 경쟁도 **HIGH 아님**
3. SERP 상위 10에 **전용 독점 사이트가 3개 미만** (직접 검색 확인)
4. 의료 진단·법률·금융 조언 아님 (운영 룰의 금지 영역 + YMYL 회피)
5. 기존 19개 테스트와 결과 공유 동선이 연결됨 (Related Tests 상호 링크 가능)

## 5. KPI와 판정 (4주 사이클)

**베이스라인 (2026-06-12):** 일 노출 6~21 (평균 ~15) / 28일 클릭 9 / 1페이지 키워드 1개.

| 지표 | 4주 목표 (7/10) | 측정 |
|---|---|---|
| 일 평균 노출 | 50+ (3배) | GSC |
| 주간 클릭 | 10+ | GSC |
| 1페이지(10위 내) 키워드 | 3개+ | GSC 쿼리 |
| 소셜/직접 유입 세션 | 추세 확인 (베이스라인 신규) | GA4 |

**손절 라인:** 4주 후 목표 미달 시 신규 제작을 멈추고 배포 채널(레딧·핀터레스트 등 소셜 시딩)과 온페이지를 재검토한다. 심리테스트 시장 수요 자체는 검증됐으므로 "무엇을"이 아니라 "어떻게"를 바꾼다.

**주간 루틴:** 매주 GSC 쿼리 순위 변동 + GA4 유입 채널 확인 → 이 문서의 백로그 상태 갱신.

## 6. 문서 지위

- **유효**: 이 문서(전략·백로그), `Test-archive operation rule.md`(운영 철학), CLAUDE.md(개발 룰), `.claude/skills/`(작업 가이드)
- **폐기** → `plans/archive/`: `Test-archive 사업계획서.md`, `Tier 0 런칭 필수 10개.md` (직관 기반 제작 리스트 — 게이트 미통과 항목은 제작하지 않는다)
