/** Static-export navigation and semantic regression checks across every HTML page. */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
const project = dirname(dirname(fileURLToPath(import.meta.url)));
const root = join(project, ".next/server/app");
function walk(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(join(dir,e.name)) : [join(dir,e.name)]); }
const pages = walk(root).filter(f => f.endsWith(".html") && !f.endsWith("_global-error.html"));
const clean = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');
const documents = new Map(pages.map(f => [f, clean(readFileSync(f,"utf8"))]));
const failures = [];
let links = 0;
for (const [file, html] of documents) {
  const name = relative(root,file);
  const route = name === "index.html" ? "/" : "/" + name.replace(/\.html$/, "");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>decode(m[1]));
  if (ids.length !== new Set(ids).size) failures.push(`${route}: duplicate element IDs ${ids.filter((id,i)=>ids.indexOf(id)!==i).join(', ')}`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) failures.push(`${route}: expected one h1`);
  if (!/<button[^>]*class="reading-toggle"[^>]*aria-pressed="false"/.test(html)) failures.push(`${route}: missing accessible easy-reading toggle`);
  if (/user-scalable=no|maximum-scale=1(?:[,"\s])/.test(html)) failures.push(`${route}: browser zoom must remain available`);
  for (const m of html.matchAll(/aria-(?:labelledby|describedby|controls)="([^"]+)"/g)) {
    for (const id of decode(m[1]).split(/\s+/)) if (!ids.includes(id)) failures.push(`${route}: unresolved ARIA reference ${id}`);
  }
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    if (href.startsWith("//")) continue;
    const url = new URL(href, `http://local${route}`);
    if (url.pathname.startsWith("/_next/")) continue;
    const path = decodeURIComponent(url.pathname);
    let target = join(root,path === "/" ? "index.html" : path);
    if (!existsSync(target)) target += ".html";
    if (!existsSync(target) && existsSync(join(project,"public",path))) target = join(project,"public",path);
    if (!existsSync(target)) {failures.push(`${route}: missing local target ${href}`);continue;}
    if (url.hash && documents.has(target) && !documents.get(target).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) failures.push(`${route}: missing anchor ${href}`);
    links++;
  }
}
for (const route of ["guide","research","startups"]) assert.ok(existsSync(join(root,route+".html")),`missing ${route}`);
assert.equal(failures.length,0,failures.join("\n"));
console.log(`Navigation passed: ${pages.length} HTML pages, ${links} local links; single h1, unique IDs and resolved ARIA references.`);
