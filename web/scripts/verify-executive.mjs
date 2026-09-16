/** Regression checks for the compiled executive presentation and its local links. */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, ".next/server/app");
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
      assert.ok(existsSync(join(root, "public", url.pathname)) || existsSync(join(output, url.pathname)), `${route}: asset exists ${href}`);
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
const visiblePlan = plan.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
assert.equal((visiblePlan.match(/class="xp-transfer-group"/g) ?? []).length, 3, "transfer lessons have three explicit groups");
for (const id of ["transfer-adapt", "transfer-validate", "transfer-later"]) {
  const group = visiblePlan.match(new RegExp(`<section[^>]*aria-labelledby="${id}"[^>]*>([\\s\\S]*?)</section>`));
  assert.ok(group, `transfer group ${id} exists`);
  assert.equal((group[1].match(/<article\b/g) ?? []).length, 2, `${id} has two lessons`);
}
assert.ok(!visiblePlan.includes('class="xp-transfer-grid"'), "broken sparse desktop grid is not rendered");
console.log(`Executive presentation: 3 routes, 20 comparison cells and ${linksChecked} local links/anchors checked.`);
