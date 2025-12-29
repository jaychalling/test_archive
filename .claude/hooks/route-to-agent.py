#!/usr/bin/env python3
"""
Agent Router Hook
사용자 프롬프트에서 키워드를 감지하여 적절한 subagent 사용을 제안합니다.
"""

import json
import sys

def main():
    try:
        input_data = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        sys.exit(0)

    prompt = input_data.get("prompt", "").lower()

    # Agent별 키워드 매핑
    agent_keywords = {
        "test-generator": [
            "테스트", "퀴즈", "심리테스트", "검사", "진단",
            "test", "quiz", "새 테스트", "테스트 만들", "퀴즈 만들",
            "테스트 추가", "퀴즈 추가", "테스트 생성", "퀴즈 생성"
        ],
        "agent-creator": [
            "agent", "skill", "subagent", "에이전트", "스킬",
            "커스텀 에이전트", "새 agent", "새 skill", "agent 만들",
            "skill 만들", "에이전트 생성", "스킬 생성"
        ]
    }

    # 이미 명시적으로 agent를 언급한 경우 제안하지 않음
    explicit_mentions = ["test-generator", "agent-creator", "사용해서", "사용해줘", "로 해줘"]
    if any(mention in prompt for mention in explicit_mentions):
        sys.exit(0)

    # 키워드 매칭
    for agent, keywords in agent_keywords.items():
        matched_keywords = [kw for kw in keywords if kw in prompt]
        if matched_keywords:
            print(f"[Agent Suggestion] '{agent}' subagent를 사용하면 더 효율적일 수 있습니다.")
            print(f"  매칭된 키워드: {', '.join(matched_keywords[:3])}")
            break

    sys.exit(0)

if __name__ == "__main__":
    main()
