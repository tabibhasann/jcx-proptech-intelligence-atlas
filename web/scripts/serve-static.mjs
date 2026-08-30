#!/usr/bin/env node
/** Minimal static server for the exported site (out/). */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT ?? 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
    path = normalize(path).replace(/^([/\\])+/, "");
    let file = join(root, path);
    let s = await stat(file).catch(() => null);
    if (s?.isDirectory()) {
      file = join(file, "index.html");
      s = await stat(file).catch(() => null);
    }
    if (!s) {
      file = join(root, `${path}.html`);
      s = await stat(file).catch(() => null);
    }
    let is404 = false;
    if (!s) {
      file = join(root, "404.html");
      s = await stat(file).catch(() => null);
      if (!s) throw new Error("not found");
      is404 = true;
    }
    const body = await readFile(file);
    res.writeHead(is404 ? 404 : 200, {
      "content-type": MIME[extname(file)] ?? "application/octet-stream",
      "cache-control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found");
  }
}).listen(port, () => console.log(`serving out/ at http://localhost:${port}`));
