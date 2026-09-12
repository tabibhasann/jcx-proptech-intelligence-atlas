import { spawnSync } from "node:child_process";

const steps = [
  "build:data",
  "verify",
  "typecheck",
  "build",
  "verify:output",
  "verify:corpus",
];

for (const step of steps) {
  console.log(`\nrelease gate: npm run ${step}`);
  const result = spawnSync("npm", ["run", step], { stdio: "inherit", shell: process.platform === "win32" });
  if (result.error) {
    console.error(`release gate failed to start: ${step}`, result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`release gate failed: ${step}`);
    process.exit(result.status ?? 1);
  }
}

console.log("\nrelease-check PASSED: public data, validation, negative tests, typecheck, production build, output privacy scan and corpus checks");
