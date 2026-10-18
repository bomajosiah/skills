// smells: find AI-smell candidates in a repo's UI source and ratchet them so
// counts only go down. Ids match SMELLS.md, which ships next to this script in
// the do-ui, review-ui and improve-ui skills (github.com/bomajosiah/skills).
// No dependencies: copy it into a repo's scripts/ to run the check in CI.
//
//   node smells.mjs [dir]                       print the report
//   node smells.mjs [dir] --out <dir>           also write smells.json + smells.md there
//   node smells.mjs [dir] --baseline            save counts to smells.baseline.json
//   node smells.mjs [dir] --check               fail if any count rises above the baseline
//   --baseline-file <f>   --config <f> (default smells.config.json)   --quiet
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKIP_DIRS = new Set(["node_modules", ".git", ".ux", "dist", "build", "out", ".next", "coverage", "test-results", ".wrangler", "archive"]);
const UI_EXT = /\.(tsx|jsx|vue|svelte|astro|html)$/;
const ANY_EXT = /\.(tsx|jsx|ts|js|mjs|vue|svelte|astro|html)$/;
const TEST_PATH = /(^|\/)(tests?|__tests__|e2e|fixtures?|stories)\/|\.(test|spec|stories)\.[jt]sx?$/;

export const RULES = {
  S1: "Narration slot in a component API",
  A1: "Eyebrow narration",
  "A1-style": "Uppercase tracked text",
  A2: "Long caption / description / hint",
  A3: "Reassurance or permission narration",
  A4: "Mechanism narration",
  A5: "Rationale leak",
  A6: "Status or provenance leak",
  A7: "Sort or scope narration",
  A11: "Chatbot residue",
  B2: "Antithesis tic (X, not Y)",
  B3: "Rule-of-three heading",
  B4: "Second-person hand-holding",
  B5: "Benefit-speak",
  B6: "Vague button verb",
  B7: "Apologetic or dead-end error",
  C8: "Arrow appended to link or button text",
  C5: "Emoji in UI copy",
  C7: "Off-system styling (inline styles, raw colors)",
};

const EYEBROW = "eyebrow|kicker|overline|tagline|pretitle|preheading";
const NARRATE = "subtitle|description|hint|helperText|helpText|caption|lede|blurb|subheading";
const CONTAINER = /Card|Header|TopBar|Section|Panel|Tile|Stat|Hero|Page|Banner|Block/;
// Where a one-line description is the right pattern (SINKS.md).
const LEGIT_OWNER = /Empty|Dialog|Confirm|Alert|Checkbox|Switch|Radio|Toggle|Option/;

const PHRASES = [
  ["A3", /\b(your view|only you\b|only their own|each person sees|no password needed|only the account holder|private to you|just for you|nobody else (can )?sees?)/i],
  ["A4", /\b(is decided by|is determined by|is worked out from|never changes? the|automatically (decides|picks|works))/i],
  ["A5", /(\.\s+not an? \w+\.?$|^not an? \w+\.?$|\brather than\b|\binstead of guessing\b)/i],
  ["A6", /(\bonce (that|the|this) [\w\s]{0,30}\b(is )?live\b|\badapter\b|\bcoming soon\b|\bfrom [\w']+ own records\b|\bnot (yet )?connected\b)/i],
  ["A7", /^(newest|oldest|latest|most recent) first\b|\bper \w+ and per \w+/i],
  ["B2", /\b[\w'-]+(?: [\w'-]+){0,3}, not [\w'-]+/i],
  ["A11", /^(certainly|absolutely|great question|sure thing)\b|\bi hope this helps\b|\bas an ai\b/i],
  ["B5", /\b(seamless(ly)?|effortless(ly)?|supercharge|unlock (the|your)|elevate your|world-class|best-in-class|cutting-edge|game-chang)/i],
  ["B7", /^(oops|uh-oh|whoops)\b|^something went wrong\.?$/i],
  ["B4", /\b(here you can|this page (lets|shows|is where)|lets you\b|allows you to|you('|’)ll (see|find)|this is where)/i],
];
const EMOJI = /\p{Extended_Pictographic}/u;

// Blank comments out while keeping offsets, so line numbers stay true.
function stripComments(src) {
  const blank = (m) => m.replace(/[^\n]/g, " ");
  return src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/(^|[^:"'`\\])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length))).replace(/<!--[\s\S]*?-->/g, blank);
}
const lineAt = (src, i) => src.slice(0, i).split("\n").length;
const words = (s) => (s.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
const clip = (s) => { s = s.replace(/\s+/g, " ").trim(); return s.length > 140 ? s.slice(0, 137) + "…" : s; };

function walk(dir, root, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") && e.name !== ".") { if (SKIP_DIRS.has(e.name) || e.isDirectory()) continue; }
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p, root, out); }
    else if (ANY_EXT.test(e.name) && !e.name.endsWith(".d.ts") || /\.d\.ts$/.test(e.name)) out.push(path.relative(root, p));
  }
  return out;
}

function loadConfig(root, file) {
  const p = path.resolve(root, file || "smells.config.json");
  const cfg = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
  const re = (list = []) => list.map((g) => new RegExp(g));
  return {
    ignore: re(cfg.ignore),
    exceptions: (cfg.exceptions || []).map((x) => ({ rule: x.rule, path: new RegExp(x.path), why: x.why })),
  };
}

// String literals in a chunk of code: "…", '…', `…` (template holes kept as {…}).
function literals(code) {
  const out = [];
  const re = /"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g;
  let m;
  while ((m = re.exec(code))) out.push({ text: (m[1] ?? m[2] ?? m[3]).replace(/\$\{[^}]*\}/g, "{…}"), at: m.index });
  return out;
}

export function scanSmells(root, { config } = {}) {
  const cfg = loadConfig(root, config);
  const findings = [];
  const inline = [];
  const files = walk(root, root).filter((f) => !/(^|\/)smells\.mjs$/.test(f) && !TEST_PATH.test(f) && !cfg.ignore.some((r) => r.test(f)));
  const add = (rule, file, line, text, extra = {}) => {
    const ex = cfg.exceptions.find((x) => x.rule === rule && x.path.test(file));
    findings.push({ rule, file, line, text: clip(text), ...(ex ? { excepted: ex.why || true } : {}), ...extra });
  };

  for (const file of files) {
    const raw = fs.readFileSync(path.join(root, file), "utf8");
    const src = stripComments(raw);
    const ui = UI_EXT.test(file);
    const seen = new Set(); // one phrase finding per string occurrence

    // S1: the component API offers a narration slot (root cause, not an instance).
    // Eyebrow slots count anywhere; subtitle/description slots only on
    // title-bearing containers (a field hint or a dialog description is legit).
    if (/\.d\.ts$|\/(components?|ui|design)\//.test(file)) {
      const re = new RegExp(`\\b(${EYEBROW}|${NARRATE})\\??\\s*:\\s*(string|ReactNode|React\\.ReactNode|PropTypes)`, "g");
      let m;
      while ((m = re.exec(src))) {
        const owner = (src.slice(0, m.index).match(/(?:interface|type|function|const|class)\s+(\w+)/g) || []).pop()?.split(/\s+/).pop() || path.basename(file);
        const eyebrow = new RegExp(`^(${EYEBROW})$`).test(m[1]);
        if (eyebrow || (CONTAINER.test(owner) && !LEGIT_OWNER.test(owner))) add("S1", file, lineAt(src, m.index), `${owner}.${m[0]}`, { slot: m[1] });
      }
    }
    if (/\.d\.ts$/.test(file)) continue;

    if (ui) {
      // A1 / A2: values passed into narration slots (props or object keys).
      const slotRe = new RegExp(`\\b(${EYEBROW}|${NARRATE})\\s*(=|:)\\s*`, "g");
      let m;
      while ((m = slotRe.exec(src))) {
        const slot = m[1];
        const isEyebrow = new RegExp(`^(${EYEBROW})$`).test(slot);
        const rest = src.slice(m.index + m[0].length, m.index + m[0].length + 400);
        const lit = literals(rest.startsWith("{") ? rest.slice(0, matchBrace(rest)) : rest.split(/\s(?=[a-zA-Z-]+=)|\/?>|\n/)[0]);
        const text = lit.map((l) => l.text).join(" | ") || rest.split("\n")[0];
        const line = lineAt(src, m.index);
        if (isEyebrow) add("A1", file, line, `${slot}: ${text}`);
        else if (lit.some((l) => words(l.text) > 8)) {
          const owner = (src.slice(Math.max(0, m.index - 1500), m.index).match(/<([A-Z][\w.]*)/g) || []).pop()?.slice(1) || "";
          if (!LEGIT_OWNER.test(owner)) add("A2", file, line, `${owner ? owner + " " : ""}${slot}: ${text}`);
        }
        if (isEyebrow && lit.some((l) => /^[^,]+, [^,]+,? and [^,]+$/.test(l.text))) add("B3", file, line, text);
      }
      // B6 / C8: button and link text.
      const btn = /<(button|Button|a|Link)\b[^>]*>\s*([^<>{}]{1,40}?)\s*</g;
      while ((m = btn.exec(src))) {
        const t = m[2].trim();
        if (/^(submit|ok|okay|continue|confirm|done|go|click here|yes|proceed)$/i.test(t)) add("B6", file, lineAt(src, m.index), t);
        if (/\s(→|->|›)$/.test(t)) add("C8", file, lineAt(src, m.index), t);
      }
      // A1-style: uppercase + tracking in the same element.
      const upRe = /textTransform:\s*["']uppercase["']|\buppercase\b(?=[^"'`]*\btracking-)|text-transform:\s*uppercase/g;
      while ((m = upRe.exec(src))) {
        const near = src.slice(Math.max(0, m.index - 300), m.index + 300);
        if (/letterSpacing|letter-spacing|tracking-/.test(near)) add("A1-style", file, lineAt(src, m.index), src.slice(m.index, m.index + 80).split("\n")[0]);
      }
      // C7: inline style objects and raw colors (counted per file).
      const styles = (src.match(/style=\{\{/g) || []).length;
      const hex = (src.match(/["'`]#[0-9a-fA-F]{3,8}\b/g) || []).length;
      if (styles + hex) inline.push({ file, styles, hex });
    }

    // Phrase rules: JSX text and string literals, in UI files and in any
    // module that ships copy to the UI (API strings land on screen too).
    const texts = [];
    if (ui) { const jt = />([^<>{}]*[A-Za-z][^<>{}]*)</g; let m; while ((m = jt.exec(src))) if (words(m[1]) >= 3 || /^\s*(oops|uh-oh|whoops)\b/i.test(m[1])) texts.push({ text: m[1].trim(), at: m.index + 1 }); }
    // Outside UI files, skip prompt-shaped text (multi-line, bulleted, long):
    // model instructions aren't screen copy.
    const promptish = (t) => !ui && (/\\n|\n/.test(t) || /^\s*-\s/.test(t) || t.length > 220);
    for (const l of literals(src)) if (words(l.text) >= 3 && !promptish(l.text) && !/^[\w./@-]+$/.test(l.text) && !/[{};=]|^\s*(import|SELECT|INSERT|UPDATE)\b/.test(l.text.replace(/\{…\}/g, ""))) texts.push(l);
    for (const t of texts) {
      for (const [rule, re] of PHRASES) {
        const key = `${rule}:${t.at}`;
        if (seen.has(key) || !re.test(t.text)) continue;
        seen.add(key);
        add(rule, file, lineAt(src, t.at), t.text, ui ? {} : { server: true });
      }
      if (ui && EMOJI.test(t.text) && !seen.has(`C5:${t.at}`)) { seen.add(`C5:${t.at}`); add("C5", file, lineAt(src, t.at), t.text); }
    }
  }

  for (const f of inline.sort((a, b) => b.styles + b.hex - (a.styles + a.hex))) {
    for (let i = 0; i < f.styles + f.hex; i++) findings.push({ rule: "C7", file: f.file, line: 0, text: `${f.styles} inline styles, ${f.hex} raw colors`, count: true });
  }

  const counts = {};
  for (const f of findings) if (!f.excepted) counts[f.rule] = (counts[f.rule] || 0) + 1;
  return { generatedAt: new Date().toISOString(), root: path.basename(root), files: files.length, counts, findings };
}

function matchBrace(s) {
  let d = 0;
  for (let i = 0; i < s.length; i++) { if (s[i] === "{") d++; else if (s[i] === "}" && --d === 0) return i + 1; }
  return s.length;
}

export function smellsMarkdown(r, baseline) {
  const L = [`# AI smells · ${r.root}`, "", `Scanned ${r.files} files, ${r.generatedAt.slice(0, 10)}. Candidates, not verdicts: judge each in context (review-ui). Ids are explained in SMELLS.md.`, ""];
  L.push("| Id | Smell | Count | Baseline |", "|---|---|---|---|");
  for (const id of Object.keys(RULES)) {
    const n = r.counts[id] || 0, b = baseline?.counts?.[id];
    if (n || b) L.push(`| ${id} | ${RULES[id]} | ${n} | ${b ?? "–"} |`);
  }
  const s1 = r.findings.filter((f) => f.rule === "S1");
  if (s1.length) {
    L.push("", "## Causes: narration slots in component APIs", "", "Every instance below traces back to one of these. Remove or restrict the slot before sweeping screens.", "");
    for (const f of s1) L.push(`- \`${f.file}:${f.line}\` · \`${f.text}\``);
  }
  for (const id of Object.keys(RULES)) {
    if (id === "S1") continue;
    const list = r.findings.filter((f) => f.rule === id);
    if (!list.length) continue;
    L.push("", `## ${id} · ${RULES[id]} (${list.length})`, "");
    if (id === "C7") {
      const byFile = [...new Map(list.map((f) => [f.file, f])).values()];
      for (const f of byFile.slice(0, 25)) L.push(`- \`${f.file}\`: ${f.text}`);
      if (byFile.length > 25) L.push(`- …and ${byFile.length - 25} more files`);
      continue;
    }
    const line = (f) => `- \`${f.file}:${f.line}\` ${f.excepted ? "(excepted) " : ""}"${f.text}"`;
    const screen = list.filter((f) => !f.server), server = list.filter((f) => f.server);
    for (const f of screen.slice(0, 60)) L.push(line(f));
    if (screen.length > 60) L.push(`- …and ${screen.length - 60} more (see smells.json)`);
    if (server.length) {
      L.push("", `<details><summary>${server.length} in server or data modules: on screen only if returned to the UI</summary>`, "");
      for (const f of server.slice(0, 40)) L.push(line(f));
      if (server.length > 40) L.push(`- …and ${server.length - 40} more`);
      L.push("", "</details>");
    }
  }
  return L.join("\n") + "\n";
}

// Ratchet: fail when any count rises above the baseline. No baseline means zero.
export function checkSmells(r, baseline) {
  const over = [];
  for (const [id, n] of Object.entries(r.counts)) {
    const b = baseline?.counts?.[id] ?? 0;
    if (n > b) over.push(`${id} ${RULES[id]}: ${n} (baseline ${b})`);
  }
  return over;
}

export function runSmells(root, args = []) {
  const flag = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
  const out = flag("out") && path.resolve(root, flag("out"));
  const baseFile = path.resolve(root, flag("baseline-file") || "smells.baseline.json");
  const r = scanSmells(root, { config: flag("config") });
  const baseline = fs.existsSync(baseFile) ? JSON.parse(fs.readFileSync(baseFile, "utf8")) : null;
  const md = smellsMarkdown(r, baseline);
  const total = Object.values(r.counts).reduce((a, b) => a + b, 0);
  if (out) {
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, "smells.json"), JSON.stringify(r, null, 2) + "\n");
    fs.writeFileSync(path.join(out, "smells.md"), md);
  } else if (!args.includes("--check") && !args.includes("--baseline") && !args.includes("--quiet")) {
    console.log(md);
  }
  console.log(`smells: ${total} candidates in ${r.files} files${out ? ` → ${path.relative(process.cwd(), path.join(out, "smells.md"))}` : ""}`);
  console.log("  " + (Object.entries(r.counts).map(([k, v]) => `${k} ${v}`).join(" · ") || "none"));
  if (args.includes("--baseline")) {
    fs.mkdirSync(path.dirname(baseFile), { recursive: true });
    fs.writeFileSync(baseFile, JSON.stringify({ at: r.generatedAt, counts: r.counts }, null, 2) + "\n");
    console.log(`baseline saved → ${path.relative(process.cwd(), baseFile)}`);
  }
  if (args.includes("--check")) {
    const over = checkSmells(r, baseline);
    if (over.length) { console.error("smells check failed:\n  " + over.join("\n  ")); process.exitCode = 1; }
    else console.log(`smells check passed${baseline ? "" : " (no baseline: held to zero)"}`);
  }
  return r;
}

// Compare real paths: skill installers symlink the skill folder, so argv[1]
// can name the link while import.meta.url names the target.
const isMain = (() => { try { return fs.realpathSync(fileURLToPath(import.meta.url)) === fs.realpathSync(process.argv[1]); } catch { return false; } })();
if (isMain) {
  const args = process.argv.slice(2);
  const valued = new Set(["--out", "--baseline-file", "--config"]);
  const dir = args.find((a, i) => !a.startsWith("--") && !valued.has(args[i - 1]));
  runSmells(path.resolve(dir || "."), args);
}
