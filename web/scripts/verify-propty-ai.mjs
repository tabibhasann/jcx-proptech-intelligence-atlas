import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const asModule = (source) =>
  `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText).toString("base64")}`;
const fixture = asModule(
  readFileSync(
    new URL("../src/content/propty-demo.ts", import.meta.url),
    "utf8",
  ),
);
const library = asModule(
  readFileSync(
    new URL("../src/lib/propty-ai.ts", import.meta.url),
    "utf8",
  ).replace('"../content/propty-demo"', JSON.stringify(fixture)),
);
const { validateInterpretation } = await import(library);
const { propertyAreas } = await import(fixture);
const good = {
  area: "Bashundhara",
  maxPrice: 18000000,
  minBedrooms: 3,
  readyOnly: true,
  features: ["parking"],
  homeName: "",
  unsupported: [],
};
assert.deepEqual(validateInterpretation(good), {
  query: {
    area: "Bashundhara",
    budget: 18000000,
    bedrooms: 3,
    readyOnly: true,
  },
  terms: ["parking"],
  unsupported: [],
});
const rental = {
  ...good,
  transaction: "rent",
  maxPrice: 85000,
  minSqft: 1200,
  maxSqft: 1800,
  minBathrooms: 2,
  availableNow: true,
  newProjectsOnly: false,
  furnishing: "Furnished",
  amenities: ["balcony"],
};
assert.equal(validateInterpretation(rental).query.transaction, "rent");
assert.equal(validateInterpretation(rental).query.budget, 85000);
assert.equal(validateInterpretation(rental).query.minSqft, 1200);
assert.throws(() => validateInterpretation({ ...rental, transaction: "lease" }));
assert.throws(() => validateInterpretation({ ...rental, minSqft: 2000, maxSqft: 1000 }));
for (const area of propertyAreas) {
  assert.equal(validateInterpretation({ ...good, area }).query.area, area);
}
for (const bad of [
  { ...good, area: "Imaginary area" },
  { ...good, maxPrice: -1 },
  { ...good, minBedrooms: 3.5 },
  { ...good, features: ["pool"] },
  { ...good, readyOnly: "yes" },
  { ...good, unsupported: [5] },
  null,
])
  assert.throws(() => validateInterpretation(bad));
const { POST } = await import(
  asModule(
    readFileSync(
      new URL("../src/app/api/propty/search/route.ts", import.meta.url),
      "utf8",
    ).replace('"@/lib/propty-ai"', JSON.stringify(library)),
  )
);
const request = (
  body,
  origin = "http://localhost:4174",
  type = "application/json",
) =>
  new Request("http://localhost:4174/api/propty/search", {
    method: "POST",
    headers: { origin, "content-type": type },
    body,
  });
delete process.env.GEMINI_API_KEY;
assert.equal((await POST(request('{"text":"hello"}'))).status, 503);
process.env.GEMINI_API_KEY = "test-only-not-a-real-key";
assert.equal(
  (await POST(request('{"text":"hello"}', "https://example.com"))).status,
  403,
);
assert.equal((await POST(request("{}", undefined, "text/plain"))).status, 415);
assert.equal((await POST(request("broken"))).status, 400);
assert.equal((await POST(request('{"text":5}'))).status, 400);
assert.equal(
  (await POST(request(JSON.stringify({ text: "x".repeat(181) })))).status,
  400,
);
assert.equal((await POST(request("x".repeat(2049)))).status, 413);
globalThis.fetch = async () =>
  Response.json({
    candidates: [{ content: { parts: [{ text: JSON.stringify(good) }] } }],
  });
let response = await POST(request('{"text":"Bashundhara below 1.8 crore"}'));
assert.equal(response.status, 200);
assert.equal((await response.json()).mode, "gemini");
response = await POST(request(JSON.stringify({ text: "Bashundhara", transaction: "rent" })));
assert.equal(response.status, 200);
assert.equal((await response.json()).query.transaction, "rent");
assert.equal((await POST(request(JSON.stringify({ text: "Bashundhara", transaction: "lease" })))).status, 400);
globalThis.fetch = async () => {
  throw new Error("private upstream detail");
};
response = await POST(request('{"text":"Bashundhara"}'));
assert.equal(response.status, 503);
assert.ok(!(await response.text()).includes("private upstream detail"));
globalThis.fetch = async () =>
  Response.json({
    candidates: [{ content: { parts: [{ text: JSON.stringify(good) }] } }],
  });
const statuses = [];
for (let i = 0; i < 9; i++)
  statuses.push((await POST(request('{"text":"Bashundhara"}'))).status);
assert.ok(statuses.includes(429));
console.log(
  "AI search checks passed: structured criteria, invalid model output, origin, body limits, unavailable provider, sanitized errors and request throttling. No live API calls.",
);
