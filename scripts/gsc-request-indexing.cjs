const { google } = require('googleapis');
const path = require('path');

const KEY_FILE = 'E:\\2026\\Projects\\GSC\\gen-lang-client-0698230269-f4b11b3bb976.json';
const SITE_URL = 'https://www.test-archive.com/';

const URLS_TO_INDEX = [
  'https://www.test-archive.com/',
  'https://www.test-archive.com/test/rice-purity/',
  'https://www.test-archive.com/test/rice-purity/result/',
  'https://www.test-archive.com/test/bdsm-test/',
  'https://www.test-archive.com/test/bdsm-test/result/',
  'https://www.test-archive.com/test/big-five-test/',
  'https://www.test-archive.com/test/big-five-test/result/',
  'https://www.test-archive.com/test/16-personality-test/',
  'https://www.test-archive.com/test/16-personality-test/result/',
  'https://www.test-archive.com/test/love-language-test/',
  'https://www.test-archive.com/test/love-language-test/result/',
  'https://www.test-archive.com/test/attachment-style-test/',
  'https://www.test-archive.com/test/attachment-style-test/result/',
  'https://www.test-archive.com/test/enneagram-test/',
  'https://www.test-archive.com/test/enneagram-test/result/',
  'https://www.test-archive.com/test/political-compass-test/',
  'https://www.test-archive.com/test/political-compass-test/result/',
  'https://www.test-archive.com/test/moral-alignment-test/',
  'https://www.test-archive.com/test/moral-alignment-test/result/',
  'https://www.test-archive.com/test/introvert-extrovert-test/',
  'https://www.test-archive.com/test/introvert-extrovert-test/result/',
  'https://www.test-archive.com/test/love-compatibility-test/',
  'https://www.test-archive.com/test/love-compatibility-test/result/',
  'https://www.test-archive.com/test/self-esteem-test/',
  'https://www.test-archive.com/test/self-esteem-test/result/',
  'https://www.test-archive.com/test/anxiety-calm-test/',
  'https://www.test-archive.com/test/anxiety-calm-test/result/',
  'https://www.test-archive.com/test/emotional-intelligence-test/',
  'https://www.test-archive.com/test/emotional-intelligence-test/result/',
  'https://www.test-archive.com/test/career-aptitude-test/',
  'https://www.test-archive.com/test/career-aptitude-test/result/',
  'https://www.test-archive.com/test/communication-style-test/',
  'https://www.test-archive.com/test/communication-style-test/result/',
  'https://www.test-archive.com/test/mental-age-test/',
  'https://www.test-archive.com/test/mental-age-test/result/',
  'https://www.test-archive.com/test/dark-triad-test/',
  'https://www.test-archive.com/test/dark-triad-test/result/',
  'https://www.test-archive.com/test/toxic-trait-test/',
  'https://www.test-archive.com/test/toxic-trait-test/result/',
];

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/indexing',
    ],
  });

  const authClient = await auth.getClient();

  // 1. URL Inspection API - check indexing status
  console.log('=== URL Inspection: Checking indexing status ===\n');

  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

  const results = { indexed: [], notIndexed: [], errors: [] };

  for (const url of URLS_TO_INDEX) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: SITE_URL,
        },
      });

      const verdict = res.data.inspectionResult?.indexStatusResult?.verdict;
      const coverageState = res.data.inspectionResult?.indexStatusResult?.coverageState;
      const crawledAs = res.data.inspectionResult?.indexStatusResult?.crawledAs;
      const lastCrawlTime = res.data.inspectionResult?.indexStatusResult?.lastCrawlTime;
      const robotsTxtState = res.data.inspectionResult?.indexStatusResult?.robotsTxtState;

      const status = verdict === 'PASS' ? 'INDEXED' : 'NOT_INDEXED';

      if (status === 'INDEXED') {
        results.indexed.push(url);
      } else {
        results.notIndexed.push({ url, coverageState, robotsTxtState });
      }

      console.log(`[${status}] ${url}`);
      console.log(`  Verdict: ${verdict}, Coverage: ${coverageState}`);
      console.log(`  Crawled as: ${crawledAs}, Last crawl: ${lastCrawlTime || 'Never'}`);
      console.log(`  Robots.txt: ${robotsTxtState}`);
      console.log();

      // Rate limit - GSC API has quotas
      await new Promise(r => setTimeout(r, 1200));
    } catch (err) {
      console.log(`[ERROR] ${url}: ${err.message}`);
      results.errors.push({ url, error: err.message });
      await new Promise(r => setTimeout(r, 1200));
    }
  }

  // 2. Try Indexing API for non-indexed URLs
  console.log('\n=== Indexing API: Requesting indexing for non-indexed URLs ===\n');

  const indexing = google.indexing({ version: 'v3', auth: authClient });

  let indexingRequested = 0;
  let indexingFailed = 0;

  const urlsToRequest = results.notIndexed.map(r => r.url);
  // Also include all URLs to force re-crawl
  const allUrls = [...new Set([...urlsToRequest, ...URLS_TO_INDEX])];

  for (const url of allUrls) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`[REQUESTED] ${url}`);
      indexingRequested++;
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      const errMsg = err.errors?.[0]?.message || err.message;
      console.log(`[FAILED] ${url}: ${errMsg}`);
      indexingFailed++;
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total URLs checked: ${URLS_TO_INDEX.length}`);
  console.log(`Indexed: ${results.indexed.length}`);
  console.log(`Not indexed: ${results.notIndexed.length}`);
  console.log(`Inspection errors: ${results.errors.length}`);
  console.log(`Indexing requested: ${indexingRequested}`);
  console.log(`Indexing failed: ${indexingFailed}`);

  if (results.notIndexed.length > 0) {
    console.log('\n--- Not Indexed URLs ---');
    results.notIndexed.forEach(r => {
      console.log(`  ${r.url} (${r.coverageState})`);
    });
  }

  if (indexingFailed > 0) {
    console.log('\nNote: Indexing API failures are expected for non-JobPosting/BroadcastEvent pages.');
    console.log('For these pages, manual indexing request via GSC dashboard is recommended.');
    console.log('URL: https://search.google.com/search-console/inspect');
  }
}

main().catch(console.error);
