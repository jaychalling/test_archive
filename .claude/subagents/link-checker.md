# Link Checker Subagent

> 404 에러 탐지, 끊어진 링크 검증.

## 주요 역할

모든 내부 링크의 유효성을 검증합니다.

---

## 검증 대상

- [ ] 내부 페이지 링크 (`<Link href="...">`)
- [ ] 이미지 경로 (`<Image src="...">`)
- [ ] API 엔드포인트 (`/api/...`)

---

## 검증 방법

```typescript
// 내부 링크 추출
const links = content.match(/href=["']([^"']+)["']/g);

// 각 링크 유효성 검사
for (const link of links) {
  const response = await fetch(link);
  if (response.status === 404) {
    errors.push({ url: link, status: 404 });
  }
}
```

---

## 출력 형식

### 성공

```
┌─────────────────────────────────────────────────┐
│ LINK CHECK: rice-purity-test                    │
├─────────────────────────────────────────────────┤
│ Checked: 15 links                               │
│ Valid: 15 ✅                                     │
│ Broken: 0                                       │
├─────────────────────────────────────────────────┤
│ RESULT: PASS ✅                                  │
└─────────────────────────────────────────────────┘
```

### 실패

```
┌─────────────────────────────────────────────────┐
│ LINK CHECK: rice-purity-test                    │
├─────────────────────────────────────────────────┤
│ Checked: 15 links                               │
│ Valid: 13                                       │
│ Broken: 2 ❌                                     │
│                                                 │
│ Broken Links:                                   │
│ • /test/old-test → 404                          │
│ • /images/missing.png → 404                     │
├─────────────────────────────────────────────────┤
│ RESULT: FAIL ❌                                  │
│                                                 │
│ 수정 필요:                                       │
│ 1. 링크 경로 수정                                │
│ 2. 누락된 파일 추가                              │
└─────────────────────────────────────────────────┘
```

---

## 스펙 참조

- [quality-gate-checker.md](./quality-gate-checker.md)
