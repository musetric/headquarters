// Tells an agent, at the start of a session in the workspace root, how the
// workspace stands: whether headquarters is behind its origin, and the branch
// and uncommitted files of every repository. Claude Code runs it as the
// SessionStart hook of agents/claude/settings.json and adds what it prints to
// the session's context.
//
//   node headquarters/scripts/session-start.mjs

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const headquarters = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(headquarters, '..');
const workspace = JSON.parse(readFileSync(join(headquarters, 'workspace.json'), 'utf8'));

const git = (cwd, args, timeout = 5000) => {
  const result = spawnSync('git', ['-C', cwd, ...args], { encoding: 'utf8', timeout });
  return { ok: result.status === 0, out: (result.stdout ?? '').trim() };
};

const describe = (path) => {
  const target = join(root, path);
  const branch = git(target, ['branch', '--show-current']).out || 'a detached HEAD';
  const changed = git(target, ['status', '--porcelain']).out.split('\n').filter((line) => line !== '').length;
  return `${path}: ${branch}${changed > 0 ? `, ${changed} uncommitted files` : ''}`;
};

const describeHeadquarters = () => {
  const line = describe('headquarters');
  if (!git(headquarters, ['fetch', '--quiet', 'origin'], 10000).ok) {
    return `${line}; origin could not be reached, so headquarters may be out of date`;
  }
  const counts = git(headquarters, ['rev-list', '--left-right', '--count', 'HEAD...origin/main']).out.split(/\s+/);
  const behind = Number(counts[1] ?? 0);
  return behind > 0
    ? `${line}; ${behind} commits behind origin/main: pull it before relying on what it says`
    : `${line}; up to date with origin/main`;
};

const lines = [
  'The Musetric workspace at the start of this session:',
  `- ${describeHeadquarters()}`,
  ...workspace.repositories
    .filter((repository) => repository.path !== 'headquarters' && existsSync(join(root, repository.path, '.git')))
    .map((repository) => `- ${describe(repository.path)}`),
  'Other sessions may work in these folders too: check before switching a branch or touching uncommitted files.',
];
console.log(lines.join('\n'));
