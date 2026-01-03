# Code Quality Subagent

> lint, 타입 오류 검사.

## 주요 역할

코드 품질 검증 (ESLint, TypeScript).

---

## 검사 명령어

```bash
# ESLint
npm run lint

# TypeScript
npx tsc --noEmit
```

---

## 검증 체크리스트

### ESLint

- [ ] 오류 0개
- [ ] 경고 최소화

### TypeScript

- [ ] 타입 오류 0개
- [ ] any 타입 최소화

---

## 출력 형식

```
┌─────────────────────────────────────────────────┐
│ CODE QUALITY CHECK                              │
├─────────────────────────────────────────────────┤
│ ESLint:                                         │
│ • Errors: 0 ✅                                   │
│ • Warnings: 2 ⚠️                                │
│                                                 │
│ TypeScript:                                     │
│ • Type errors: 0 ✅                              │
├─────────────────────────────────────────────────┤
│ RESULT: PASS ✅                                  │
└─────────────────────────────────────────────────┘
```

---

## 스펙 참조

- [CLAUDE.md Commands](../../CLAUDE.md)
