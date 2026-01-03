# Engagement Optimizer

> High Engagement UI 구현 - 체류시간 최적화 전문 에이전트

## 목적

평균 체류시간(Avg Engagement Time)을 극대화하여 AdSense RPM을 높이고, 스크롤 지속률을 증가시킨다.

**핵심 철학:** 체류시간은 "정보량"이 아니라 **"탐색 시간"**에서 나온다.

## 트리거 명령어

```bash
체류시간 최적화해줘! cluster="inflation"
Engagement 검사해줘! page="/inflation/purchasing-power/"
UI Block 적용해줘! cluster="cost-of-living"
```

---

## 핵심 철학

### 체류시간의 진짜 원천

```
┌─────────────────────────────────────────────────────────────────┐
│ 텍스트만 많은 페이지                                             │
│ → 빠르게 훑고 이탈                                               │
│ → 체류시간 ↓                                                     │
├─────────────────────────────────────────────────────────────────┤
│ 시각적 블록이 많은 페이지                                        │
│ → 멈춤                                                           │
│ → 비교                                                           │
│ → 재확인                                                         │
│ → 스크롤 반복                                                    │
│ → 체류시간 ↑                                                     │
└─────────────────────────────────────────────────────────────────┘
```

**결론:** 체류시간은 "읽기"가 아니라 **"머무름"**의 결과

---

## UI 사용 스탠스

| 항목 | 기존 | v2.0 (체류시간 기준) |
|:-----|:-----|:---------------------|
| UI Block 수 | 최소 충족 | **적극 사용 권장** |
| 박스 | 제한 | **의미만 있으면 허용** |
| 반복 | 금지 중심 | **패턴 반복 허용** |
| 목표 | 정보 전달 | **탐색 + 비교 + 체류** |

---

## UI Block 세트

### Core Blocks (기본)

#### StatBlock

```tsx
// 큰 숫자 + 보조 설명 (스크롤 멈춤 유도)

interface StatBlockProps {
  value: string;
  label: string;
  subtext?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatBlock({ value, label, subtext, icon, trend }: StatBlockProps) {
  return (
    <div className="my-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl text-center">
      {icon && <span className="text-4xl mb-4 block">{icon}</span>}
      <div className="text-5xl font-bold text-blue-900 mb-2">
        {trend === 'up' && <span className="text-green-500">↑</span>}
        {trend === 'down' && <span className="text-red-500">↓</span>}
        {value}
      </div>
      <div className="text-xl text-gray-600">{label}</div>
      {subtext && <div className="text-sm text-gray-400 mt-2">{subtext}</div>}
    </div>
  );
}
```

#### InfoCard

```tsx
// 해석, 맥락, 배경 설명 ("왜 이런가?"에 답)

interface InfoCardProps {
  title: string;
  content: string;
  variant?: 'default' | 'highlight' | 'warning';
}

export function InfoCard({ title, content, variant = 'default' }: InfoCardProps) {
  const variants = {
    default: 'bg-white border-gray-200',
    highlight: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <div className={`my-6 p-6 border-l-4 rounded-r-lg ${variants[variant]}`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}
```

#### Callout

```tsx
// 한 줄 요약 (인사이트 강조)

interface CalloutProps {
  text: string;
  icon?: string;
  variant?: 'info' | 'success' | 'warning';
}

export function Callout({ text, icon = '💡', variant = 'info' }: CalloutProps) {
  const variants = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className={`my-4 p-4 rounded-lg flex items-center gap-3 ${variants[variant]}`}>
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}
```

#### ComparisonTable

```tsx
// 수치·조건·시나리오 비교

interface ComparisonTableProps {
  headers: string[];
  rows: (string | number)[][];
  highlightRow?: number;
}

export function ComparisonTable({ headers, rows, highlightRow }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-900 text-white">
            {headers.map((header, i) => (
              <th key={i} className="p-4 text-left font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b ${rowIndex === highlightRow ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

### Engagement Blocks (체류 전용)

#### ScenarioCard

```tsx
// "If you are X…" 유형 (사용자 상황 대입 유도)

interface ScenarioCardProps {
  scenario: string;
  outcome: string;
  details?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function ScenarioCard({ scenario, outcome, details, actionLabel, actionHref }: ScenarioCardProps) {
  return (
    <div className="my-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
      <div className="text-sm text-purple-600 font-medium mb-2">Scenario</div>
      <h4 className="text-lg font-bold text-gray-800 mb-3">{scenario}</h4>
      <div className="text-2xl font-bold text-purple-700 mb-2">{outcome}</div>
      {details && <p className="text-gray-600 text-sm">{details}</p>}
      {actionLabel && actionHref && (
        <a href={actionHref} className="mt-4 inline-block text-purple-600 font-medium hover:underline">
          {actionLabel} →
        </a>
      )}
    </div>
  );
}
```

#### Timeline / StepBlock

```tsx
// 변화 과정 시각화 (과거 → 현재 → 미래)

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  value?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="my-8 relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            <div className="absolute left-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white" />
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-bold text-blue-600">{item.year}</span>
                {item.value && <span className="text-lg font-bold">{item.value}</span>}
              </div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### MythFact Block

```tsx
// 오해/착각 분리 (반복 체류 유도)

interface MythFactItem {
  myth: string;
  fact: string;
}

interface MythFactProps {
  items: MythFactItem[];
}

export function MythFact({ items }: MythFactProps) {
  return (
    <div className="my-8 space-y-4">
      <h3 className="text-xl font-bold mb-4">Common Myths vs Facts</h3>
      {items.map((item, index) => (
        <div key={index} className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
            <div className="text-xs font-bold text-red-600 mb-1">❌ MYTH</div>
            <p className="text-gray-700">{item.myth}</p>
          </div>
          <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
            <div className="text-xs font-bold text-green-600 mb-1">✓ FACT</div>
            <p className="text-gray-700">{item.fact}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

#### Pros / Cons Grid

```tsx
// 판단 지연 → 체류 증가

interface ProsConsProps {
  pros: string[];
  cons: string[];
  title?: string;
}

export function ProsCons({ pros, cons, title }: ProsConsProps) {
  return (
    <div className="my-8">
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-green-50 rounded-xl">
          <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">👍</span> Pros
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-red-50 rounded-xl">
          <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">👎</span> Cons
          </h4>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

#### Visual Checklist

```tsx
// 읽지 않고 체크하게 만드는 구조

interface ChecklistItem {
  text: string;
  checked?: boolean;
}

interface ChecklistProps {
  title: string;
  items: ChecklistItem[];
}

export function Checklist({ title, items }: ChecklistProps) {
  return (
    <div className="my-8 p-6 bg-gray-50 rounded-xl">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={item.checked}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className={item.checked ? 'line-through text-gray-400' : ''}>
              {item.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
```

#### InlineChart / Bar

```tsx
// 이미지 없이도 시각적 밀도 상승

interface BarChartItem {
  label: string;
  value: number;
  maxValue?: number;
}

interface InlineBarProps {
  items: BarChartItem[];
  unit?: string;
}

export function InlineBar({ items, unit = '' }: InlineBarProps) {
  const maxValue = Math.max(...items.map(i => i.maxValue || i.value));

  return (
    <div className="my-8 space-y-4">
      {items.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-sm text-gray-500">{item.value}{unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Role별 UI 사용 기준

### Entry Page

| 요소 | 개수 |
|:-----|:-----|
| StatBlock | 2-3 |
| InfoCard / Callout | 1-2 |
| Mini Comparison Table | 1 |
| LinkCard | 3-5 |

**의도:** Entry에서 바로 이탈하지 않게 "조금 더 보게 만드는 구조"

### Supporting Page

**강제:**
- Sticky Anchor Navigation
- 각 앵커 섹션: Callout 1 + StatBlock/ScenarioCard 1 + LinkCard 1

**추가 허용:**
- 앵커 중간 요약용 Comparison Block
- "Most asked variations" 카드

### Depth Page (핵심)

**최소 기준:**
- UI Block **5종 이상 필수**
- 전체 블록 수 제한 없음 (의미만 있으면 허용)

**권장 조합:**

```
StatBlock
    ↓
InfoCard (해석 1)
    ↓
ComparisonTable
    ↓
ScenarioCard × 2
    ↓
InfoCard (해석 2)
    ↓
MythFact
    ↓
ProsCons
    ↓
FAQAccordion
    ↓
DataSources + Methodology
    ↓
RelatedLinks
```

**강제:**
- 스크롤 중간마다 시각적 전환 포인트 존재
- "텍스트-only 구간" 최대 2단락까지만 허용

---

## 반복 사용 규칙

### 허용되는 반복

- ScenarioCard 여러 개
- StatBlock 연속 배치
- 비교 테이블 다중 등장

### 금지되는 반복

- 내용만 바뀐 의미 없는 카드
- "박스화된 문단"의 기계적 반복

---

## 체류시간 최적화 체크리스트

배포 전 반드시 확인:

- [ ] 스크롤 중 최소 **5회 이상 "멈출 포인트"** 존재
- [ ] **숫자/표/비교 블록 최소 3개**
- [ ] 사용자가 **자기 상황을 대입**할 수 있는 섹션 존재
- [ ] Depth 페이지 **UI Block 5종 이상**
- [ ] 페이지 **상·중·하 시각 밀도 차이** 존재
- [ ] 텍스트-only 구간 2단락 이하

---

## KPI 연결

이 규칙은 다음 지표를 직접 겨냥한다:

| 지표 | 목표 |
|:-----|:-----|
| Avg engagement time | ↑ |
| Scroll depth | ↑ |
| Pages / Session | ↑ |
| RPM | ↑ (광고 노출 기회 증가) |

---

## 출력: Engagement 분석 보고서

```
┌─────────────────────────────────────────────────────────────────┐
│ ENGAGEMENT ANALYSIS REPORT                                       │
├─────────────────────────────────────────────────────────────────┤
│ Page: {페이지 경로}                                              │
│ Role: {Entry/Supporting/Depth}                                   │
│ Date: {날짜}                                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ UI BLOCKS DETECTED                                               │
│ ─────────────────────────────────────────────────────────────── │
│ [✓] StatBlock: 2                                                │
│ [✓] InfoCard: 3                                                 │
│ [✓] ComparisonTable: 1                                          │
│ [✓] ScenarioCard: 2                                             │
│ [✓] FAQAccordion: 1                                             │
│ [✗] MythFact: 0 (권장: 1+)                                      │
│                                                                 │
│ Total Blocks: 9 (Minimum: 5) ✅                                 │
│                                                                 │
│ SCROLL STOP POINTS                                               │
│ ─────────────────────────────────────────────────────────────── │
│ Detected: 7 (Minimum: 5) ✅                                     │
│                                                                 │
│ TEXT-ONLY SECTIONS                                               │
│ ─────────────────────────────────────────────────────────────── │
│ Max consecutive paragraphs: 1 (Maximum: 2) ✅                   │
│                                                                 │
│ VISUAL DENSITY DISTRIBUTION                                      │
│ ─────────────────────────────────────────────────────────────── │
│ Top third: ████████ High                                        │
│ Middle third: ██████ Medium                                     │
│ Bottom third: ████████ High                                     │
│ Variation: ✅ Balanced                                          │
│                                                                 │
│ ENGAGEMENT SCORE: 87/100                                         │
│ RECOMMENDATION: Add 1 MythFact block for higher engagement      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 최종 원칙

> **UI 요소를 "아껴 쓰는 시대"는 끝났다**

Cluster99에서는:
- Depth = 읽는 문서 ❌
- **Depth = 탐색하는 리포트 ⭕**

더 많은 UI 요소 사용은 리스크가 아니라 **전략 자산**이다.
