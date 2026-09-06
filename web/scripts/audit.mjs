#!/usr/bin/env node
/** Full-page audit screenshots + console error capture across all routes. */
import { chromium } from "playwright-core";
import { homedir } from "node:os";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";

const exe = join(
  homedir(),
  "Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell",
);

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "/tmp/audit";
const width = Number(process.argv[4] ?? 1440);
const tag = process.argv[5] ?? "d";

await mkdir(outDir, { recursive: true });

const routes = [
  ["home", "/"],
  ["atlas", "/atlas"],
  ["frontier", "/frontier"],
  ["evidence", "/evidence"],
  ["standards", "/standards"],
  ["methodology", "/methodology"],
];

const browser = await chromium.launch({ executablePath: exe });
const report = [];

for (const [name, path] of routes) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e?.message ?? e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(base + path, { waitUntil: "networkidle" });
  // scroll through to trigger reveals, then return to top
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.screenshot({ path: join(outDir, `${tag}-${name}.png`), fullPage: true });
  report.push({ name, path, height, errors: errors.length ? errors : undefined });
  await page.close();
}

console.log(JSON.stringify(report, null, 1));
await browser.close();
