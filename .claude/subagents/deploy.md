# Deploy Subagent

> Vercel 배포 검증 및 실행.

## 주요 역할

프로덕션 배포 전 검증 및 배포 실행.

---

## 배포 모드

### 1. Verify 모드 (기본)

배포 없이 빌드 검증만 수행.

```bash
npm run build
```

**체크리스트**:
- [ ] npm install 성공
- [ ] npm run build 성공
- [ ] TypeScript 오류 없음
- [ ] ESLint 오류 없음

### 2. Push 모드 (사용자 요청 시)

Git push 후 Vercel 자동 배포.

```bash
git add .
git commit -m "feat: add rice-purity-test"
git push origin main
```

---

## 배포 전 체크리스트

- [ ] `npm run build` 성공
- [ ] `frontend/app/sitemap.ts`에 새 라우트 포함
- [ ] OG 이미지 정상 렌더링 (`/api/og?type=[test-id]`)
- [ ] 모든 Quality Gate 통과

---

## 트러블슈팅

### 빌드 실패

```
⛔ BUILD FAIL

빌드 오류:
• Type error in Report.tsx line 42

원인 분류: TypeScript 오류

수정 방법:
1. 오류 파일 확인 및 타입 수정
2. npm run build 재실행
```

### Vercel 배포 실패

```
⛔ DEPLOY FAIL

오류:
• Vercel deployment failed

수정 방법:
1. Vercel 대시보드에서 로그 확인
2. 환경 변수 확인
3. 재배포 시도
```

---

## 출력 형식

### Verify 모드

```
┌─────────────────────────────────────────────────┐
│ BUILD VERIFICATION                              │
├─────────────────────────────────────────────────┤
│ npm install: ✅                                  │
│ npm run build: ✅                                │
│ Build time: 32s                                 │
├─────────────────────────────────────────────────┤
│ RESULT: READY TO DEPLOY                         │
│                                                 │
│ 다음 단계:                                       │
│ "배포해줘" 또는 "git push해줘"                   │
└─────────────────────────────────────────────────┘
```

### Push 모드

```
┌─────────────────────────────────────────────────┐
│ DEPLOYMENT COMPLETE                             │
├─────────────────────────────────────────────────┤
│ git add: ✅                                      │
│ git commit: ✅                                   │
│ git push: ✅                                     │
├─────────────────────────────────────────────────┤
│ Vercel 배포 시작됨                               │
│ URL: https://test-archive.vercel.app            │
└─────────────────────────────────────────────────┘
```

---

## 스펙 참조

- [CLAUDE.md Pre-Push](../../CLAUDE.md)
