#!/usr/bin/env node
/** Capture a sequence of scroll offsets on one page.
 *  usage: shots.mjs <url> <outPrefix> <width> <height> <y1,y2,y3...> [settleMs] */
import { chromium } from "playwright-core";
import { homedir } from "node:os";
import { join } from "node:path";

const [, , url, prefix = "/tmp/seq", width = "1440", height = "900", offsets = "0", settle = "1200"] =
  process.argv;

const exe = join(
  homedir(),
  "Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell",
);

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e?.message ?? e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(Number(settle));

const ys = offsets.split(",").map(Number);
for (const y of ys) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(Number(settle));
  await page.screenshot({ path: `${prefix}-${y}.png` });
}
console.log(JSON.stringify({ url, shots: ys.length, errors }, null, 1));
await browser.close();
