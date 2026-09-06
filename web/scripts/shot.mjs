#!/usr/bin/env node
/** Screenshot + console-error probe using the local Playwright browser cache.
 *  usage: shot.mjs <url> <out.png> [width] [height] [full] [scrollY] */
import { chromium } from "playwright-core";
import { homedir } from "node:os";
import { join } from "node:path";

const [, , url = "http://localhost:3000/", out = "/tmp/shot.png", width = "1440", height = "900", full = "false", scrollY = "0"] =
  process.argv;

const exe = join(
  homedir(),
  "Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell",
);

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
if (Number(scrollY) > 0) {
  await page.evaluate((y) => window.scrollTo(0, y), Number(scrollY));
  await page.waitForTimeout(900);
}
await page.waitForTimeout(700);
await page.screenshot({ path: out, fullPage: full === "true" });
console.log(JSON.stringify({ url, out, scrollY, errors }, null, 1));
await browser.close();
