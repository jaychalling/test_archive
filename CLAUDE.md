# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

사용자와의 대화는 **한국어**로 진행합니다.

## Commands

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드 (push 전 필수)
npm run lint     # ESLint
vercel --prod    # Vercel 배포 (루트에서 실행)
```

## Architecture

Next.js frontend + Flask backend 모노레포, Vercel 배포.

**Routing (vercel.json):**
- `/api/og` → Frontend (OG 이미지)
- `/api/*` → Backend (Flask)
- `/*` → Frontend (Next.js)

**Key Paths:**
- `frontend/app/test/[test-id]/` - 테스트 페이지들
- `frontend/app/api/og/route.tsx` - OG 이미지 라우팅 (렌더링 로직 금지)
- `frontend/utils/metadata.ts` - 메타데이터 유틸리티

## Core Rules

- **Metadata**: 항상 `generateTestMetadata` 사용
- **OG Images**: 각 테스트의 `og/og-template.tsx`에서 렌더링, `.png`/`.jpg` 사용 (`.webp` 금지)
- **Result Page**: 4버튼 그리드 필수 (테스트 공유, 결과 공유, 다시하기, 홈)
- **Quiz UX**: 선택 후 자동 진행 (~250ms), 프로그레스 바 필수
- **Separation of Concerns**: 데이터(`questions.ts`) ↔ UI(`components/`) 분리

## Pre-Push

1. `npm run build` 성공 확인
2. `frontend/app/sitemap.ts` 새 라우트 포함 확인
