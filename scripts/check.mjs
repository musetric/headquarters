// Checks what only this repository has: every file name starts in lower case
// (except the names agents look for), workspace.json is consistent, and every
// script parses and imports Node's built-in modules only. English letters and
// links are checked by @musetric/checks; `npm run check` runs both. Exits
// with 1 on a failure.
//
//   node scripts/check.mjs

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = spawnSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
  .stdout.split('\n')
  .filter((file) => file !== '');

const toolNames = ['AGENTS.md', 'CLAUDE.md', 'SKILL.md'];
const failures = [];

for (const file of files) {
  const name = basename(file);
  if (!toolNames.includes(name) && /^[A-Z]/.test(name)) {
    failures.push(`${file}: the file name starts with a capital letter`);
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
