#!/usr/bin/env node
/** Screenshot + console-error probe using the local Playwright browser cache. */
import { chromium } from "playwright-core";
import { homedir } from "node:os";
import { join } from "node:path";

const [, , url = "http://localhost:4173/", out = "/tmp/atlas-shot.png", width = "1440", height = "900", full = "false"] = process.argv;

const exe = join(
  homedir(),
  "Library/Caches/ms-playwright/chromium_headless_shell-1237/chrome-headless-shell-mac-arm64/chrome-headless-shell",
);

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: full === "true" });
console.log(JSON.stringify({ url, out, errors }, null, 1));
await browser.close();
