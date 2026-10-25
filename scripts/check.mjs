// Checks this repository the way CI does: every file name starts in lower
// case (except the names agents look for), no text is in Cyrillic, every local
// link of a page resolves, workspace.json is consistent, and every script
// parses and imports Node's built-in modules only. Exits with 1 on a failure.
//
//   node scripts/check.mjs

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = spawnSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
  .stdout.split('\n')
  .filter((file) => file !== '');

const toolNames = ['AGENTS.md', 'CLAUDE.md'];
const failures = [];
const cyrillic = new RegExp(`[${String.fromCodePoint(0x400)}-${String.fromCodePoint(0x4ff)}]`);

for (const file of files) {
  const name = basename(file);
  if (!toolNames.includes(name) && /^[A-Z]/.test(name)) {
    failures.push(`${file}: the file name starts with a capital letter`);
  }
  readFileSync(join(root, file), 'utf8')
    .split('\n')
    .forEach((line, index) => {
      if (cyrillic.test(line)) {
        failures.push(`${file}:${index + 1}: Cyrillic text; this repository is in English`);
      }
    });
}

for (const file of files.filter((item) => item.endsWith('.md'))) {
  const text = readFileSync(join(root, file), 'utf8');
  for (const match of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (target === '' || /^[a-z]+:/.test(target)) {
      continue;
    }
    if (!existsSync(join(root, dirname(file), target))) {
      failures.push(`${file}: the link to ${target} does not resolve`);
    }
  }
}

const workspace = JSON.parse(readFileSync(join(root, 'workspace.json'), 'utf8'));
for (const repository of workspace.repositories) {
  if (!(repository.profile in workspace.profiles)) {
    failures.push(`workspace.json: ${repository.path} has the unknown profile ${repository.profile}`);
  }
}

for (const file of files.filter((item) => item.startsWith('scripts/') && item.endsWith('.mjs'))) {
  const parsed = spawnSync(process.execPath, ['--check', join(root, file)], { encoding: 'utf8' });
  if (parsed.status !== 0) {
    failures.push(`${file}: does not parse: ${parsed.stderr.trim()}`);
  }
  for (const match of readFileSync(join(root, file), 'utf8').matchAll(/^import .* from '([^']+)';$/gm)) {
    if (!match[1].startsWith('node:')) {
      failures.push(`${file}: imports ${match[1]}; scripts use Node's built-in modules only`);
    }
  }
}

for (const failure of failures) {
  console.log(failure);
}
console.log(failures.length === 0 ? 'ok' : `${failures.length} failed`);
process.exit(failures.length === 0 ? 0 : 1);
