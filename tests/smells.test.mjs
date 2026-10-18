// Each rule fires on the bad fixture and stays silent on the clean one.
// Run: node --test test/*.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scanSmells, RULES } from "../shared/ui/scripts/smells.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const bad = scanSmells(path.join(here, "smells", "bad"));
const clean = scanSmells(path.join(here, "smells", "clean"));

for (const id of Object.keys(RULES)) {
  test(`${id} fires on the bad fixture`, () => assert.ok(bad.counts[id] > 0, `${id} ${RULES[id]} did not fire`));
}
test("clean fixture reports nothing", () => assert.deepEqual(clean.findings.map((f) => `${f.rule} ${f.file}:${f.line} ${f.text}`), []));

// Skill installers symlink skill folders; the CLI must still run through the link.
test("runs as a CLI through a symlinked skill folder", async () => {
  const { execFileSync } = await import("node:child_process");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "smells-"));
  fs.symlinkSync(path.join(here, "..", "shared", "ui"), path.join(tmp, "skill"));
  const out = execFileSync(process.execPath, [path.join(tmp, "skill", "scripts", "smells.mjs"), path.join(here, "smells", "clean"), "--quiet"], { encoding: "utf8" });
  fs.rmSync(tmp, { recursive: true, force: true });
  assert.match(out, /smells: 0 candidates/);
});
