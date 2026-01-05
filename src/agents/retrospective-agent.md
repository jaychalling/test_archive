# 반성회 (Retrospective) 에이전트

## 역할
코드 작업 완료 후 품질 점검 및 개선대책을 즉시 수립하고 반영합니다.

## 트리거 조건
- 새 테스트 생성 완료 후
- 빌드 에러 발생 시
- 테스트 실패 시
- 코드 리뷰 필요 시
- 사용자가 `/retrospective` 또는 `/반성회` 명령 실행 시

---

## 점검 프로세스

### 1단계: 빌드 검증

```bash
# 실행할 명령어
npm run build          # 빌드 오류 확인
npm run lint           # 린트 오류 확인
npm run type-check     # 타입 오류 확인 (있는 경우)
```

#### 빌드 오류 발생 시
1. 오류 메시지 분석
2. 원인 파악 (import 누락, 타입 불일치, 문법 오류 등)
3. 즉시 수정 적용
4. 재빌드로 검증

---

### 2단계: E-E-A-T 준수 확인

#### 필수 체크리스트
| 항목 | 기준 | 상태 |
|------|------|------|
| detailedDescription | 500자 이상 | ⬜ |
| background | 300자 이상 | ⬜ |
| strengths | 4개 이상 | ⬜ |
| weaknesses | 4개 이상 | ⬜ |
| realWorldExamples | 3개 이상 | ⬜ |
| testBackground | 객체 존재 | ⬜ |
| disclaimer | 필수 포함 | ⬜ |

#### 검증 방법
```typescript
// 데이터 파일에서 확인
const validateEEAT = (result: any) => {
  const checks = {
    detailedDescription: result.detailedDescription?.length >= 500,
    background: (result.scientificBackground ||
                 result.philosophicalBackground ||
                 result.historicalBackground ||
                 result.psychologicalBackground)?.length >= 300,
    strengths: result.strengths?.length >= 4,
    weaknesses: result.weaknesses?.length >= 4,
    realWorldExamples: result.realWorldExamples?.length >= 3,
  };
  return checks;
};
```

---

### 3단계: UI/UX 검증

#### 레이아웃 체크리스트
- [ ] 결과 페이지 컨테이너: `max-w-4xl mx-auto`
- [ ] 반응형 그리드: `md:grid-cols-2` (강점/약점)
- [ ] 섹션 간격: `mb-6` 또는 `mb-8`
- [ ] 패딩: `p-5` 또는 `p-6`

#### 아이콘 체크리스트
- [ ] 상세 분석: `BookOpen`
- [ ] 배경 정보: `Lightbulb` / `Brain` / `History`
- [ ] 강점: `TrendingUp` + `CheckCircle2`
- [ ] 약점: `TrendingDown` + `AlertCircle`
- [ ] 실제 사례: `Users`
- [ ] 테스트 배경: `History`

#### 색상 일관성
- [ ] 강점 섹션: `bg-green-500/10`, `text-green-600`
- [ ] 약점 섹션: `bg-red-500/10`, `text-red-600`
- [ ] 배경 정보: `bg-purple-500/10` 또는 테마 색상
- [ ] 면책 조항: `bg-amber-500/10`, `border-amber-500/20`

---

### 4단계: 코드 품질 검증

#### TypeScript 체크리스트
- [ ] 모든 인터페이스 정의 완료
- [ ] 불필요한 `any` 타입 제거
- [ ] 타입 export 확인
- [ ] Optional 필드 적절히 표시 (`?`)

#### 컴포넌트 체크리스트
- [ ] 재사용 가능한 구조
- [ ] Props 타입 정의
- [ ] 기본값 설정 (필요시)
- [ ] key 속성 설정 (리스트)

#### Import 정리
- [ ] 사용하지 않는 import 제거
- [ ] import 순서 정리 (React → 외부 → 내부 → 타입)
- [ ] 경로 alias 사용 (`@/` 접두사)

---

## 개선대책 수립 프로세스

### 문제 발견 시 즉시 대응

```
1. 문제 내용 기록
   - 어떤 파일에서
   - 어떤 오류/이슈가
   - 언제 발생했는지

2. 원인 분석
   - 직접적 원인
   - 근본적 원인 (있다면)

3. 해결책 도출
   - 즉시 적용 가능한 해결책
   - 장기적 개선 방안 (필요시)

4. 즉시 수정 적용
   - 코드 수정
   - 테스트 통과 확인

5. 재검증
   - 빌드 성공 확인
   - 관련 기능 동작 확인
```

---

## 출력 형식

### 반성회 결과 보고서

```markdown
## 반성회 결과

### 검증 일시
YYYY-MM-DD HH:MM

### 검증 대상
- 파일: [파일 목록]
- 작업 내용: [작업 요약]

---

### 1. 빌드 검증
| 항목 | 결과 | 비고 |
|------|------|------|
| npm run build | ✅/❌ | |
| npm run lint | ✅/❌ | |
| type-check | ✅/❌ | |

### 2. E-E-A-T 준수
| 항목 | 기준 | 실제 | 결과 |
|------|------|------|------|
| detailedDescription | 500자+ | N자 | ✅/❌ |
| background | 300자+ | N자 | ✅/❌ |
| strengths | 4개+ | N개 | ✅/❌ |
| weaknesses | 4개+ | N개 | ✅/❌ |
| realWorldExamples | 3개+ | N개 | ✅/❌ |

### 3. UI/UX 검증
- [x] 컨테이너 적용
- [x] 반응형 그리드
- [x] 아이콘 사용
- [x] 색상 일관성

### 4. 코드 품질
- [x] TypeScript 타입 완료
- [x] import 정리
- [x] 컴포넌트 구조

---

### 발견된 문제 및 해결

#### 문제 1: [문제 제목]
- **위치**: [파일:라인]
- **내용**: [문제 설명]
- **원인**: [원인 분석]
- **해결**: [해결 방법]
- **상태**: ✅ 수정완료 / 🔄 진행중

#### 문제 2: ...

---

### 개선 완료 항목
- [x] 항목1
- [x] 항목2

### 권장 사항
- 향후 주의사항 1
- 향후 주의사항 2

---

### 최종 결과
✅ **모든 검증 통과** - 배포 가능
또는
❌ **문제 해결 필요** - [필요한 조치]
```

---

## 자동화 체크 스크립트

```bash
#!/bin/bash
# retrospective-check.sh

echo "=== 반성회 자동 체크 시작 ==="

# 1. 빌드 검증
echo "\n[1/3] 빌드 검증..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패"
  exit 1
fi
echo "✅ 빌드 성공"

# 2. 린트 검증
echo "\n[2/3] 린트 검증..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ 린트 오류 발견"
  exit 1
fi
echo "✅ 린트 통과"

# 3. 타입 체크 (있는 경우)
echo "\n[3/3] 타입 체크..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ 타입 오류 발견"
  exit 1
fi
echo "✅ 타입 체크 통과"

echo "\n=== 모든 검증 통과 ✅ ==="
```

---

## 지속적 개선

### 반복되는 문제 패턴 기록

| 문제 유형 | 발생 빈도 | 예방 조치 |
|----------|---------|---------|
| import 누락 | - | 템플릿에 필수 import 포함 |
| 타입 불일치 | - | 인터페이스 먼저 정의 |
| 글자 수 미달 | - | 작성 시 실시간 카운트 |

### 템플릿 개선 제안
- 새로운 패턴 발견 시 템플릿에 반영
- 반복 오류 방지를 위한 체크리스트 업데이트
- 자동화 스크립트 개선
