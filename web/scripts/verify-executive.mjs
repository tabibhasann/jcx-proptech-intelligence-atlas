/** Regression checks for the compiled executive presentation and its local links. */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "out");
const routes = ["/", "/capabilities", "/plan"];
const htmlFor = (route) => readFileSync(join(output, route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8");
let linksChecked = 0;
for (const route of routes) {
  const html = htmlFor(route);
  const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.equal((visibleHtml.match(/<h1\b/g) ?? []).length, 1, `${route}: exactly one main heading`);
  assert.ok(!visibleHtml.includes("—"), `${route}: no em dashes in rendered copy`);
  for (const match of visibleHtml.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href, `http://localhost${route}`);
    if (url.pathname.startsWith("/_next/")) continue;
    if (/\.[a-z0-9]+$/i.test(url.pathname)) {
      assert.ok(existsSync(join(output, url.pathname)), `${route}: asset exists ${href}`);
      continue;
    }
    const target = htmlFor(url.pathname);
    if (url.hash) {
      assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: anchor exists ${href}`);
    }
    linksChecked++;
  }
}
const home = htmlFor("/");
for (const text of ["A clearer way", "Beike", "Bayut", "NoBroker", "99acres", "Illustrative pilot schedule", "ex-priority-panel", "FY2026"]) {
  assert.ok(home.includes(text), `overview contains ${text}`);
}
const matrix = htmlFor("/capabilities").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
assert.equal((matrix.match(/<td\b/g) ?? []).length, 20, "four companies by five capabilities");
assert.ok(matrix.includes("Missing evidence does not mean a missing feature"), "unknown-state caveat remains visible");
assert.ok(matrix.includes("Operating PBT") || matrix.includes("operating PBT"), "accounting measure stays defined");
const plan = htmlFor("/plan");
assert.ok(!plan.includes("Propman"), "private document alias not included in public export");
console.log(`Executive presentation: 3 routes, 20 comparison cells and ${linksChecked} local links/anchors checked.`);
