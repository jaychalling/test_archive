# Role Page Generator

> Query-Driven SEO 역할별 페이지 생성 전문 에이전트

## 목적

cluster-architect가 설계한 클러스터 구조에 따라 **역할(Role)별 페이지를 생성**한다.

## 트리거 명령어

```bash
페이지 생성해줘! cluster="inflation"
Entry 만들어줘! cluster="cost-of-living"
Depth 페이지 생성해줘! cluster="retirement"
```

---

## 역할별 템플릿 구조

### 디렉토리 구조

```
frontend/app/{cluster-name}/
├── page.tsx                    # Entry
├── config.ts                   # 클러스터 설정
├── layout.tsx                  # 공통 레이아웃
├── components/
│   ├── Entry/
│   │   ├── QuickAnswer.tsx
│   │   ├── ResultCard.tsx
│   │   ├── TrustBadge.tsx
│   │   └── NextClicks.tsx
│   ├── Supporting/
│   │   ├── AnchorNav.tsx
│   │   └── AnchorSection.tsx
│   ├── Depth/
│   │   ├── StatBlock.tsx
│   │   ├── InfoCard.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── ScenarioCard.tsx
│   │   ├── MythFact.tsx
│   │   ├── Timeline.tsx
│   │   ├── Checklist.tsx
│   │   └── FAQAccordion.tsx
│   └── Shared/
│       ├── SeoHead.tsx
│       ├── DataSources.tsx
│       ├── Methodology.tsx
│       └── LastUpdated.tsx
├── supporting/
│   └── page.tsx
├── {depth-slug}/
│   └── page.tsx                # 각 Depth 페이지
├── guide/
│   └── page.tsx                # Glue-SEO
├── calculator/
│   └── page.tsx                # Glue-UX (noindex)
├── data/
│   ├── config.json
│   ├── entry.json
│   ├── supporting.json
│   ├── depths/
│   │   ├── {depth-1}.json
│   │   ├── {depth-2}.json
│   │   └── ...
│   └── faq.json
└── og/
    └── og-template.tsx
```

---

## Entry Page 생성

### page.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/page.tsx

import { Metadata } from 'next';
import { generateClusterMetadata } from '@/utils/metadata';
import EntryClient from './EntryClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateClusterMetadata({
    cluster: '{cluster-name}',
    role: 'entry',
  });
}

export default function EntryPage() {
  return <EntryClient />;
}
```

### EntryClient.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/EntryClient.tsx

'use client';

import { QuickAnswer } from './components/Entry/QuickAnswer';
import { ResultCard } from './components/Entry/ResultCard';
import { TrustBadge } from './components/Entry/TrustBadge';
import { NextClicks } from './components/Entry/NextClicks';
import { SeoHead } from './components/Shared/SeoHead';
import entryData from './data/entry.json';

export default function EntryClient() {
  return (
    <>
      <SeoHead
        role="entry"
        robots="index,follow"
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Answer - 1스크린에서 답 완료 */}
        <QuickAnswer
          answer={entryData.quickAnswer}
        />

        {/* Result Card - 수치/핵심 포인트 */}
        <ResultCard
          stats={entryData.stats}
        />

        {/* Trust Badge - 출처/데이터 기준 */}
        <TrustBadge
          source={entryData.source}
          lastUpdated={entryData.lastUpdated}
        />

        {/* Next Clicks - 3-5개 고정 */}
        <NextClicks
          links={entryData.nextClicks}
        />
      </main>
    </>
  );
}
```

### entry.json 템플릿

```json
{
  "quickAnswer": "$1 in 1980 is equivalent to $3.85 in 2024 purchasing power.",
  "stats": [
    { "label": "Inflation Rate", "value": "285%", "icon": "📈" },
    { "label": "Annual Average", "value": "3.2%", "icon": "📊" },
    { "label": "Years Tracked", "value": "44", "icon": "📅" }
  ],
  "source": {
    "name": "U.S. Bureau of Labor Statistics",
    "dataset": "CPI-U (1913-2024)",
    "url": "https://www.bls.gov/cpi/"
  },
  "lastUpdated": "2024-01-15",
  "nextClicks": [
    { "label": "Calculate Other Amounts", "href": "/inflation/amounts/", "role": "supporting" },
    { "label": "Purchasing Power Explained", "href": "/inflation/purchasing-power/", "role": "depth" },
    { "label": "Housing Costs Then vs Now", "href": "/inflation/housing/", "role": "depth" },
    { "label": "All Topics", "href": "/inflation/guide/", "role": "glue-seo" }
  ]
}
```

---

## Supporting Page 생성

### page.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/supporting/page.tsx

import { Metadata } from 'next';
import { generateClusterMetadata } from '@/utils/metadata';
import SupportingClient from './SupportingClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateClusterMetadata({
    cluster: '{cluster-name}',
    role: 'supporting',
  });
}

export default function SupportingPage() {
  return <SupportingClient />;
}
```

### SupportingClient.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/supporting/SupportingClient.tsx

'use client';

import { AnchorNav } from '../components/Supporting/AnchorNav';
import { AnchorSection } from '../components/Supporting/AnchorSection';
import { SeoHead } from '../components/Shared/SeoHead';
import supportingData from '../data/supporting.json';

export default function SupportingClient() {
  return (
    <>
      <SeoHead
        role="supporting"
        robots="index,follow"
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Sticky Anchor Navigation */}
        <AnchorNav anchors={supportingData.anchors} />

        {/* Anchor Sections (6-12개) */}
        {supportingData.anchors.map((anchor, index) => (
          <AnchorSection
            key={anchor.id}
            id={anchor.id}
            title={anchor.title}
            answer={anchor.answer}
            interpretation={anchor.interpretation}
            depthLink={anchor.depthLink}
          />
        ))}

        {/* Bottom CTA - Glue-UX로 연결 */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-4">Need a custom calculation?</p>
          <a
            href="/inflation/calculator/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Use Our Calculator
          </a>
        </div>
      </main>
    </>
  );
}
```

### supporting.json 템플릿

```json
{
  "title": "Inflation by Amount - Calculate Any Value",
  "description": "See how different amounts from 1980 compare to today's value.",
  "anchors": [
    {
      "id": "100-in-1980",
      "title": "$100 in 1980",
      "answer": "$100 in 1980 is equivalent to $385 today.",
      "interpretation": "That's nearly 4x the original value due to cumulative inflation.",
      "depthLink": {
        "label": "Learn about purchasing power",
        "href": "/inflation/purchasing-power/"
      }
    },
    {
      "id": "500-in-1980",
      "title": "$500 in 1980",
      "answer": "$500 in 1980 is equivalent to $1,925 today.",
      "interpretation": "A week's salary in 1980 would need to be nearly $2,000 now.",
      "depthLink": {
        "label": "See wage comparisons",
        "href": "/inflation/wages/"
      }
    }
  ]
}
```

---

## Depth Page 생성

### page.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/{depth-slug}/page.tsx

import { Metadata } from 'next';
import { generateClusterMetadata } from '@/utils/metadata';
import DepthClient from './DepthClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateClusterMetadata({
    cluster: '{cluster-name}',
    role: 'depth',
    slug: '{depth-slug}',
  });
}

export default function DepthPage() {
  return <DepthClient />;
}
```

### DepthClient.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/{depth-slug}/DepthClient.tsx

'use client';

import { StatBlock } from '../components/Depth/StatBlock';
import { InfoCard } from '../components/Depth/InfoCard';
import { ComparisonTable } from '../components/Depth/ComparisonTable';
import { FAQAccordion } from '../components/Depth/FAQAccordion';
import { DataSources } from '../components/Shared/DataSources';
import { Methodology } from '../components/Shared/Methodology';
import { LastUpdated } from '../components/Shared/LastUpdated';
import { RelatedLinks } from '../components/Shared/RelatedLinks';
import { SeoHead } from '../components/Shared/SeoHead';
import depthData from '../data/depths/{depth-slug}.json';

export default function DepthClient() {
  return (
    <>
      <SeoHead
        role="depth"
        robots="index,follow"
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* StatBlock - 큰 숫자 */}
        <StatBlock
          value={depthData.statBlock.value}
          label={depthData.statBlock.label}
          subtext={depthData.statBlock.subtext}
        />

        {/* InfoCard - 해석 */}
        <InfoCard
          title={depthData.infoCard.title}
          content={depthData.infoCard.content}
        />

        {/* ComparisonTable - 비교 표 */}
        <ComparisonTable
          headers={depthData.table.headers}
          rows={depthData.table.rows}
        />

        {/* Additional Interpretation */}
        <InfoCard
          title={depthData.interpretation.title}
          content={depthData.interpretation.content}
        />

        {/* FAQ - 3-6개 */}
        <FAQAccordion
          items={depthData.faq}
        />

        {/* E-E-A-T Section */}
        <div className="mt-12 space-y-6 border-t pt-8">
          <DataSources sources={depthData.sources} />
          <Methodology content={depthData.methodology} />
          <LastUpdated date={depthData.lastUpdated} />
        </div>

        {/* Related Links - 2-4개 */}
        <RelatedLinks links={depthData.relatedLinks} />
      </main>
    </>
  );
}
```

### depth.json 템플릿

```json
{
  "title": "Purchasing Power Explained - How $1 Has Changed",
  "statBlock": {
    "value": "285%",
    "label": "Cumulative Inflation Since 1980",
    "subtext": "Based on CPI-U data from the Bureau of Labor Statistics"
  },
  "infoCard": {
    "title": "What This Means For You",
    "content": "In 1980, a family earning $20,000 had the same purchasing power as a family earning $77,000 today. This means your salary needs to nearly quadruple just to maintain the same standard of living."
  },
  "table": {
    "headers": ["Year", "$1 Value", "Annual Rate", "Cumulative"],
    "rows": [
      ["1980", "$1.00", "-", "-"],
      ["1990", "$1.93", "5.4%", "93%"],
      ["2000", "$2.53", "3.4%", "153%"],
      ["2010", "$3.06", "1.6%", "206%"],
      ["2020", "$3.42", "1.2%", "242%"],
      ["2024", "$3.85", "3.2%", "285%"]
    ]
  },
  "interpretation": {
    "title": "Why Purchasing Power Matters",
    "content": "Understanding purchasing power helps you make better financial decisions. When negotiating salary, planning retirement, or evaluating investments, you need to account for inflation's erosion of value."
  },
  "faq": [
    {
      "question": "What is purchasing power?",
      "answer": "Purchasing power measures how much goods and services you can buy with a given amount of money. As prices rise due to inflation, the same dollar buys less."
    },
    {
      "question": "How is CPI calculated?",
      "answer": "The Consumer Price Index tracks prices of a basket of common goods and services. The Bureau of Labor Statistics surveys thousands of prices monthly."
    }
  ],
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
  ],
  "methodology": "We calculate purchasing power using the CPI-U (Consumer Price Index for All Urban Consumers) with base year 1982-84=100. Annual inflation rates are year-over-year percentage changes.",
  "lastUpdated": "2024-01-15",
  "relatedLinks": [
    { "label": "Back to Entry", "href": "/inflation/" },
    { "label": "Calculate Amounts", "href": "/inflation/amounts/" },
    { "label": "Wage Comparisons", "href": "/inflation/wages/" },
    { "label": "Housing Costs", "href": "/inflation/housing/" }
  ]
}
```

---

## Glue-SEO Page 생성

### page.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/guide/page.tsx

import { Metadata } from 'next';
import { generateClusterMetadata } from '@/utils/metadata';
import GuidePage from './GuidePage';

export async function generateMetadata(): Promise<Metadata> {
  return generateClusterMetadata({
    cluster: '{cluster-name}',
    role: 'glue-seo',
  });
}

export default function GuidePageWrapper() {
  return <GuidePage />;
}
```

### GuidePage.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/guide/GuidePage.tsx

import { SeoHead } from '../components/Shared/SeoHead';
import guideData from '../data/guide.json';

export default function GuidePage() {
  return (
    <>
      <SeoHead
        role="glue-seo"
        robots="index,follow"
        schema="ItemList"
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{guideData.title}</h1>
        <p className="text-gray-600 mb-8">{guideData.description}</p>

        <nav className="space-y-4">
          {guideData.items.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="block p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <span className="text-xs text-blue-600">{item.role}</span>
                </div>
              </div>
            </a>
          ))}
        </nav>
      </main>
    </>
  );
}
```

---

## Glue-UX Page 생성 (noindex)

### page.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/calculator/page.tsx

import { Metadata } from 'next';
import CalculatorClient from './CalculatorClient';

// Glue-UX는 noindex
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
```

### CalculatorClient.tsx 템플릿

```tsx
// frontend/app/{cluster-name}/calculator/CalculatorClient.tsx

'use client';

import { useState } from 'react';
import { SeoHead } from '../components/Shared/SeoHead';

export default function CalculatorClient() {
  const [amount, setAmount] = useState('');
  const [fromYear, setFromYear] = useState('1980');
  const [toYear, setToYear] = useState('2024');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // 계산 로직
  };

  return (
    <>
      <SeoHead
        role="glue-ux"
        robots="noindex,follow"
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Inflation Calculator</h1>

        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="Enter amount"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">From Year</label>
              <input
                type="number"
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                className="w-full p-3 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To Year</label>
              <input
                type="number"
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                className="w-full p-3 border rounded"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full p-3 bg-blue-600 text-white rounded font-medium"
          >
            Calculate
          </button>
        </div>

        {result !== null && (
          <div className="mt-6 p-6 bg-green-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Result</p>
            <p className="text-3xl font-bold text-green-700">
              ${result.toLocaleString()}
            </p>
          </div>
        )}

        {/* 문서로 연결 (follow) */}
        <div className="mt-8 space-y-2">
          <p className="text-sm text-gray-500">Learn more:</p>
          <a href="/inflation/purchasing-power/" className="text-blue-600 block">
            → Understanding Purchasing Power
          </a>
          <a href="/inflation/" className="text-blue-600 block">
            → Back to Inflation Overview
          </a>
        </div>
      </main>
    </>
  );
}
```

---

## 생성 체크리스트

### Entry 체크리스트

- [ ] Quick Answer 1-2문장
- [ ] Result Card 수치 포함
- [ ] Trust Badge (출처/업데이트 날짜)
- [ ] Next Clicks 3-5개
- [ ] robots: index,follow
- [ ] sitemap 포함

### Supporting 체크리스트

- [ ] Anchor Navigation (sticky)
- [ ] 앵커 섹션 6-12개
- [ ] 각 섹션: 1줄 답 + 1줄 해석 + Depth 링크
- [ ] Bottom CTA (Glue-UX 연결)
- [ ] robots: index,follow
- [ ] sitemap 포함

### Depth 체크리스트

- [ ] UI Block 5종 이상
- [ ] 표/비교/차트 최소 1개
- [ ] 해석 섹션 최소 2개
- [ ] FAQ 3-6개
- [ ] Data Sources 섹션
- [ ] Methodology 섹션
- [ ] Last Updated
- [ ] Related Links 2-4개
- [ ] robots: index,follow
- [ ] sitemap 포함

### Glue-SEO 체크리스트

- [ ] ItemList 구조
- [ ] 모든 클러스터 페이지 목록
- [ ] 역할 표시 (Entry/Depth/Supporting)
- [ ] robots: index,follow
- [ ] sitemap 포함

### Glue-UX 체크리스트

- [ ] 계산기/도구 UI
- [ ] 문서 페이지로 연결 (follow)
- [ ] robots: noindex,follow
- [ ] sitemap 제외
- [ ] canonical: self
