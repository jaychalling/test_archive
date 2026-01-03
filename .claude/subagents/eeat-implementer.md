# E-E-A-T Implementer

> Gate 2-A 실행 표준 - E-E-A-T(경험·전문성·권위·신뢰) 구현 전문 에이전트

## 목적

Gate 2(E-E-A-T 구현 가능성)를 통과한 모든 앱에 **실행 표준**을 적용한다.
E-E-A-T는 "의도"가 아니라 **"구현"**으로 증명해야 한다.

## 트리거 명령어

```bash
E-E-A-T 적용해줘! cluster="inflation"
신뢰 섹션 추가해줘! cluster="cost-of-living"
Gate 2-A 검증해줘! cluster="retirement"
```

---

## E-E-A-T 핵심 개념

### Trust가 최상위

```
┌─────────────────────────────────────────────────────────────────┐
│                        TRUST (신뢰)                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              EXPERTISE (전문성)                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │          AUTHORITATIVENESS (권위)                   │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │        EXPERIENCE (경험)                      │  │  │  │
│  │  │  └───────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

- **Trust**가 모든 것의 기반
- 단순 정보 요약 < **해석 + 맥락 + 판단 근거**
- "AI가 쓸 수 있는 글" < **"AI가 인용할 수 있는 글"**

---

## Entry 페이지 필수 구성

> Entry 페이지 하단에 반드시 포함해야 할 3개 블록

### 1. Data Sources (최소 2개 이상)

```tsx
// components/Shared/DataSources.tsx

interface Source {
  name: string;
  dataset: string;
  url: string;
}

interface DataSourcesProps {
  sources: Source[];
}

export function DataSources({ sources }: DataSourcesProps) {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
        Data Sources
      </h3>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-green-500">✓</span>
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {source.name}
              </a>
              <p className="text-sm text-gray-500">{source.dataset}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### 표준 형식

```json
{
  "sources": [
    {
      "name": "U.S. Bureau of Labor Statistics",
      "dataset": "CPI-U (1913-2024)",
      "url": "https://www.bls.gov/cpi/"
    },
    {
      "name": "Federal Reserve Economic Data",
      "dataset": "FRED Database",
      "url": "https://fred.stlouisfed.org/"
    }
  ]
}
```

#### 허용되는 출처 유형

- ✅ 정부 통계 (BLS, Census, IRS, SSA)
- ✅ 중앙은행 (Federal Reserve, FRED)
- ✅ 대형 리서치 기관 (Pew, Gallup)
- ✅ 학술 기관 (NBER, 대학 연구소)
- ❌ 일반 블로그 인용
- ❌ 출처 없는 요약
- ❌ Wikipedia (2차 확인용으로만)

---

### 2. Methodology (5줄 내외)

```tsx
// components/Shared/Methodology.tsx

interface MethodologyProps {
  content: string;
  assumptions?: string[];
}

export function Methodology({ content, assumptions }: MethodologyProps) {
  return (
    <div className="mt-6 p-6 bg-blue-50 rounded-lg">
      <h3 className="text-sm font-semibold text-blue-800 uppercase mb-3">
        Methodology
      </h3>
      <p className="text-gray-700 leading-relaxed">{content}</p>

      {assumptions && assumptions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-blue-100">
          <h4 className="text-xs font-medium text-blue-600 mb-2">
            Key Assumptions
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {assumptions.map((assumption, index) => (
              <li key={index}>• {assumption}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

#### 표준 형식

```json
{
  "methodology": "We calculate purchasing power using the CPI-U (Consumer Price Index for All Urban Consumers) with base year 1982-84=100. Annual inflation rates are year-over-year percentage changes. All figures are adjusted for compounding.",
  "assumptions": [
    "CPI-U represents average urban consumer spending patterns",
    "Base year 1982-84 = 100 as defined by BLS",
    "Year-over-year changes reflect December-to-December comparison"
  ]
}
```

#### 규칙

- 최소 3줄, 최대 7줄
- 수식 전체 나열 불필요, **논리 흐름 필수**
- 마케팅 문장 금지
- 기준 연도/기준 수치 명시

---

### 3. Last Updated

```tsx
// components/Shared/LastUpdated.tsx

interface LastUpdatedProps {
  date: string; // YYYY-MM-DD 형식
  updateFrequency?: string;
}

export function LastUpdated({ date, updateFrequency }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>Last updated: {formattedDate}</span>
      {updateFrequency && (
        <span className="text-gray-400">• {updateFrequency}</span>
      )}
    </div>
  );
}
```

#### 규칙

- 날짜 필수 명시 (YYYY-MM-DD)
- "Updated when new data is available" 같은 추상 문구 금지
- 자동 업데이트 아니어도 됨

---

## Depth 페이지 필수 구성

> 모든 Depth 페이지에는 최소 1개 이상 포함

### 옵션 A: Calculation / Formula Box

```tsx
// components/Depth/CalculationBox.tsx

interface Step {
  label: string;
  formula?: string;
  result?: string;
}

interface CalculationBoxProps {
  title: string;
  steps: Step[];
  baseYear?: string;
  baseValue?: string;
}

export function CalculationBox({ title, steps, baseYear, baseValue }: CalculationBoxProps) {
  return (
    <div className="my-6 p-6 bg-gray-900 text-white rounded-lg">
      <h3 className="text-lg font-bold mb-4">{title}</h3>

      {baseYear && baseValue && (
        <div className="mb-4 p-3 bg-gray-800 rounded text-sm">
          <span className="text-gray-400">Base:</span> {baseYear} = {baseValue}
        </div>
      )}

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-6 h-6 flex items-center justify-center bg-blue-600 rounded-full text-sm">
              {index + 1}
            </span>
            <div>
              <span className="text-gray-300">{step.label}</span>
              {step.formula && (
                <code className="ml-2 px-2 py-1 bg-gray-800 rounded text-green-400">
                  {step.formula}
                </code>
              )}
              {step.result && (
                <span className="ml-2 text-yellow-400">= {step.result}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 옵션 B: Assumptions Box

```tsx
// components/Depth/AssumptionsBox.tsx

interface Assumption {
  label: string;
  value: string;
  note?: string;
}

interface AssumptionsBoxProps {
  title: string;
  assumptions: Assumption[];
  scenario?: string;
}

export function AssumptionsBox({ title, assumptions, scenario }: AssumptionsBoxProps) {
  return (
    <div className="my-6 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
      <h3 className="text-lg font-bold text-yellow-800 mb-2">{title}</h3>

      {scenario && (
        <p className="text-sm text-yellow-700 mb-4 italic">
          Scenario: {scenario}
        </p>
      )}

      <table className="w-full text-sm">
        <tbody>
          {assumptions.map((item, index) => (
            <tr key={index} className="border-b border-yellow-200 last:border-0">
              <td className="py-2 font-medium text-gray-700">{item.label}</td>
              <td className="py-2 text-right text-gray-900">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-xs text-yellow-600">
        ⚠️ These assumptions may not reflect your specific situation
      </p>
    </div>
  );
}
```

---

## Trust Badge 컴포넌트

```tsx
// components/Shared/TrustBadge.tsx

interface TrustBadgeProps {
  sources: number;
  lastUpdated: string;
  methodology: boolean;
}

export function TrustBadge({ sources, lastUpdated, methodology }: TrustBadgeProps) {
  return (
    <div className="flex flex-wrap gap-3 my-4">
      {sources >= 2 && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {sources} Verified Sources
        </span>
      )}

      {lastUpdated && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updated {new Date(lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      )}

      {methodology && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Methodology Documented
        </span>
      )}
    </div>
  );
}
```

---

## 업데이트 책임 명시 (권장)

```tsx
// components/Shared/UpdateResponsibility.tsx

interface UpdateResponsibilityProps {
  maintainer: string;
  frequency: string;
  nextUpdate?: string;
}

export function UpdateResponsibility({ maintainer, frequency, nextUpdate }: UpdateResponsibilityProps) {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
      <p>
        <strong>Maintained by:</strong> {maintainer}
      </p>
      <p>
        <strong>Update frequency:</strong> {frequency}
      </p>
      {nextUpdate && (
        <p>
          <strong>Next scheduled update:</strong> {nextUpdate}
        </p>
      )}
    </div>
  );
}
```

---

## Gate 2-A 검증 체크리스트

### Entry 페이지

- [ ] Data Sources 섹션 존재
- [ ] 최소 2개 이상 서로 다른 출처
- [ ] 외부 링크로 명시
- [ ] Methodology 섹션 존재 (3-7줄)
- [ ] 논리 흐름 설명 포함
- [ ] Last Updated 날짜 (YYYY-MM-DD)

### Depth 페이지

- [ ] Calculation Box 또는 Assumptions Box 중 1개 이상
- [ ] 단순 서술로만 끝나지 않음
- [ ] 기준 연도/수치 명시

### 전체

- [ ] 마케팅 문장 없음
- [ ] "출처 없는 요약" 없음
- [ ] 책임 회피형 문장 반복 없음

---

## YMYL 주제 강화 규칙

세금/은퇴/금융/건강/법률 주제는 추가 규칙 적용:

### 필수 추가 요소

1. **면책 조항 (Disclaimer)**

```tsx
<div className="p-4 bg-red-50 border-l-4 border-red-400 text-sm text-red-700">
  <strong>Disclaimer:</strong> This information is for educational purposes only
  and should not be considered financial/legal/medical advice. Consult a qualified
  professional for your specific situation.
</div>
```

2. **자격 표시 (Qualifications)**

```tsx
<div className="text-sm text-gray-500">
  <strong>Reviewed by:</strong> [Credential if applicable]
</div>
```

3. **업데이트 추적**

- 법률/세율 변경 시 즉시 업데이트
- 변경 이력 표시

---

## 출력: E-E-A-T 구현 보고서

```
┌─────────────────────────────────────────────────────────────────┐
│ E-E-A-T IMPLEMENTATION REPORT                                    │
├─────────────────────────────────────────────────────────────────┤
│ Cluster: {클러스터명}                                            │
│ Date: {날짜}                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ENTRY PAGE                                                       │
│ ─────────────────────────────────────────────────────────────── │
│ [✓] Data Sources: 2 sources verified                            │
│ [✓] Methodology: 5 lines, logic flow documented                 │
│ [✓] Last Updated: 2024-01-15                                    │
│                                                                 │
│ DEPTH PAGES                                                      │
│ ─────────────────────────────────────────────────────────────── │
│ [✓] purchasing-power: CalculationBox implemented                │
│ [✓] wages: AssumptionsBox implemented                           │
│ [✓] housing: CalculationBox implemented                         │
│ [✓] education: AssumptionsBox implemented                       │
│ [✓] million-case: CalculationBox implemented                    │
│ [✓] cpi-explained: CalculationBox implemented                   │
│                                                                 │
│ TRUST INDICATORS                                                 │
│ ─────────────────────────────────────────────────────────────── │
│ [✓] TrustBadge component on all pages                           │
│ [✓] UpdateResponsibility on Entry                               │
│ [✓] No marketing language detected                              │
│                                                                 │
│ GATE 2-A RESULT: ✅ PASS                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
