import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Transpile the isolated fixture so this check also works on Node 20.
const file = new URL("../src/content/propty-demo.ts", import.meta.url);
const source = readFileSync(file, "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
  },
});
const { properties, filterProperties, formatPrice, DEMO_NOTICE } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

assert.ok(properties.length >= 40);
for (const id of ["banyan", "lightwell", "terrace", "courtyard", "horizon", "garden"])
  assert.ok(properties.some((property) => property.id === id), `preserved id: ${id}`);
assert.equal(
  new Set(properties.map((property) => property.id)).size,
  properties.length,
);
assert.match(DEMO_NOTICE, /fictional/i);
assert.ok(!source.includes("—"), "Demo copy must not contain em dashes");
for (const property of properties) {
  assert.equal(property.isDemo, true);
  assert.ok(property.price >= 6_500_000 && property.price <= 40_000_000);
  assert.ok(
    property.bedrooms > 0 && property.bathrooms > 0 && property.sqft > 0,
  );
  assert.ok(property.images.length > 0);
  assert.ok(
    property.images.every((image) => /^\/propty\/home-[1-6]\.jpg$/.test(image)),
  );
  assert.ok(property.checks.some((check) => /not checked/i.test(check.label)));
}

assert.equal(formatPrice(17_500_000), "BDT 1.75 crore");
assert.equal(formatPrice(1_500_000), "BDT 15 lakh");
assert.equal(formatPrice(Number.NaN), "Price unavailable");
assert.equal(filterProperties().length, properties.length);
assert.deepEqual(
  filterProperties({
    area: " bashundhara ",
    budget: 18_000_000,
    bedrooms: 3,
    readyOnly: true,
  }).map((property) => property.id),
  ["banyan", "lightwell"],
);
assert.deepEqual(
  filterProperties({ area: "Bashundhara", budget: 16_000_000 }).map(
    (property) => property.id,
  ),
  ["lightwell", "daybreak"],
);
assert.ok(filterProperties({ area: "Dhanmondi", readyOnly: true }).length > 0);
assert.deepEqual(filterProperties({ area: "Gulshan", budget: 18_000_000 }), []);
assert.deepEqual(filterProperties({ budget: 0 }), []);
assert.equal(filterProperties({ area: "All areas" }).length, properties.length);
assert.ok(filterProperties({ bedrooms: 4 }).length >= 5);
assert.ok(filterProperties({ readyOnly: true }).length > 20);
assert.deepEqual(filterProperties({}, []), []);
console.log(
  `Propty demo fixtures: ${properties.length} sample homes; filters, currency and disclosure checks passed.`,
);

const searchSource = readFileSync(
  new URL("../src/content/propty-search.ts", import.meta.url),
  "utf8",
);
const searchJs = ts
  .transpileModule(searchSource, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
    },
  })
  .outputText.replace(
    '"./propty-demo"',
    JSON.stringify(
      `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`,
    ),
  );
const { parseHomeSearch, matchesHomeText } = await import(
  `data:text/javascript;base64,${Buffer.from(searchJs).toString("base64")}`
);
const search = (text) => {
  const parsed = parseHomeSearch(text);
  return filterProperties(parsed.query)
    .filter((p) => matchesHomeText(p, parsed.terms))
    .map((p) => p.id);
};
assert.deepEqual(search("3 bedrooms in Bashundhara under 1.8 crore"), [
  "banyan",
  "lightwell",
]);
const readyParking = search("ready homes with parking");
const expectedReadyParking = properties
  .filter((p) => p.status === "Ready" && p.features.some((f) => f.toLowerCase().includes("parking")))
  .map((p) => p.id);
assert.deepEqual(readyParking, expectedReadyParking);
assert.deepEqual(search("Gulshan under 150 lakh"), []);
assert.deepEqual(search("Lightwell"), ["lightwell"]);
assert.deepEqual(search("rooftop pool"), []);
assert.deepEqual(
  search(""),
  properties.map((p) => p.id),
);
assert.ok(search("3 bedrooms in Uttara under 2 crore").includes("lakeview"));
const banglaMixed = parseHomeSearch("Uttara এ ready বাসা");
assert.equal(banglaMixed.query.area, "Uttara");
assert.equal(banglaMixed.query.readyOnly, true);
assert.equal(parseHomeSearch("under 1.7 cr").query.budget, 17000000);
assert.equal(parseHomeSearch("5 bedrooms").query.bedrooms, 5);
assert.ok(!Number.isNaN(parseHomeSearch("under 1.2.3 crore").query.budget));
console.log(
  "Free-text demo search: exact matches, price units, features, custom filters and no-match checks passed.",
);
