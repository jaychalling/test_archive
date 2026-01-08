#!/usr/bin/env python3
"""
Analyze keyword research results and provide recommendations
"""

import json
import pandas as pd
from pathlib import Path


def analyze_latest_results():
    """Analyze the latest keyword research results"""
    results_dir = Path(__file__).parent / "results"
    latest_file = results_dir / "keyword_research_latest.json"

    if not latest_file.exists():
        print("❌ No results found. Run keyword_research.py first.")
        return

    with open(latest_file, 'r') as f:
        data = json.load(f)

    df = pd.DataFrame(data)

    print("=" * 80)
    print("📊 KEYWORD RESEARCH ANALYSIS - TEST ARCHIVE")
    print("=" * 80)

    # Overall statistics
    print("\n📈 OVERALL STATISTICS:")
    print(f"  Total tests analyzed: {len(df)}")
    print(f"  Tier 1 tests: {len(df[df['tier'] == 'Tier 1'])}")
    print(f"  Tier 2 tests: {len(df[df['tier'] == 'Tier 2'])}")
    print(f"  Total monthly search volume: {df['total_monthly_searches'].sum():,.0f}")
    print(f"  Average competition index: {df['avg_competition_index'].mean():.1f}/100")

    # Top 5 by total searches
    print("\n🔥 TOP 5 BY TOTAL SEARCH VOLUME:")
    top_searches = df.nlargest(5, 'total_monthly_searches')[
        ['test_name', 'tier', 'total_monthly_searches', 'avg_competition_index']
    ]
    for idx, row in top_searches.iterrows():
        print(f"  {row['test_name']:<35} | {row['tier']:<8} | "
              f"{row['total_monthly_searches']:>10,.0f} searches | "
              f"Competition: {row['avg_competition_index']:.1f}")

    # Top 5 by priority score
    print("\n🎯 TOP 5 BY PRIORITY SCORE (Volume + Low Competition):")
    top_priority = df.nlargest(5, 'priority_score')[
        ['test_name', 'tier', 'priority_score', 'total_monthly_searches', 'avg_competition_index']
    ]
    for idx, row in top_priority.iterrows():
        print(f"  {row['test_name']:<35} | {row['tier']:<8} | "
              f"Score: {row['priority_score']:>8,.0f} | "
              f"Vol: {row['total_monthly_searches']:>7,.0f} | "
              f"Comp: {row['avg_competition_index']:.1f}")

    # Tier 1 vs Tier 2 comparison
    print("\n📊 TIER COMPARISON:")
    tier1 = df[df['tier'] == 'Tier 1']
    tier2 = df[df['tier'] == 'Tier 2']

    print(f"\n  Tier 1:")
    print(f"    Avg monthly searches: {tier1['total_monthly_searches'].mean():,.0f}")
    print(f"    Avg competition: {tier1['avg_competition_index'].mean():.1f}")
    print(f"    Avg priority score: {tier1['priority_score'].mean():,.0f}")

    print(f"\n  Tier 2:")
    print(f"    Avg monthly searches: {tier2['total_monthly_searches'].mean():,.0f}")
    print(f"    Avg competition: {tier2['avg_competition_index'].mean():.1f}")
    print(f"    Avg priority score: {tier2['priority_score'].mean():,.0f}")

    # Recommendations
    print("\n" + "=" * 80)
    print("💡 RECOMMENDATIONS:")
    print("=" * 80)

    top_test = df.iloc[0]
    print(f"\n🥇 #1 RECOMMENDED: {top_test['test_name']}")
    print(f"   Tier: {top_test['tier']}")
    print(f"   Priority Score: {top_test['priority_score']:,.0f}")
    print(f"   Total Monthly Searches: {top_test['total_monthly_searches']:,.0f}")
    print(f"   Competition Index: {top_test['avg_competition_index']}/100")
    print(f"   Top Keyword: '{top_test['top_keyword']}' ({top_test['top_keyword_volume']:,.0f} searches)")

    # Next 2 recommendations
    print(f"\n🥈 #2 RECOMMENDED: {df.iloc[1]['test_name']} ({df.iloc[1]['tier']})")
    print(f"   Priority Score: {df.iloc[1]['priority_score']:,.0f} | "
          f"Searches: {df.iloc[1]['total_monthly_searches']:,.0f}")

    print(f"\n🥉 #3 RECOMMENDED: {df.iloc[2]['test_name']} ({df.iloc[2]['tier']})")
    print(f"   Priority Score: {df.iloc[2]['priority_score']:,.0f} | "
          f"Searches: {df.iloc[2]['total_monthly_searches']:,.0f}")

    # Low-hanging fruit (high volume, low competition)
    print("\n🍎 LOW-HANGING FRUIT (High Volume + Low Competition < 40):")
    low_hanging = df[(df['total_monthly_searches'] > 10000) &
                     (df['avg_competition_index'] < 40)].head(3)

    if len(low_hanging) > 0:
        for idx, row in low_hanging.iterrows():
            print(f"  • {row['test_name']:<35} | "
                  f"{row['total_monthly_searches']:>10,.0f} searches | "
                  f"Competition: {row['avg_competition_index']:.1f}")
    else:
        print("  (None found - all high-volume keywords are competitive)")

    print("\n" + "=" * 80)
    print("📝 NEXT STEPS:")
    print("=" * 80)
    print("1. Review the full Excel file in scripts/keyword-research/results/")
    print("2. Choose a test based on:")
    print("   - Priority score (balances volume + competition)")
    print("   - Strategic fit with existing tests")
    print("   - Development complexity")
    print("3. Follow src/docs/new-test-workflow.md to implement")
    print("4. Update CLAUDE.md with the new test when completed")
    print("=" * 80)


if __name__ == "__main__":
    analyze_latest_results()
