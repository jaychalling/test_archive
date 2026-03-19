#!/usr/bin/env node
/**
 * Post-build prerender script for test-archive.com
 * Generates static HTML for all routes so Google can index without JS rendering.
 *
 * Usage: node scripts/prerender.mjs
 * Runs after `vite build` — reads dist/, launches local server, saves rendered HTML.
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 45678;

const testSlugs = [
  'rice-purity', 'political-compass-test', 'bdsm-test', 'love-language-test',
  'attachment-style-test', 'big-five-test', 'enneagram-test', '16-personality-test',
  'moral-alignment-test', 'introvert-extrovert-test', 'emotional-intelligence-test',
  'career-aptitude-test', 'communication-style-test', 'love-compatibility-test',
  'self-esteem-test', 'anxiety-calm-test', 'mental-age-test', 'dark-triad-test',
  'toxic-trait-test',
];

// Only prerender test pages + info pages (NOT result pages — they need localStorage)
const routes = [
  '/',
  '/about/',
  '/privacy/',
  '/terms/',
  '/contact/',
  ...testSlugs.map(s => `/test/${s}/`),
];

// Simple static file server for dist/
function startServer() {
  const mimeTypes = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json',
    '.woff2': 'font/woff2', '.woff': 'font/woff',
  };

  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

  const server = createServer((req, res) => {
    let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);

    // Try exact file, then with .html, then index.html (SPA fallback)
    if (!existsSync(filePath)) {
      filePath = join(DIST, 'index.html');
    }

    try {
      const ext = filePath.match(/\.[^.]+$/)?.[0] || '.html';
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexHtml);
    }
  });

  return new Promise(resolve => server.listen(PORT, () => resolve(server)));
}

async function prerender() {
  console.log(`[prerender] Starting server on port ${PORT}...`);
  const server = await startServer();

  let browser;
  try {
    // Try @sparticuz/chromium first (works on Vercel/AWS Lambda)
    const chromium = await import('@sparticuz/chromium');
    const puppeteerCore = await import('puppeteer-core');
    const execPath = await chromium.default.executablePath();
    console.log(`[prerender] Using @sparticuz/chromium: ${execPath}`);
    browser = await puppeteerCore.default.launch({
      args: chromium.default.args,
      defaultViewport: chromium.default.defaultViewport,
      executablePath: execPath,
      headless: true,
    });
  } catch {
    // Fallback to regular puppeteer (local dev)
    try {
      const puppeteer = await import('puppeteer');
      console.log('[prerender] Using regular puppeteer');
      browser = await puppeteer.default.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } catch {
      console.error('[prerender] No browser found. Install puppeteer or @sparticuz/chromium');
      server.close();
      process.exit(1);
    }
  }

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      // Wait for React Helmet to inject meta tags
      await page.waitForFunction(() => {
        const title = document.querySelector('title');
        return title && !title.textContent.includes('Fun Personality Tests');
      }, { timeout: 5000 }).catch(() => {});

      let html = await page.content();

      // Clean up: remove scripts that break hydration, keep meta tags
      // Add data-prerendered attribute so client can detect
      html = html.replace('<html', '<html data-prerendered="true"');

      // Write to dist
      const outDir = join(DIST, route);
      const outFile = join(outDir, 'index.html');
      mkdirSync(outDir, { recursive: true });
      writeFileSync(outFile, html, 'utf-8');

      success++;
      process.stdout.write(`\r[prerender] ${success + failed}/${routes.length} — ${route}`);
      await page.close();
    } catch (err) {
      failed++;
      console.error(`\n[prerender] FAILED: ${route} — ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`\n[prerender] Done! ${success} success, ${failed} failed out of ${routes.length} routes.`);
}

prerender().catch(err => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
