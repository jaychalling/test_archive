# Cluster99 개발 Rule

## 0. 최상위 불변 규칙 (절대 위반 금지)

### 0.1 클러스터 인덱스 절대량

- **클러스터(=앱)당 index 허용 페이지 수:** 6–12개
- **구성:** Entry 1, Supporting 1, Depth 6~7, Glue-SEO 1, Glue-UX는 noindex
- 이 룰을 깨면 “대량 템플릿/유사문서”가 섞여 품질 신호가 희석되는 구조적 실패가 발생한다.

> CLUSTER99*기술관련*검토문서

### 0.2 역할(Role) 혼합 금지

- 한 페이지는 오직 한 역할만 가진다.
- **Entry**는 랜딩(답+다음 클릭 3~5)이지 허브가 아니다. > CLUSTER99*기술관련*검토문서
- **Supporting**은 변형 쿼리를 “한 페이지 + 앵커 6–12”로 흡수한다(개별 변형 페이지 생성 금지). > CLUSTER99*기술관련*검토문서
- **Depth**는 체류시간/신뢰/RPM 만드는 “진짜 문서”다. > CLUSTER99*기술관련*검토문서
- **Glue-SEO**는 목록/인덱스 허브 1개만. > CLUSTER99*기술관련*검토문서
- **Glue-UX**는 도구/계산기이며 noindex,follow + sitemap 제외다. > CLUSTER99*기술관련*검토문서

### 0.3 Combination 페이지 생성 금지

- 금액×연도×지역 등 조합형 “개별 URL”을 대량 생성하는 순간, near-duplicate로 사이트 품질이 깨진다.
  > CLUSTER99*기술관련*검토문서
  > 앱*아이디어*필터링*룰*(Gate_System)

## 1. 라우팅/URL 규칙 (Routing Rules)

### 1.1 서브디렉토리 베이스 경로 고정

- 앱의 **Entry**는 반드시: `/inflation/`, `/cost-of-living/`, `/retirement/` … 같은 앱 베이스 루트에 위치
- 앱 내부에서 말하는 `/`는 도메인 루트가 아니라 앱 베이스를 의미한다.
  > CLUSTER99*기술관련*검토문서

### 1.2 트레일링 슬래시 규칙(권장 강제)

- “index 페이지(Entry/Supporting/Depth/Glue-SEO)”는 항상 trailing slash 유지
  - 예: `/retirement/healthcare-costs/`
- “동일 콘텐츠가 `/foo` 와 `/foo/` 둘 다 살아있으면” canonical/인덱싱 신호가 분산된다 → **금지**.

### 1.3 URL 네이밍 규칙

- URL은 **검색 의도(쿼리)**를 직접 반영하는 “주제형”으로
- 날짜/연도는 “필요한 경우에만” URL에 포함
  - `tax-bracket`처럼 “연도 자체가 핵심 의도”면 포함 가능
  - `inflation`처럼 “1980 자체가 클러스터 컨셉”이면 특정 depth에 포함 가능
- 슬러그는 2~5단어 선호(너무 길면 신뢰/가독성 하락)

## 2. 인덱싱/사이트맵/robots 규칙 (Indexability Rules)

### 2.1 역할별 robots 정책

| Role       | robots meta    | sitemap 포함 | 검색 노출 목적 |
| :--------- | :------------- | :----------- | :------------- |
| Entry      | index,follow   | 포함         | 대표 랜딩      |
| Supporting | index,follow   | 포함         | 변형 흡수      |
| Depth      | index,follow   | 포함         | 체류/신뢰      |
| Glue-SEO   | index,follow   | 포함         | 목록/허브      |
| Glue-UX    | noindex,follow | 제외         | UX 전환        |

- Glue-UX는 “크롤은 허용(링크 전달)”하지만 인덱스 금지가 핵심이다.
  > CLUSTER99*기술관련*검토문서

### 2.2 sitemap 생성 규칙 (하드 룰)

- sitemap에는 index 허용 페이지만 들어간다.
- **다음은 sitemap에 들어가면 즉시 실패 처리:**
  - noindex 페이지(Glue-UX)
  - placeholder/테스트 페이지
  - 실험용 라우트
- “noindex인데 sitemap 포함”은 신호가 꼬여 불필요한 크롤만 유발한다.
  > CLUSTER99*기술관련*검토문서

### 2.3 301 리다이렉트 정책

- “대량 301로 한번에 정리” 기본 금지
- 원칙: noindex-first → 트래픽 검증 후 선별 301
- 대량 리다이렉트는 soft-404/품질 하락 리스크가 크다.
  > CLUSTER99*기술관련*검토문서

## 3. Canonical 규칙 (절대 규칙)

### 3.1 Self-canonical 원칙

- 모든 index 페이지는 canonical이 자기 자신(절대 URL) 이어야 한다. > CLUSTER99*기술관련*검토문서
- Glue-UX도 canonical은 자기 자신(중복 canonical 금지). > CLUSTER99*기술관련*검토문서

### 3.2 Entry canonical 탈취 방지

- 과거 라우트(예: `/inflation/economy-1980/`)가 Entry canonical을 먹는 순간 즉시 망한다.
- Entry canonical은 항상 `/inflation/` 같은 앱 루트에 고정.
  > CLUSTER99*기술관련*검토문서

### 3.3 canonical 중복 자동 탐지

- 빌드 시 “서로 다른 URL인데 canonical이 동일”하면 배포 차단(게이트)
- 대표 사고: `calculator/amount-year-calculator`가 canonical 공유 등
  > CLUSTER99*기술관련*검토문서

## 4. 내부 링크 규칙 (Internal Linking Rules)

### 4.1 Entry 내부 링크 3–5개 강제

- Entry는 허브가 되면 구조 붕괴.
- Entry 내부의 클릭 가능한 링크(텍스트/카드/버튼 포함) 총합 3~5개로 제한.
  > CLUSTER99*기술관련*검토문서

**권장 4링크 템플릿**

- Supporting 1개
- Depth 2개
- Glue-SEO 1개

### 4.2 Supporting 앵커 6–12개 규격

- Supporting은 1페이지 + 앵커 6–12개로 변형 쿼리를 흡수한다.
  > CLUSTER99*기술관련*검토문서
  > 앱*아이디어*필터링*룰*(Gate_System)
- 앵커 섹션마다 “짧은 답 + 짧은 해석 + Depth 1개 링크”로 규격화.
  > CLUSTER99*기술관련*검토문서

### 4.3 Depth의 링크 구조

각 Depth는:

- Entry로 돌아가는 링크 1
- Supporting으로 가는 링크 1
- 관련 Depth 2~3 (너무 많으면 허브화)

### 4.4 Glue-SEO(목록 허브) 역할 고정

- “허브 역할”은 Entry가 아니라 Glue-SEO가 맡는다.
  > CLUSTER99*기술관련*검토문서

Glue-SEO에서:

- Depth들로 구조적으로 연결(목록/인덱스)
- Supporting으로 연결(변형 흡수 허브)

## 5. 콘텐츠 구조 규칙 (Content Architecture Rules)

### 5.1 Entry(랜딩) 필수 구성(1스크린)

Entry는 “첫 화면에서” 답이 끝나야 한다.

> CLUSTER99*기술관련*검토문서

**필수 블록:**

- Quick Answer(1~2문장)
- 결과/요약 카드(수치·핵심 포인트)
- 신뢰 소스 표기(출처/데이터 기준)
- Next clicks 3~5개 (고정)
  > CLUSTER99*기술관련*검토문서

**금지:**

- 긴 서론
- 링크 카드 무한 증식
- “모든 것을 여기서 다 보여주기”

### 5.2 Supporting(변형 흡수) 필수 구성

Supporting은 “얕은 글루”처럼 보이면 안 되고, 변형 질문을 흡수하는 “문서”여야 한다.

> CLUSTER99*기술관련*검토문서

**필수 블록:**

- 상단 Quick Navigation(앵커 링크)
- 앵커 섹션 6–12

**각 섹션 규격:**

- 1줄 답(단답)
- 1줄 해석(맥락)
- Depth 링크 1개(다음 행동)
- 하단 CTA는 Glue-UX(계산기)로 1개만(흐름 정리)
  > CLUSTER99*기술관련*검토문서

### 5.3 Depth(체류/신뢰) 필수 구성

Depth는 템플릿 기반으로 만들어도 되지만 문서 구조가 서로 달라야 near-duplicate를 피한다.

> CLUSTER99*기술관련*검토문서

**Depth 필수 구성 체크리스트:**

- 표/비교/차트 중 최소 1개
- “해석(왜 이런가?)” 섹션 최소 2개
- FAQ 3~6개(필요시 FAQPage schema)
- “Related next steps” 링크(2~4개)
- 출처/방법론(데이터 기준) 섹션

**금지:**

- 모든 Depth가 같은 섹션 순서/같은 문장 골격
- 수치만 있고 해석이 없는 “데이터 덤프”

### 5.4 Glue-UX(도구) 규칙

- Glue-UX는 UX 전환을 위한 도구다.
- **robots:** noindex,follow
- **sitemap:** 제외
- **canonical:** self
- **내부 링크:** 허용(사용자 흐름)

즉, **“도구는 전환용, SEO는 문서용”**을 구조로 강제한다.

> CLUSTER99*기술관련*검토문서

## 6. 메타/OG/Twitter/날짜/Schema 규칙 (SEO Head Spec)

모든 페이지는 “SeoHead” 공통 컴포넌트로 강제 구현.

> CLUSTER99*기술관련*검토문서

### 6.1 필수 메타 (전 페이지)

- `title`
- `meta description` (권장 155~160자 내 자동 truncate)
- `canonical` (절대경로)
- `robots` (Role 기반)

### 6.2 Open Graph (Index 페이지 전부)

- `og:title`, `og:description`, `og:url`, `og:image`, `og:type`
- 최소 세트 전 페이지 적용이 필수.
  > CLUSTER99*기술관련*검토문서

### 6.3 Twitter Card (Index 페이지 전부)

- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
  > CLUSTER99*기술관련*검토문서

### 6.4 datePublished / dateModified (고정값 금지)

- 모든 페이지가 동일한 날짜면 신뢰 신호가 떨어진다.
- 빌드 타임에 git commit time 또는 빌드 시각으로 주입한다.
  > CLUSTER99*기술관련*검토문서

### 6.5 Schema.org 적용 규칙

| Role                   | Schema 기본    | 조건부 추가                   |
| :--------------------- | :------------- | :---------------------------- |
| Entry/Supporting/Depth | Article        | FAQ 있으면 FAQPage            |
| Glue-SEO(목록)         | ItemList       | 항목이 많으면 pagination info |
| Glue-UX                | WebApplication | tool 설명/사용법 포함         |

- (키 포인트: “역할에 맞는 스키마만”, 과도한 스키마 남발 금지)

## 7. 데이터/템플릿 구현 규칙 (Template + JSON)

### 7.1 공통 템플릿 세트(권장 강제)

- `EntryPageTemplate`
- `SupportingAnchorTemplate`
- `DepthPageTemplate`
- `SeoHead`(Helmet 래퍼)
  > CLUSTER99*기술관련*검토문서

### 7.2 데이터 파일 구조

- `apps/{app}/src/data/*.json` 로 분리
- 표/카드/비교 섹션은 JSON에서 렌더링

### 7.3 Depth JSON 스키마 분화(near-duplicate 방지의 핵심)

Depth가 같은 템플릿을 쓰더라도, JSON 섹션 타입을 분화해서 “문서 구조”가 달라지게 만든다.

> CLUSTER99*기술관련*검토문서

**예:**

- A페이지: KeyTakeaways → Table → Interpretation → FAQ
- B페이지: Story(맥락) → ChartData → ScenarioTable → Myths → FAQ
- C페이지: ComparisonMatrix → Pros/Cons → Checklist → FAQ

**규칙:**

- 동일 Role(Depth)끼리 섹션 타입 배열이 완전히 동일하면 실패로 간주(게이트)

## 8. 품질 게이트 (CI에서 배포 차단)

“규칙을 문서로만 쓰면 무조건 깨진다.”
그래서 배포 전에 자동으로 막아야 한다.

> CLUSTER99*기술관련*검토문서

### 8.1 Gate가 막아야 하는 실패 유형 (필수)

- Entry 링크 3–5 초과 > CLUSTER99*기술관련*검토문서
- Supporting이 2페이지 이상 생성(1페이지 규칙 위반) > CLUSTER99*기술관련*검토문서
- Supporting 앵커 6–12 위반 > CLUSTER99*기술관련*검토문서
- Glue-UX가 index 또는 sitemap 포함 > CLUSTER99*기술관련*검토문서
- canonical 중복/탈취 > CLUSTER99*기술관련*검토문서
- near-duplicate(특히 Depth끼리) > CLUSTER99*기술관련*검토문서

### 8.2 Near-duplicate 판정 방식(권장)

- 단어 set Jaccard는 오탐/미탐이 많음
- 5-gram shingle + SimHash 권장
  > CLUSTER99*기술관련*검토문서

**비교 범위:**

- 동일 role끼리만(Depth vs Depth)
- Supporting은 1개라 비교 불필요
  > CLUSTER99*기술관련*검토문서

### 8.3 앱 아이디어 Gate(사전 기획 단계)

**새 앱은 아래 Gate 통과 못하면 생성 금지:**

- Supporting 앵커 6개 이상 불가하면 탈락
- Depth 5개 이상 분화 불가하면 탈락
- 계산기/도구가 핵심이고 문서가 보조면 탈락
- 광고 적합성(금융/교육/보험/주거 등) 낮으면 탈락
  > 앱*아이디어*필터링*룰*(Gate_System)

## 9. 운영 KPI/관측 규칙 (SEO를 “측정 가능한 시스템”으로)

### 9.1 Search Console에서 볼 “진짜 지표”

**Index coverage:**

- “유효 + 크롤됨” 비율
- “발견됨 – 아직 색인 생성 안 됨” 추이
  > CLUSTER99*기술관련*검토문서

### 9.2 행동 지표(Analytics)

- Pages/Session
- Avg engagement time(체류) > CLUSTER99*기술관련*검토문서
- Entry → Depth 클릭률(내부 전환) > CLUSTER99*기술관련*검토문서

### 9.3 AdSense

- RPM
- 페이지별 체류/스크롤과 RPM 상관(콘텐츠 구조 개선에 직결)

## 10. 릴리즈 체크리스트 (배포 전 10분 점검)

### 10.1 필수 통과 (체크 1개라도 실패면 배포 금지)

- [ ] 이 앱의 index 페이지 수가 6–12인지
- [ ] Entry 링크 총합 3–5인지(카드/버튼 포함)
- [ ] Supporting 1페이지인지 + 앵커 6–12인지
- [ ] Glue-UX 전부 noindex,follow인지
- [ ] sitemap에 noindex URL이 0개인지
- [ ] canonical이 전부 self인지(중복 0)
- [ ] OG/Twitter 전 페이지 적용됐는지
- [ ] datePublished/dateModified가 고정값 반복이 아닌지
  > CLUSTER99*기술관련*검토문서

## 11. 현재 앱 레지스트리 기준 “적용 범위” 명시

- 현재 monorepo의 앱/구조는 App Registry에 정의되어 있고, 각 앱은 이 룰을 그대로 따른다. > App_Registry
- 특히 `cost-of-living`은 "클러스터 설계 미정"으로 표기돼 있으므로, 위 규칙(Entry 링크 제한, Supporting/Glue 분리)을 기준으로 구조를 다시 잠그는 작업이 최우선이다. > App_Registry
  > CLUSTER99*기술관련*검토문서

## 12. High Engagement UI Spec (Visual Density for Maximum Dwell Time)

> Cluster99 Frontend Engagement Rules v2.0

### 12.0 목적

- 평균 체류시간(Avg Engagement Time) 극대화
- 스크롤 지속률 증가
- "글 읽는 페이지" → "탐색·해석·비교하는 페이지"로 전환
- AdSense RPM 상승에 기여하는 UX 구조 확보

본 규칙은 SEO 역할(Role) 구조를 유지하면서,
**의도적으로 시각적 요소 사용을 늘리는 것을 허용·권장**한다.

### 12.1 핵심 철학

#### 체류시간은 '정보량'이 아니라 '탐색 시간'에서 나온다

- 텍스트만 많은 페이지 → 빠르게 훑고 이탈
- 시각적 블록이 많은 페이지 →
  - 멈춤
  - 비교
  - 재확인
  - 스크롤 반복

👉 **체류시간은 "읽기"가 아니라 "머무름"의 결과**

### 12.2 UI 사용에 대한 기본 스탠스

| 항목 | 기존 | v2.0 (체류시간 기준) |
| :--- | :--- | :------------------- |
| UI Block 수 | 최소 충족 | **적극 사용 권장** |
| 박스 | 제한 | **의미만 있으면 허용** |
| 반복 | 금지 중심 | **패턴 반복 허용** |
| 목표 | 정보 전달 | **탐색 + 비교 + 체류** |

### 12.3 확장된 UI Block 세트 (Engagement 중심)

#### 12.3.1 Core Blocks (기본)

- **StatBlock**: 큰 숫자 + 보조 설명 (스크롤 멈춤 유도)
- **InfoCard**: 해석, 맥락, 배경 설명 ("왜 이런가?"에 답)
- **Callout**: 한 줄 요약 (인사이트 강조)
- **ComparisonTable**: 수치·조건·시나리오 비교

#### 12.3.2 Engagement Blocks (체류 전용)

- **ScenarioCard**: "If you are X…" 유형 (사용자 상황 대입 유도)
- **Timeline / StepBlock**: 변화 과정 시각화 (과거 → 현재 → 미래)
- **Myth vs Fact Block**: 오해/착각 분리 (반복 체류 유도)
- **Pros / Cons Grid**: 판단 지연 → 체류 증가
- **Visual Checklist**: 읽지 않고 체크하게 만드는 구조
- **Inline Chart / Bar**: 이미지 없이도 시각적 밀도 상승

#### 12.3.3 Navigation & Interaction Blocks

- Sticky Sub-Navigation
- Section Progress Indicator
- "Jump to Scenario" 버튼
- Related Insight Cards (2~4)

### 12.4 Role별 UI 사용 기준 (확장 버전)

#### 12.4.1 Entry Page (체류 유도형 랜딩)

**기존보다 허용 확장:**

- StatBlock: 2~3
- InfoCard / Callout: 1~2
- Mini Comparison Table: 1
- LinkCard: 3~5

**의도:** Entry에서 바로 이탈하지 않게 "조금 더 보게 만드는 구조"

#### 12.4.2 Supporting Page (탐색형 허브)

**강제 + 확장:**

- Sticky Anchor Navigation
- 각 앵커 섹션:
  - Callout 1
  - ScenarioCard 또는 StatBlock 1
  - LinkCard 1

**추가 허용:**

- 앵커 중간 요약용 Comparison Block
- "Most asked variations" 카드

#### 12.4.3 Depth Page (체류시간 핵심 페이지)

**최소 기준 (v2.0):**

- UI Block **5종 이상 필수**
- 전체 블록 수 제한 없음 (의미만 있으면 허용)

**권장 조합 예:**

- StatBlock → InfoCard
- ComparisonTable → ScenarioCard
- Myth vs Fact → Pros/Cons
- FAQAccordion → Related Insight Cards

**강제:**

- 스크롤 중간마다 시각적 전환 포인트 존재
- "텍스트-only 구간" 최대 2단락까지만 허용

### 12.5 반복 사용에 대한 재정의

#### 반복 = 나쁜 것이 아니다

- 동일 UI 패턴 반복 **허용**
- 단, 내용(데이터/상황/해석)은 달라야 함

**허용되는 반복:**

- ScenarioCard 여러 개
- StatBlock 연속 배치
- 비교 테이블 다중 등장

**금지되는 반복:**

- 내용만 바뀐 의미 없는 카드
- "박스화된 문단"의 기계적 반복

### 12.6 체류시간 최적화 체크리스트 (빌드 기준)

배포 전 반드시 확인:

- [ ] 스크롤 중 최소 5회 이상 "멈출 포인트" 존재
- [ ] 숫자/표/비교 블록 최소 3개
- [ ] 사용자가 자기 상황을 대입할 수 있는 섹션 존재
- [ ] Depth 페이지 UI Block 5종 이상
- [ ] 페이지 상·중·하 시각 밀도 차이가 존재

### 12.7 KPI 연결

이 규칙은 다음 지표를 직접 겨냥한다:

- Avg engagement time ↑
- Scroll depth ↑
- Pages / Session ↑
- RPM ↑ (광고 노출 기회 증가)

> 체류시간은 콘텐츠 품질의 결과가 아니라 **구조와 시각 리듬의 결과다.**

### 12.8 최종 원칙 요약

- UI 요소를 "아껴 쓰는 시대"는 끝났다
- Cluster99에서는:
  - **Depth = 읽는 문서 ❌**
  - **Depth = 탐색하는 리포트 ⭕**
- 더 많은 UI 요소 사용은 리스크가 아니라 **전략 자산**
