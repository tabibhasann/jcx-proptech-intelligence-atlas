import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../out/companies.html", import.meta.url), "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const table = html.match(/<table class="co-table co-decision-table">([\s\S]*?)<\/table>/)?.[1];
assert.ok(table, "The decision table must be the default server-rendered view");
assert.equal((table.match(/scope="col"/g) ?? []).length, 5, "Expected five decision columns");
const ids = [...table.matchAll(/<tr id="company-([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, 27, "Keep all reviewed company rows");
assert.equal(new Set(ids).size, ids.length, "No duplicated company identities");
assert.equal((table.match(/class="co-feature-list"/g) ?? []).length, ids.length, "Every row needs features");
assert.equal((table.match(/data-label="Our Bangladesh proposal"/g) ?? []).length, ids.length, "Every row needs a local adaptation");
assert.equal((table.match(/colSpan="5"|colspan="5"/g) ?? []).length, ids.length, "Expanded rows must span the current columns");
for (const id of ids) assert.ok(html.includes(`id="detail-${id}"`), `Missing detail for ${id}`);
for (const m of html.matchAll(/href="\/companies\?company=([^"&]+)"/g)) assert.ok(ids.includes(m[1]), `Unknown company target ${m[1]}`);
for (const anchor of ["propty-features", "propty-roadmap"]) assert.ok(html.includes(`id="${anchor}"`));
assert.ok(html.includes("not proven local outcomes"), "Local proposals need an explicit evidence boundary");
assert.ok(html.includes("If sales have not closed"), "Do not imply a 12-week profit proof");
console.log(`Company summary passed: ${ids.length} identities, five columns, expandable details, company targets and roadmap caveats.`);
