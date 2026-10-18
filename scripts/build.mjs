import { readdir, readFile, mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(path.join(root, 'site/config.json'), 'utf8'));
if (!/^[\w.-]+\/[\w.-]+$/.test(config.repository)) throw new Error('Set repository to owner/repo.');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Shared references are canonical in shared/<suite>/ and copied into each skill
// that lists them, so every skill still installs on its own.
const shared = JSON.parse(await readFile(path.join(root, 'shared/manifest.json'), 'utf8'));
for (const [skill, files] of Object.entries(shared)) {
  for (const file of files) {
    // ui/scripts/smells.mjs → skills/<skill>/scripts/smells.mjs
    const dest = path.join(root, 'skills', skill, file.split('/').slice(1).join('/'));
    await mkdir(path.dirname(dest), {recursive:true});
    await cp(path.join(root, 'shared', file), dest);
  }
}
const skills = [];
for (const entry of await readdir(path.join(root, 'skills'), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const source = await readFile(path.join(root, 'skills', entry.name, 'SKILL.md'), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Missing frontmatter: ${entry.name}`);
  const name = match[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const rawDescription = match[1].match(/^description:[ \t]*(.*)$/m)?.[1]?.trim();
  const description = rawDescription && /^[>|]/.test(rawDescription)
    ? match[1].split('\n').slice(2).filter(line => /^\s+/.test(line)).map(line => line.trim()).join(' ')
    : rawDescription;
  if (name !== entry.name || !description) throw new Error(`Invalid name/description: ${entry.name}`);
  skills.push({name, description});
}
const byName = new Map(skills.map(skill => [skill.name, skill]));
const used = new Set();
const groups = config.groups.map(group => ({...group, entries: Object.entries(group.skills).map(([name, description]) => {
  if (!byName.has(name)) throw new Error(`Catalog references missing skill: ${name}`);
  if (used.has(name)) throw new Error(`Duplicate catalog skill: ${name}`);
  used.add(name); return {name, description};
})}));
const extra = skills.filter(skill => !used.has(skill.name));
if (extra.length) groups.push({title:'More skills',description:'More guidance for building better products.',entries:extra});
const repository = `https://github.com/${config.repository}`;
const command = `npx skills add ${config.repository}`;
const sections = groups.map(group => `<section><h2>${escape(group.title)}</h2><p>${escape(group.description)}</p><ul>${group.entries.map(skill => `<li><a href="${repository}/tree/${encodeURIComponent(config.branch)}/skills/${encodeURIComponent(skill.name)}"><code>${escape(skill.name)}</code></a><p>${escape(skill.description)}</p></li>`).join('')}</ul></section>`).join('');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Skills — ${escape(config.author)}</title><meta name="description" content="Agent skills for designers and engineers. Build products with clearer structure and interfaces that read as designed, not generated."><link rel="canonical" href="https://${escape(config.domain)}/"><link rel="stylesheet" href="/style.css"><script src="/copy.js" defer></script></head>
<body><main><header><a href="https://bomajosiah.com">${escape(config.author)}</a><a class="repo" href="${repository}">GitHub</a></header><h1>Skills for better products.</h1><p class="intro">A growing collection of agent skills for designers and engineers. Starting with structure, then the surface: information architecture and UI without the AI smells.</p><div class="install"><code id="install-command">${escape(command)}</code><button type="button" data-copy aria-label="Copy install command">Copy</button></div><p class="hint">Run in your terminal. Choose the skills and agent you want to install them for.</p><span id="copy-status" role="status" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"></span>${sections}<section class="usage"><h2>Put a skill to work</h2><p>After installing, ask your agent to use a skill by name. For example: <code>Use do-ia to plan the structure of this app.</code></p><p>Only need one? Run <code>npx skills add ${escape(config.repository)} --skill do-ia</code>.</p></section><footer><span>Made by ${escape(config.author)}</span><a href="${repository}">Read the skills on GitHub</a></footer></main></body></html>`;
const dist = path.join(root, 'dist');
await rm(dist, {recursive:true, force:true});
await mkdir(dist, {recursive:true});
await writeFile(path.join(dist, 'index.html'), html);
for (const file of ['style.css', 'copy.js']) await cp(path.join(root, 'site', file), path.join(dist, file));
await writeFile(path.join(dist, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found</title><link rel="stylesheet" href="/style.css"><main><h1>Page not found.</h1><a href="/">Back to the skills</a></main></html>');
console.log(`Built landing page with ${skills.length} skills in ${groups.length} categories.`);
