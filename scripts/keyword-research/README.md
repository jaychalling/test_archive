# Google Ads Keyword Research for Test Archive

이 도구는 Google Ads Keyword Planner API를 사용하여 다음에 만들 테스트를 데이터 기반으로 결정합니다.

## 🎯 목적

- Tier 1, Tier 2 테스트들의 검색량과 경쟁도를 분석
- 우선순위 점수를 계산하여 다음에 만들 테스트 추천
- 트래픽 잠재력과 개발 ROI를 최대화

## 📋 사전 요구사항

### 1. Python 환경

```bash
# Python 3.8 이상 필요
python --version

# 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

### 2. 패키지 설치

```bash
cd scripts/keyword-research
pip install -r requirements.txt
```

### 3. Google Ads API 설정

프로젝트 루트의 `google-ads.yaml` 파일이 이미 설정되어 있습니다.

확인사항:
- ✅ Developer Token
- ✅ Client ID / Client Secret
- ✅ Refresh Token
- ✅ Login Customer ID

## 🚀 사용 방법

### 1. 키워드 조사 실행

```bash
cd scripts/keyword-research
python keyword_research.py
```

이 스크립트는:
- `test_keywords.json`의 모든 키워드를 Google Ads API로 조회
- 월간 검색량, 경쟁도, CPC 데이터 수집
- 우선순위 점수 계산 (검색량 70% + 최고 키워드 30% - 경쟁도)
- 결과를 `results/` 디렉토리에 Excel, JSON으로 저장

### 2. 결과 분석

```bash
python analyze_results.py
```

이 스크립트는:
- 최신 조사 결과를 분석
- Top 5 추천 테스트 표시
- Tier 1 vs Tier 2 비교
- Low-hanging fruit (고검색량 + 저경쟁) 테스트 식별

## 📊 출력 파일

```
scripts/keyword-research/results/
├── keyword_research_20240108_143022.xlsx    # 타임스탬프 버전
├── keyword_research_20240108_143022.json
├── keyword_research_latest.xlsx             # 최신 버전 (항상 덮어씀)
└── keyword_research_latest.json
```

### Excel 파일 컬럼 설명

| 컬럼 | 설명 |
|------|------|
| `tier` | Tier 1 또는 Tier 2 |
| `test_name` | 테스트 이름 |
| `total_monthly_searches` | 모든 키워드의 월간 검색량 합계 |
| `max_keyword_searches` | 가장 인기있는 키워드의 검색량 |
| `avg_competition_index` | 평균 경쟁도 (0-100) |
| `keyword_count` | 조사된 키워드 개수 |
| `top_keyword` | 가장 인기있는 키워드 |
| `top_keyword_volume` | 해당 키워드의 검색량 |
| `priority_score` | 우선순위 점수 (높을수록 좋음) |

## 🧮 우선순위 점수 계산 공식

```python
priority_score = (total_monthly_searches × 0.7) +
                 (max_keyword_searches × 0.3) -
                 (avg_competition_index × 100)
```

**해석:**
- 높은 점수 = 높은 검색량 + 낮은 경쟁 = 좋은 기회
- 낮은 점수 = 낮은 검색량 또는 높은 경쟁 = 나중에 고려

## 🔧 커스터마이징

### 새로운 테스트 키워드 추가

`test_keywords.json` 파일 수정:

```json
{
  "tier_1": [
    {
      "name": "Your New Test",
      "keywords": [
        "main keyword test",
        "alternative keyword quiz",
        "related search term"
      ]
    }
  ]
}
```

### 지역 변경

`keyword_research.py`의 `get_keyword_ideas()` 메서드에서 `location_ids` 변경:

```python
# 기본값: 미국
location_ids = ["2840"]

# 한국 추가
location_ids = ["2840", "2410"]

# 주요 국가 코드
# 2840 - United States
# 2410 - South Korea
# 2826 - United Kingdom
# 2036 - Canada
# 2036 - Australia
```

[전체 국가 코드 목록](https://developers.google.com/google-ads/api/data/geotargets)

## 📈 분석 결과 해석

### 1. 우선순위 점수 기준

| 점수 범위 | 의미 | 권장 액션 |
|----------|------|----------|
| 50,000+ | 매우 높은 잠재력 | 즉시 개발 시작 |
| 20,000-50,000 | 높은 잠재력 | 우선순위 높음 |
| 10,000-20,000 | 중간 잠재력 | 고려 대상 |
| < 10,000 | 낮은 잠재력 | 후순위 |

### 2. 경쟁도 해석

| 경쟁도 | 의미 | 전략 |
|-------|------|------|
| 0-30 | 낮음 | Low-hanging fruit, 빠른 트래픽 확보 가능 |
| 31-60 | 중간 | 콘텐츠 품질로 승부 |
| 61-100 | 높음 | E-E-A-T 강화 필요, 장기적 접근 |

### 3. Tier 선택 기준

**Tier 1 우선 개발 조건:**
- 기존 테스트와 내부 순환 시너지가 높음
- Pages/Session 증가 기대
- Related Tests 연결 가능성

**Tier 2 우선 개발 조건:**
- 바이럴 잠재력 (소셜 공유)
- 검색량이 압도적으로 높음
- 빠른 구현 가능 (단순한 scoring)

## 🔄 워크플로우

1. **키워드 조사 실행**
   ```bash
   python keyword_research.py
   ```

2. **결과 분석**
   ```bash
   python analyze_results.py
   ```

3. **Excel 파일 확인**
   - `results/keyword_research_latest.xlsx` 열기
   - Top 3-5 테스트 검토
   - 전략적 fit 고려

4. **테스트 선택**
   - Priority Score
   - Strategic fit (내부 순환)
   - 개발 복잡도

5. **테스트 개발**
   - `src/docs/new-test-workflow.md` 따라 개발
   - E-E-A-T 데이터 템플릿 사용
   - 결과 페이지 SEO 최적화

6. **CLAUDE.md 업데이트**
   - "Implemented Tests" 섹션에 추가
   - URL 경로, 데이터 파일 기록

## 🔒 보안 주의사항

- ⚠️ `google-ads.yaml`에 API credentials 포함 - **절대 커밋 금지**
- `.gitignore`에 이미 추가되어 있음
- `results/` 디렉토리는 로컬에서만 관리

## 🆘 문제 해결

### API 인증 오류

```
Error: Failed to load credentials
```

**해결:**
1. `google-ads.yaml` 경로 확인
2. `refresh_token`이 만료되지 않았는지 확인
3. Google Ads API 액세스 레벨 확인 (Test vs Standard)

### 검색량 0으로 나옴

```
monthly_searches: 0
```

**원인:**
- 키워드가 너무 niche
- 지역 타겟팅 문제
- API 할당량 초과

**해결:**
1. 더 일반적인 키워드로 변경
2. location_ids 확인
3. 24시간 후 재시도

### ImportError: google.ads

```
ModuleNotFoundError: No module named 'google.ads'
```

**해결:**
```bash
pip install --upgrade google-ads
```

## 📚 참고 자료

- [Google Ads API Documentation](https://developers.google.com/google-ads/api/docs/start)
- [Keyword Planner API Guide](https://developers.google.com/google-ads/api/docs/keyword-planning/overview)
- [GeoTarget Constants](https://developers.google.com/google-ads/api/data/geotargets)

## 🎯 다음 단계

조사 결과를 바탕으로:

1. **#1 추천 테스트** 검토
2. `src/docs/new-test-workflow.md` 워크플로우 시작
3. E-E-A-T 데이터 수집
4. 질문 작성 및 scoring 로직 구현
5. 배포 후 `CLAUDE.md` 업데이트
6. 다음 조사 주기 (월 1회 권장)

---

**Made for test-archive.com** | Last updated: 2024-01-08
