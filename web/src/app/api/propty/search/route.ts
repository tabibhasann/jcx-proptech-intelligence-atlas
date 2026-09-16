import { createHash } from "node:crypto";
import { interpretSearch } from "@/lib/propty-ai";

export const runtime = "nodejs";
export const maxDuration = 20;
const buckets = new Map<string, { count: number; expires: number }>();
let active = 0;
let globalWindow = { count: 0, expires: 0 };
const reply = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = new Set([
    new URL(request.url).origin,
    "https://jcx-proptech-intelligence-atlas.vercel.app",
    "https://propty.tabibhasan.com",
  ]);
  if (!origin || !allowed.has(origin))
    return reply({ error: "Request not allowed" }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ error: "JSON required" }, 415);
  if (!process.env.GEMINI_API_KEY)
    return reply(
      { error: "Smart search is unavailable. Use the filters instead." },
      503,
    );
  // Bounded, instance-local demo protection. Not a distributed billing cap.
  const now = Date.now();
  for (const [id, entry] of buckets)
    if (entry.expires < now) buckets.delete(id);
  const address =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "local";
  const id = createHash("sha256")
    .update(address.split(",")[0].trim())
    .digest("hex");
  const bucket = buckets.get(id) || { count: 0, expires: now + 60000 };
  if (globalWindow.expires < now)
    globalWindow = { count: 0, expires: now + 3600000 };
  if (
    bucket.count >= 8 ||
    buckets.size > 1000 ||
    globalWindow.count >= 150 ||
    active >= 3
  )
    return reply(
      { error: "Smart search is busy. Use the filters or try again shortly." },
      429,
    );
  if (Number(request.headers.get("content-length") || 0) > 2048)
    return reply({ error: "Search is too long" }, 413);
  let raw = "";
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "Search is required" }, 400);
  try {
    const decoder = new TextDecoder();
    let size = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > 2048) {
        await reader.cancel();
        return reply({ error: "Search is too long" }, 413);
      }
      raw += decoder.decode(part.value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return reply({ error: "Invalid request" }, 400);
  }
  let text: unknown;
  try {
    text = JSON.parse(raw).text;
  } catch {
    return reply({ error: "Invalid JSON" }, 400);
  }
  if (typeof text !== "string" || !text.trim() || text.length > 180)
    return reply({ error: "Use 1–180 characters" }, 400);
  bucket.count++;
  buckets.set(id, bucket);
  globalWindow.count++;
  active++;
  try {
    return reply({
      ...(await interpretSearch(text.trim(), request.signal)),
      mode: "gemini",
    });
  } catch {
    return reply(
      {
        error:
          "Smart search could not complete. Standard search is still available.",
      },
      503,
    );
  } finally {
    active--;
  }
}
