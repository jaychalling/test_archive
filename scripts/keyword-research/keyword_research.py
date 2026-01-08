#!/usr/bin/env python3
"""
Google Ads Keyword Planner API - Keyword Research Script
Analyzes search volume and competition for test keywords to prioritize development
"""

import json
import yaml
from pathlib import Path
from datetime import datetime
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
import pandas as pd


class KeywordResearcher:
    def __init__(self, config_path: str = "../../google-ads.yaml"):
        """Initialize Google Ads client"""
        self.config_path = Path(__file__).parent / config_path
        self.client = GoogleAdsClient.load_from_storage(str(self.config_path))
        self.customer_id = self._get_customer_id()

    def _get_customer_id(self) -> str:
        """Get customer ID from config"""
        with open(self.config_path, 'r') as f:
            config = yaml.safe_load(f)
            return str(config['login_customer_id'])

    def get_keyword_ideas(self, keywords: list[str], location_ids: list[str] = None) -> list:
        """
        Get keyword ideas and metrics from Google Ads

        Args:
            keywords: List of seed keywords to research
            location_ids: Geographic locations (default: US = 2840)

        Returns:
            List of keyword ideas with metrics
        """
        if location_ids is None:
            location_ids = ["2840"]  # United States

        keyword_plan_idea_service = self.client.get_service("KeywordPlanIdeaService")

        request = self.client.get_type("GenerateKeywordIdeasRequest")
        request.customer_id = self.customer_id

        # Set language to English
        request.language = self.client.get_service("GoogleAdsService").language_constant_path("1000")

        # Set geographic targeting
        for location_id in location_ids:
            location = self.client.get_type("LocationInfo")
            location.geo_target_constant = (
                self.client.get_service("GeoTargetConstantService")
                .geo_target_constant_path(location_id)
            )
            request.geo_target_constants.append(location.geo_target_constant)

        # Set keyword network (Google search)
        request.keyword_plan_network = (
            self.client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
        )

        # Add seed keywords
        request.keyword_seed.keywords.extend(keywords)

        try:
            response = keyword_plan_idea_service.generate_keyword_ideas(request=request)

            results = []
            for idea in response:
                # Get monthly search volume
                monthly_searches = (
                    idea.keyword_idea_metrics.avg_monthly_searches
                    if idea.keyword_idea_metrics
                    else 0
                )

                # Get competition level
                competition = (
                    idea.keyword_idea_metrics.competition.name
                    if idea.keyword_idea_metrics
                    else "UNSPECIFIED"
                )

                # Get competition index (0-100)
                competition_index = (
                    idea.keyword_idea_metrics.competition_index
                    if idea.keyword_idea_metrics
                    else 0
                )

                # Get low/high top of page bid
                low_bid = 0
                high_bid = 0
                if idea.keyword_idea_metrics:
                    if idea.keyword_idea_metrics.low_top_of_page_bid_micros:
                        low_bid = idea.keyword_idea_metrics.low_top_of_page_bid_micros / 1_000_000
                    if idea.keyword_idea_metrics.high_top_of_page_bid_micros:
                        high_bid = idea.keyword_idea_metrics.high_top_of_page_bid_micros / 1_000_000

                results.append({
                    'keyword': idea.text,
                    'monthly_searches': monthly_searches,
                    'competition': competition,
                    'competition_index': competition_index,
                    'low_bid_usd': round(low_bid, 2),
                    'high_bid_usd': round(high_bid, 2),
                })

            return results

        except GoogleAdsException as ex:
            print(f"Request failed with status {ex.error.code().name}")
            for error in ex.failure.errors:
                print(f"\tError: {error.message}")
            return []

    def analyze_test_keywords(self, keywords_file: str = "test_keywords.json") -> pd.DataFrame:
        """
        Analyze all test keywords from JSON file

        Args:
            keywords_file: Path to JSON file with test keywords

        Returns:
            DataFrame with aggregated results
        """
        keywords_path = Path(__file__).parent / keywords_file

        with open(keywords_path, 'r') as f:
            test_data = json.load(f)

        all_results = []

        # Process Tier 1
        print("\n=== Analyzing Tier 1 Tests ===")
        for test in test_data['tier_1']:
            print(f"\nResearching: {test['name']}")
            keywords = test['keywords']

            results = self.get_keyword_ideas(keywords)

            if results:
                # Aggregate metrics
                total_searches = sum(r['monthly_searches'] for r in results)
                avg_competition_index = sum(r['competition_index'] for r in results) / len(results)
                max_searches = max(r['monthly_searches'] for r in results)

                all_results.append({
                    'tier': 'Tier 1',
                    'test_name': test['name'],
                    'total_monthly_searches': total_searches,
                    'max_keyword_searches': max_searches,
                    'avg_competition_index': round(avg_competition_index, 1),
                    'keyword_count': len(results),
                    'top_keyword': max(results, key=lambda x: x['monthly_searches'])['keyword'],
                    'top_keyword_volume': max(results, key=lambda x: x['monthly_searches'])['monthly_searches']
                })

                print(f"  Total monthly searches: {total_searches:,}")
                print(f"  Top keyword: {all_results[-1]['top_keyword']} ({all_results[-1]['top_keyword_volume']:,})")

        # Process Tier 2
        print("\n=== Analyzing Tier 2 Tests ===")
        for test in test_data['tier_2']:
            print(f"\nResearching: {test['name']}")
            keywords = test['keywords']

            results = self.get_keyword_ideas(keywords)

            if results:
                # Aggregate metrics
                total_searches = sum(r['monthly_searches'] for r in results)
                avg_competition_index = sum(r['competition_index'] for r in results) / len(results)
                max_searches = max(r['monthly_searches'] for r in results)

                all_results.append({
                    'tier': 'Tier 2',
                    'test_name': test['name'],
                    'total_monthly_searches': total_searches,
                    'max_keyword_searches': max_searches,
                    'avg_competition_index': round(avg_competition_index, 1),
                    'keyword_count': len(results),
                    'top_keyword': max(results, key=lambda x: x['monthly_searches'])['keyword'],
                    'top_keyword_volume': max(results, key=lambda x: x['monthly_searches'])['monthly_searches']
                })

                print(f"  Total monthly searches: {total_searches:,}")
                print(f"  Top keyword: {all_results[-1]['top_keyword']} ({all_results[-1]['top_keyword_volume']:,})")

        # Create DataFrame
        df = pd.DataFrame(all_results)

        # Calculate priority score
        # Formula: (total_searches * 0.7) + (max_searches * 0.3) - (competition_index * 100)
        df['priority_score'] = (
            (df['total_monthly_searches'] * 0.7) +
            (df['max_keyword_searches'] * 0.3) -
            (df['avg_competition_index'] * 100)
        )

        # Sort by priority score
        df = df.sort_values('priority_score', ascending=False)

        return df

    def save_results(self, df: pd.DataFrame, output_dir: str = "results"):
        """Save results to Excel and JSON"""
        output_path = Path(__file__).parent / output_dir
        output_path.mkdir(exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        # Save to Excel
        excel_file = output_path / f"keyword_research_{timestamp}.xlsx"
        df.to_excel(excel_file, index=False)
        print(f"\n✅ Results saved to: {excel_file}")

        # Save to JSON
        json_file = output_path / f"keyword_research_{timestamp}.json"
        df.to_json(json_file, orient='records', indent=2)
        print(f"✅ Results saved to: {json_file}")

        # Save latest copy
        latest_excel = output_path / "keyword_research_latest.xlsx"
        df.to_excel(latest_excel, index=False)

        latest_json = output_path / "keyword_research_latest.json"
        df.to_json(latest_json, orient='records', indent=2)

        return excel_file


def main():
    """Main execution"""
    # Set UTF-8 encoding for Windows console
    import sys
    import io
    if sys.platform == 'win32':
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

    print("🔍 Google Ads Keyword Research for Test Archive")
    print("=" * 60)

    researcher = KeywordResearcher()

    # Analyze all test keywords
    df = researcher.analyze_test_keywords()

    # Display results
    print("\n" + "=" * 60)
    print("📊 TOP 10 RECOMMENDED TESTS (by Priority Score)")
    print("=" * 60)

    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    pd.set_option('display.max_colwidth', 30)

    print(df.head(10).to_string(index=False))

    # Save results
    output_file = researcher.save_results(df)

    print("\n" + "=" * 60)
    print("🎯 NEXT STEPS:")
    print("=" * 60)
    print(f"1. Review the full results in: {output_file}")
    print(f"2. Top recommended test: {df.iloc[0]['test_name']}")
    print(f"   - Tier: {df.iloc[0]['tier']}")
    print(f"   - Monthly searches: {df.iloc[0]['total_monthly_searches']:,.0f}")
    print(f"   - Top keyword: {df.iloc[0]['top_keyword']}")
    print("3. Use src/docs/new-test-workflow.md to implement the test")


if __name__ == "__main__":
    main()
