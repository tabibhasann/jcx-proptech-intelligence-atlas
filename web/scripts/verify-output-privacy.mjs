#!/usr/bin/env node
/** Scan the compiled public export for concrete client-only markers. */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, ".next/server/app");
const markers = [
  "JCX_Meeting_Dossier",
  "JCX_Meeting_Cheat_Sheet",
  "JCX_Second_Pass_Strategy",
  "JCX_Meeting_Notes_Template",
  "phone number (Landowner)",
  "jcxbd.com",
  "odoo.com",
  "talk track",
  "meeting script",
  "Propman",
];

if (!existsSync(output)) {
  console.error("compiled export missing: run npm run build first");
  process.exit(1);
}

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (!path.startsWith(output) || /\.(html|rsc|body)$/.test(path)) files.push(path);
  }
};
walk(output);
walk(join(root,".next/static"));
walk(join(root,"public"));

const hits = [];
for (const path of files) {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    continue;
  }
  for (const marker of markers) {
    if (text.toLowerCase().includes(marker.toLowerCase())) hits.push({ marker, path });
  }
}

if (hits.length) {
  for (const hit of hits) console.error(`private marker "${hit.marker}" found in ${hit.path}`);
  process.exit(1);
}
console.log(`compiled export privacy: ${files.length} files scanned, no concrete client-only markers found`);
