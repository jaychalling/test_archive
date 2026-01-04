Test-archive.com 개발 Rule v1.0
Test Portal Factory Rules (Structure-First)
0. 최상위 불변 규칙
0.1 목적은 단 하나

완주율(Completion) → 결과페이지 체류(Dwell) → 내부순환(Pages/Session) → 광고수익(RPM)
이 흐름을 깨는 모든 요소는 금지.

0.2 “테스트 중 광고” 금지

테스트 진행 UI(질문/선택/다음 버튼) 구간에 광고/팝업/인터스티셜 금지

테스트 페이지는 완주율이 KPI, 수익은 결과 페이지에서만 만든다.

0.3 개인정보 저장 금지(원칙)

이메일/전화번호/실명/로그인 요구 금지

쿠키 기반 최소 분석만 허용(익명)

0.4 도메인/SEO 분리 원칙

Test-archive.com은 엔터테인먼트 테스트 포털 전용

Cluster99와 서로 canonical/구조/사이트맵/내부 링크 강결합 금지

링크는 가능하되 “한두 개” 수준의 약결합만(브랜드/SEO 신호 섞지 않기)

1. 페이지 역할(Role) 시스템 (고정)
Role	URL	목적	인덱싱
Hub	/	사이트 진입/추천	index
Directory	/tests/	전체 테스트 목록	index
Test	/test/{slug}/	질문 응답(완주)	index (권장)
Result	/test/{slug}/result/	수익 본체(해석+광고+내부순환)	index
Legal	/privacy/, /terms/	정책	index

원칙: **Result가 사이트의 “콘텐츠”**이고 Test는 “UX”다.

2. URL & 라우팅 규칙
2.1 슬러그 규칙

{slug}는 테스트의 고유 ID (영문 소문자, 하이픈)

예: rice-purity-test, political-compass-test

2.2 트레일링 슬래시 강제

모든 페이지는 trailing slash 사용:

/test/rice-purity-test/

/test/rice-purity-test/result/

/foo와 /foo/ 동시 존재 금지(인덱싱 신호 분산)

2.3 쿼리스트링 금지(SEO/UX 혼선 방지)

결과를 ?score=...로 표현 금지

결과는 result 페이지에서 상태(state)로 렌더

점수/유형은 localStorage/sessionStorage로 전달하거나, URL hash(선택) 사용

이유: 결과 URL이 공유되어도 기본 결과 안내 페이지로 기능해야 함

3. 인덱싱/robots/사이트맵 규칙
3.1 robots 메타 정책
Role	robots
Hub/Directory/Test/Result/Legal	index,follow

테스트 페이지도 index 권장(브랜드 키워드 흡수용)

단, 테스트가 “거의 동일 UI만”이고 설명이 너무 얕다면 Test 페이지는 noindex,follow로 내릴 수 있음(옵션)

3.2 sitemap 규칙 (하드 룰)

sitemap에는 아래만 포함:

Hub /

Directory /tests/

모든 Test /test/{slug}/

모든 Result /test/{slug}/result/

Legal

제외:

실험/개발 라우트

프리뷰/스테이징

파라미터 URL

3.3 canonical 규칙

모든 페이지 self-canonical(절대 URL)

Test와 Result가 서로 canonical 먹는 구조 금지

4. 내부 링크 규칙 (수익을 만드는 핵심)
4.1 Result 페이지 링크 규칙(강제)

Result는 반드시:

Related Tests: 3~5개

Directory로 가는 링크 1개

Hub로 가는 링크 1개(옵션)

4.2 Test 페이지 링크 제한

Test 페이지에는 방해되는 링크 최소화:

Hub/Directory 링크 1개 정도만 허용

“다른 테스트 추천”은 **완주 이후(Result)**로 미룸

4.3 Directory 링크 규칙

/tests/는 테스트 카드 리스트

카드 클릭 → Test 페이지로

(옵션) “바로 결과 해석 보기” 같은 우회 링크 금지

5. Result Page 콘텐츠 규격 (절대 규칙)

결과페이지는 “짧으면 실패”.
결과페이지가 곧 사업이다.

5.1 결과페이지 섹션 순서 (변경 금지)

Hero Result

점수/유형 크게

1스크린에 핵심 결과 노출

Range / Percentile

What This Typically Means (핵심 해석 2~3문단)

Common Traits / Behaviors (불릿 5~8개)

“People with this result often wonder…” (FAQ 3~6개)

Share Block (Copy + Social)

Related Tests 3~5

Ads 시작 (관련 테스트 아래부터)

5.2 길이/밀도 최소 기준

결과페이지 텍스트: 800~1,200 단어(영문 기준)

“스크롤 멈춤 포인트” 최소 6개(카드/리스트/FAQ 블록)

광고는 “해석 구간”을 끊지 말 것

5.3 문장 톤 규칙

단정 금지(“you are” 남발 금지)

완화 표현 사용: typically, often, tend to

위험한 해석(정신질환/의학적 판단) 금지

6. Test Page UX 규칙 (완주율을 위해)
6.1 질문 수 가이드(권장)

최적 구간: 20~60문항

100문항 이상은 완주율 급락 가능 → 진행바/세션 저장 필수

6.2 UI 필수 요소

Progress bar (필수)

“Save & continue later” (자동 저장, 필수)

Back 버튼 허용(옵션)

키보드/모바일 접근성 고려

6.3 중간 방해요소 금지

팝업

뉴스레터

광고

과도한 상단 네비

7. 광고(AdSense) 배치 룰
7.1 배치 원칙

Test 페이지: 광고 0

Result 페이지:

첫 광고: Related Tests 아래

추가 광고: 스크롤 중단부 1개 + 하단 1개(최대 3개 권장)

Hub/Directory:

목록 중간 1개 정도(과하면 UX 깨짐)

7.2 금지 패턴

결과 Hero 바로 밑 광고(이탈 유발)

해석 문단 중간에 광고 끼워넣기(읽기 흐름 파괴)

8. 데이터 스키마 규칙 (템플릿+JSON 공장화)
8.1 파일 구조 예시
src/
  routes/
    index.tsx
    tests/index.tsx
    test/[slug]/index.tsx
    test/[slug]/result.tsx
  data/
    tests/
      rice-purity-test.json
      political-compass-test.json
  components/
    SeoHead.tsx
    TestRunner.tsx
    ResultRenderer.tsx
    ShareBlock.tsx
    RelatedTests.tsx

8.2 Test JSON 스키마(권장)
{
  "id": "rice-purity-test",
  "title": "Rice Purity Test",
  "description": "Take the Rice Purity Test and see your score.",
  "questions": [
    { "id": 1, "text": "Held hands romantically?" , "weight": 1 }
  ],
  "scoring": { "type": "sum", "maxScore": 100, "direction": "lower_is_more_experienced" },
  "resultBands": [
    {
      "min": 0,
      "max": 20,
      "label": "Very experienced",
      "percentileHint": "Top ~10%",
      "meaning": ["...","..."],
      "traits": ["...","..."],
      "faqs": [{"q":"...","a":"..."}]
    }
  ],
  "related": ["bdsm-test", "moral-alignment-test", "love-language-test"]
}

8.3 결과 밴드 강제

모든 테스트는 resultBands 최소 4개 이상

밴드마다:

meaning 2~4개 문단 블록

traits 5~8

faqs 3~6

목적: 결과페이지 “상세함”을 데이터로 강제

9. SEO Head Spec (최소만 정확히)
9.1 메타 필수

title: {Test Name} | Test Archive

description: “Take the {Test Name} and see your result.”

canonical: self

og, twitter 카드 필수(공유형 사업이므로)

9.2 스키마(과하지 않게)

Test 페이지: WebPage + BreadcrumbList 정도

Result 페이지: Article 느낌으로 쓰지 말고(오해 소지), WebPage 유지 권장

FAQ 섹션이 실제로 있으면 FAQPage 가능(선택)

10. 분석/관측 규칙 (KPI가 다른 사업이다)
10.1 이벤트 트래킹(필수)

test_start

question_answered (샘플링 가능)

test_complete

result_view

share_click

related_test_click

10.2 핵심 KPI 정의

Completion Rate = test_complete / test_start

Result Dwell = 결과페이지 평균 체류

Pages/Session = 내부순환 지표

RPM = 최종 수익 지표

11. 성능 규칙 (모바일이 본체)
11.1 Core Web Vitals 목표

LCP 빠르게(이미지 최소)

INP 낮게(버튼/선택 반응 즉시)

CLS 0에 가깝게(광고 로딩으로 흔들림 방지)

11.2 리소스 정책

폰트/아이콘 최소

결과페이지 텍스트는 서버/정적 렌더 선호

12. 품질 게이트 (CI에서 배포 차단)

배포 전에 자동 검사로 “사람이 실수할 구간”을 막는다.

12.1 하드 실패 조건

Test 페이지에 광고 컴포넌트 포함 → 실패

Result 섹션 순서 누락/변경 → 실패

resultBands 4개 미만 → 실패

traits 5개 미만/FAQ 3개 미만 → 실패

related 3개 미만/5개 초과 → 실패

sitemap에 비표준 라우트 포함 → 실패

canonical 누락/중복 → 실패

trailing slash 규칙 위반 → 실패

12.2 권장 린트

결과페이지 단어 수 800 미만 경고

질문 수 10 미만 경고(테스트로서 약함)

OG 이미지 누락 경고

13. 운영 안전장치(리스크 방지)
13.1 금지 주제 리스트(자동 차단 권장)

의료 진단(ADHD, depression “diagnosis” 류)

법률 조언

특정 인물 비난/정치 선동

혐오/차별 유도 테스트

13.2 면책 문구(하단 고정)

“For entertainment purposes only.”

“Not a medical/psychological diagnosis.”

14. “공장 생산” 프로세스(고정)

테스트 선정(Gate 통과)

JSON 작성(questions + resultBands + related)

자동 렌더(템플릿)

CI 게이트 통과

배포

KPI 모니터링(완주율/결과체류/내부순환/RPM)

낮은 테스트는 related에서 제외하거나 교체(삭제 비용 0)

15. 최종 요약

Test는 광고가 없는 완주 UX

Result가 콘텐츠/수익 본체

내부순환은 Result에서만 설계

데이터(JSON)로 결과페이지의 “상세함”을 강제

CI 게이트로 규칙 위반을 배포 전에 차단