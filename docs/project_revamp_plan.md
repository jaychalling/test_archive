# Test-Archive.com 대규모 개편 및 개별화 프로젝트 (v1.1)

## 1. 개요 (Overview)
*   **프로젝트명**: test-archive.com 대규모 개편 및 개별화 프로젝트
*   **핵심 목표**: 통합 플랫폼 형태에서 개별 테스트 독립 페이지 구조로 전환
*   **디자인 전략**: Framer Motion 라이브러리를 활용하여 각 테스트별 맞춤형 UI/UX 및 화려한 인터랙션 구현
*   **UX 목표**: 테스트 간의 간섭을 제거하고 특정 테스트 키워드에 최적화된 독립적인 랜딩 페이지 제공
*   **참고 사이트**: [ricepuritytestcheck.com](https://ricepuritytestcheck.com/) - 단일 테스트가 전체 페이지를 차지하는 구조

## 2. 단계별 상세 계획 (Detailed Phases)

### Phase 0: 핵심 의사결정 확정 (Decision Making)
**목표**: 프로젝트 방향성을 확정하고 모호한 부분 제거

*   **0.1. 구조적 결정 사항**
    *   [ ] **홈페이지 처리 방안 결정**:
        *   Option A: 완전 제거 (각 테스트가 독립 랜딩)
        *   Option B: 단순 디렉토리/사이트맵 역할로 축소
        *   Option C: 특정 테스트(Rice Purity)로 리다이렉트
    *   [ ] **라우팅 방식 확정**: 서브디렉토리 방식 채택 (`/rice-purity-test`)
        *   이유: 도메인 권한(DA) 유지, Google이 동일 사이트로 인식
    *   [ ] **DB 필요 여부 확정**:
        *   현재: 정적 데이터(`questions.ts`, `data/`)로 운영 중
        *   DB 도입 시점: 결과 저장/통계/사용자 계정 기능 추가 시
    *   [ ] **파일럿 테스트 선정**: Rice Purity Test (가장 트래픽 높은 테스트로 시작)

*   **0.2. 성능 목표 설정 (Core Web Vitals)**
    *   [ ] Lighthouse Performance: **90점 이상**
    *   [ ] LCP (Largest Contentful Paint): **< 2.5초**
    *   [ ] CLS (Cumulative Layout Shift): **< 0.1**
    *   [ ] INP (Interaction to Next Paint): **< 200ms**

*   **0.3. 롤백 전략**
    *   [ ] 기존 `/test/[id]` 라우트는 유지하되 신규 URL로 301 리다이렉트
    *   [ ] 문제 발생 시 리다이렉트만 해제하여 즉시 복구 가능하도록 설계

### Phase 1: 시스템 아키텍처 재설계 (System Architecture Redesign)
**목표**: 디자인 자유도가 보장되는 확장 가능한 기술적 토대 마련

*   **1.1. 라우팅 구조 개편**
    *   [ ] 기존 `/test/[id]` 동적 라우팅 구조 분석
    *   [ ] **Micro-Page 전략 구현**:
        *   주요 테스트는 최상위 경로로 분리: `/rice-purity-test`, `/gender-role-test` 등
        *   각 테스트 폴더가 완전히 독립된 디자인 시스템 보유
    *   [ ] `next.config.js` rewrite/redirect 규칙 재정의
    *   [ ] 기존 URL(`/test/rice-purity`) → 신규 URL(`/rice-purity-test`) 301 리다이렉트 설정

*   **1.2. 데이터 관리 전략**
    *   [ ] **1차**: 기존 정적 데이터 구조 유지 (questions.ts, data/)
    *   [ ] 테스트별 독립적인 설정 파일 구조 정의:
        ```
        /rice-purity-test/
        ├── config.ts          # 테마, 메타데이터, 색상
        ├── questions.ts       # 문항 데이터
        ├── components/        # 전용 UI 컴포넌트
        └── assets/            # 이미지, 폰트
        ```
    *   [ ] **2차 (선택)**: 통계/분석 필요 시 Supabase 도입 검토

*   **1.3. Framer Motion 기반 애니메이션 시스템**
    *   [ ] Framer는 **프로토타이핑 도구**로만 사용 (디자인 시안 제작)
    *   [ ] 실제 구현은 **Framer Motion** 라이브러리로 직접 코딩
    *   [ ] 공통 애니메이션 variants 라이브러리 구축:
        *   페이지 전환 (page transitions)
        *   문항 슬라이드 (question slide)
        *   결과 reveal 애니메이션
    *   [ ] Headless UI + Framer Motion 조합으로 접근성 확보

### Phase 2: Framer Motion 기반 디자인 시스템 및 UI 개발 (Design & UI)
**목표**: 사용자의 체류 시간을 늘리는 화려하고 감각적인 개별 테스트 UI 완성

*   **2.1. 독립 디자인 컨셉 도출**
    *   [ ] **Rice Purity Test**: 깔끔하고 고전적인 체크리스트 스타일 + 현대적인 마이크로 인터랙션
    *   [ ] **IQ Test**: 전문적이고 신뢰감 있는 멘사(Mensa) 스타일, 블루/그레이 톤
    *   [ ] **성향 테스트**: 팝(Pop)하고 컬러풀한 디자인, 동적인 전환 효과

*   **2.2. 고퀄리티 인터랙션 구현**
    *   [ ] Framer Motion을 활용한 페이지 전환(Transition) 애니메이션 적용
    *   [ ] 문항 선택 시 즉각적인 피드백(Haptic/Visual) 효과 구현
    *   [ ] 스크롤 진행에 따른 프로그레스 바 및 배경 변화 효과
    *   [ ] 결과 페이지 숫자 카운트업 애니메이션

*   **2.3. 반응형 및 테마 최적화**
    *   [ ] 모바일 퍼스트(Mobile-First) 레이아웃 설계 (터치 타겟 최적화: 최소 44x44px)
    *   [ ] 각 테스트별 다크/라이트 모드 지원 또는 테스트 분위기에 강제된 전용 테마 적용

*   **2.4. 폰트 및 에셋 최적화 전략**
    *   [ ] 테스트별 전용 폰트 선정 (Google Fonts 또는 로컬 호스팅)
    *   [ ] `next/font`를 활용한 폰트 최적화 (FOUT/FOIT 방지)
    *   [ ] 폰트 서브셋팅: 사용하는 글리프만 포함하여 용량 절감
    *   [ ] 폰트 프리로드 전략: Critical 폰트만 preload

*   **2.5. 이미지 최적화 전략**
    *   [ ] `next/image` 컴포넌트 활용 (자동 WebP/AVIF 변환)
    *   [ ] 히어로 이미지: LCP 최적화를 위해 `priority` 속성 적용
    *   [ ] 배경/장식 이미지: lazy loading 적용
    *   [ ] 이미지 CDN 활용 검토 (Vercel Image Optimization 또는 Cloudinary)

### Phase 3: 콘텐츠 마이그레이션 및 개별화 (Migration & Individualization)
**목표**: 각 테스트가 하나의 독립된 브랜드로 기능할 수 있는 콘텐츠 환경 구축

*   **3.1. 파일럿 마이그레이션 (Rice Purity Test)**
    *   [ ] 기존 `/test/rice-purity` → `/rice-purity-test` 구조로 이관
    *   [ ] 독립 디자인 시스템 적용 및 테스트
    *   [ ] A/B 테스트: 기존 vs 신규 디자인 전환율 비교

*   **3.2. 순차적 마이그레이션**
    *   [ ] 파일럿 성공 후 나머지 테스트 순차 이관:
        1. Gender Role Test
        2. Cognitive Brain Test
        3. Body Age Test
        4. 기타
    *   [ ] 레거시 코드 정리 및 공통 컴포넌트 의존성 제거

*   **3.3. 결과 리포트 및 공유 기능 강화**
    *   [ ] `og:image` 동적 생성 기능 강화 (사용자 점수/결과가 포함된 썸네일 자동 생성)
    *   [ ] 결과 페이지 내 SNS 공유 버튼(Twitter, Kakao, Link Copy) 위치 최적화
    *   [ ] 결과 상세 분석 텍스트 고도화 (Cold read 기법 활용)

*   **3.4. 수익화 레이아웃 최적화**
    *   [ ] 테스트 진행 중엔 광고 노출 최소화, 결과 페이지에 관련성 높은 AdSense 배치
    *   [ ] 전면 광고 보다는 네이티브 광고 형태의 배치 테스트

### Phase 4: SEO 강화 및 마케팅 최적화 (SEO & Marketing)
**목표**: 검색 유입 극대화 및 테스트별 독립적 트래픽 확보

*   **4.1. 테크니컬 SEO**
    *   [ ] 각 독립 페이지별 `sitemap.xml` 우선순위 설정
    *   [ ] JSON-LD 구조화된 데이터(Schema Markup) 적용 ('Quiz', 'FAQ' 스키마 등)
    *   [ ] 메타 태그(Title, Description) 키워드 튜닝 (예: "2026 Purity Test", "Official Archive")

*   **4.2. 내부 링크 전략**
    *   [ ] 테스트 간 직접적인 연결 고리는 줄이되, 결과 페이지 하단에 '함께 많이 하는 테스트' 큐레이션 영역 구성
    *   [ ] 이탈률 방지를 위한 404 페이지 커스텀 및 추천 콘텐츠 제공

*   **4.3. 사용자 행동 분석**
    *   [ ] GA4 이벤트 태깅 세분화 (문항별 이탈률, 결과 페이지 체류 시간, 공유 버튼 클릭 수)
    *   [ ] Microsoft Clarity / Hotjar 등을 활용한 히트맵 분석 설정

### Phase 5: 최종 테스트 및 배포 (Finalization)
**목표**: 안정적인 서비스 전환 및 사용자 피드백 수집 기반 마련

*   **5.1. QA 및 성능 점검**
    *   [ ] Lighthouse 점수 측정 (Performance, Accessibility, SEO, Best Practices)
    *   [ ] 다양한 디바이스(iOS, Android, Tablet)에서의 렌더링 테스트
    *   [ ] SSL 인증서 적용 및 보안 헤더 설정

*   **5.2. 배포 및 리다이렉트**
    *   [ ] 구 URL -> 신규 독립 URL 301 리다이렉트 매핑
    *   [ ] Vercel 프로덕션 배포 및 모니터링
    *   [ ] 초기 사용자 피드백 수집을 위한 피드백 채널(Typeform, Email) 마련

## 3. 기술 스택 (Technical Stack)
*   **Design Tool**: Framer (UI Prototyping 전용, 코드 Export 사용 안 함)
*   **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion
*   **UI Library**: Headless UI (접근성), Radix UI (대안)
*   **Backend/Hosting**: Vercel (Serverless Functions, Edge Functions)
*   **Database**: 1차 없음 (정적 데이터) → 2차 Supabase (필요 시)
*   **Analytics**: Google Analytics 4, Google Search Console, Microsoft Clarity
*   **Performance**: Vercel Analytics, Web Vitals 모니터링

## 4. 일정 및 마일스톤 (Schedule & Milestones)

> ⚠️ **참고**: 아래 일정은 참고용이며, 실제 진행 속도에 따라 조정될 수 있습니다.

*   **Week 1**: Phase 0 의사결정 확정 + Phase 1 아키텍처 설계
*   **Week 2-3**: Phase 2 Rice Purity Test 디자인 리뉴얼 (파일럿)
*   **Week 4**: Phase 3 파일럿 마이그레이션 + A/B 테스트
*   **Week 5**: Phase 4 SEO 최적화 + Phase 5 배포
*   **Week 6+**: 나머지 테스트 순차 마이그레이션

## 5. 리스크 및 대응 방안 (Risk Management)

| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| SEO 순위 하락 | 높음 | 301 리다이렉트 철저히 적용, GSC 모니터링, 점진적 전환 |
| 성능 저하 (화려한 애니메이션) | 중간 | Core Web Vitals 목표치 설정, 애니메이션 `will-change` 최적화 |
| 마이그레이션 중 버그 | 중간 | 파일럿 테스트로 검증 후 확대, 롤백 전략 준비 |
| 일정 지연 | 중간 | 파일럿(Rice Purity) 완료를 1차 목표로 설정, 나머지는 순차 진행 |

## 6. 성공 지표 (Success Metrics)

*   **기술 지표**
    *   Lighthouse Performance: 90+ (현재 대비 개선)
    *   LCP < 2.5s, CLS < 0.1, INP < 200ms

*   **비즈니스 지표**
    *   테스트 완료율 (Completion Rate) 향상
    *   결과 페이지 공유율 향상
    *   평균 체류 시간 증가
    *   검색 유입 트래픽 유지/증가 (리뉴얼 후 3개월 기준)
