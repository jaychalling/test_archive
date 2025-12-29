# 테스트 기획서: Money Script & 2026 Financial Psychology Test

## 기본 정보

- **test-id**: `money-script-2026`
- **카테고리**: Personality / Wealth
- **예상 소요시간**: 10분
- **질문 수**: 36개

## 테스트 개요

2026년 거시경제 전망('병오년', 적토마의 해)과 개인의 무의식적 금융 신념(Money Script)을 결합한 심층 진단 테스트.
사용자의 Money Script(회피, 숭배, 지위, 경계)를 진단하고, 2026년의 경제 환경(AI 에이전트, 인플레이션 등)에서 주의해야 할 행동경제학적 편향과 구체적인 자산 관리 전략을 제시한다.

**핵심 컨셉**: "당신의 무의식은 2026년의 부의 이동을 감당할 준비가 되었는가?"

## 테스트 유형

- [x] **A. 캐릭터 가중치** - 4가지 머니 스크립트 중 가장 점수가 높은 유형을 도출
- [ ] **B. 점수 합산**
- [ ] **C. 체크리스트**
- [ ] **D. 다중 모듈**
- [ ] **E. 인터랙티브**

*로직: 4개 범주(회피, 숭배, 지위, 경계)별 9개 문항(총 36문항). 리커트 척도(1-6점) 합산 후 최고점 유형 선정.*

## 결과 유형

### 머니 스크립트 유형 (Wealth Archetypes)

| 키 | 이름 (English) | 설명 | 2026 키워드 |
|----|----------------|------|-------------|
| A | **Money Avoidance** (The Ascetic / Renouncer) | 돈에 대한 불안/혐오, 부에 대한 죄책감 | **Sabotage** (자산 증식 방해 주의) |
| W | **Money Worship** (The Dreamer / Alchemist) | 돈이 모든 해결책이라 믿음, 만성적 불만족 | **Hedonic Treadmill** (쾌락의 쳇바퀴 탈출) |
| S | **Money Status** (The Aristocrat / Performer) | 자존감을 자산과 일치, 과시적 소비 | **Social Comparison** (비교 심리 경계) |
| V | **Money Vigilance** (The Guardian / Steward) | 저축 중시, 비밀주의, 과도한 경계심 | **Opportunity Cost** (현금 고수 위험) |

## 질문 목록 (English Implementation)
*모든 질문은 "Strongly Disagree (1)" to "Strongly Agree (6)" 6점 척도*

### Category 1: Money Avoidance
1. I do not deserve a lot of money when others have less than me.
2. Rich people are greedy.
3. It is not right to have more money than you need.
4. People get rich by taking advantage of others.
5. Good people should not care about money.
6. It is hard to be rich and be a good person.
7. Most rich people do not deserve their money.
8. There is virtue in living with less money.
9. I do not deserve money.

### Category 2: Money Worship
10. Things would get better if I had more money.
11. More money will make you happier.
12. Money would solve all my problems.
13. There will never be enough money.
14. Money buys freedom.
15. It is hard to be poor and happy.
16. Money is what gives life meaning.
17. You can have love or money, but not both.
18. I feel anxious when I don't have money.

### Category 3: Money Status
19. Your self-worth is determined by your net worth.
20. If something is not considered the "best," it is not worth buying.
21. People are only as successful as the amount of money they earn.
22. I will not buy something unless it is new (e.g., new car, new house).
23. Poor people are lazy.
24. It is okay to keep secrets from your spouse about money.
25. If someone asked how much I earn, I would say more than I actually do.
26. I buy things to impress others.
27. I feel superior when I buy expensive things.

### Category 4: Money Vigilance
28. You should not tell others how much money you have or make.
29. It is wrong to ask others how much they make.
30. Money should be saved, not spent.
31. It is important to save for a rainy day.
32. People should work for their money and not be given financial handouts.
33. I would be a nervous wreck if I did not have an emergency fund.
34. If you cannot pay cash for something, you should not buy it.
35. If someone asked how much I earn, I would say less than I actually do.
36. I worry excessively about being poor.

## 결과 상세 및 2026년 전략 (영어 구현 예정 내용)

각 결과 페이지는 다음 섹션을 포함:
1.  **Archetype Analysis**: 당신의 무의식적 각본 해석.
2.  **2026 Forecast**: '병오년(Red Horse)'의 불(Fire) 기운과 당신의 스크립트가 만났을 때의 화학작용.
3.  **Risk Alert**: 주의해야 할 행동 편향 (e.g., Loss Aversion, Status Quo Bias).
4.  **AI Strategy**: 2026년 'Agentic AI'를 활용한 약점 보완법.
5.  **Recommended Asset Class**: 판타지 명명법 적용 (e.g., Onyx Shield, Phoenix Rising).

## 참고사항

- **디자인 컨셉**:
    - **테마**: 'Fire & Metal' (2026 병오년 상징). Dark Red, Gold, Obsidian Black 컬러 팔레트.
    - **분위기**: Premium, Mysterious, Professional.
    - **UI**: 고급스러운 카드 디자인, 미려한 애니메이션.
- **신뢰도 강화**:
    - 결과 페이지 하단에 **"Sources & References"** 섹션 추가 (Klontz Money Script Inventory, Goldman Sachs 2026 Outlook 등 원문 링크 명기).
- **기술적 요구**:
    - 리커트 척도 슬라이더 또는 버튼 UI.
    - 결과 계산 로직: 4개 카테고리별 합산 -> 최대값 추출. (동점일 경우: Avoidance > Worship > Status > Vigilance 순으로 우선순위 두거나 하이브리드 표기 고려, 일단은 단일 우세형으로 진행).

## Sources to be cited
1. *Klontz Money Script Inventory (KMSI)*
2. *Goldman Sachs: The Global Economy in 2026*
3. *Morgan Stanley: 2026 Economic Outlook*
4. *Microsoft: AI Transformation in Financial Services*
5. *Behavioral Finance: Loss Aversion & Status Quo Bias*
