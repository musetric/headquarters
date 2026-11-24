import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
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

const cloned = workspace.repositories.filter((repository) => existsSync(join(root, repository.path, '.git')));

const worktrees = cloned.flatMap((repository) =>
  git(join(root, repository.path), ['worktree', 'list', '--porcelain'])
    .out.split('\n')
    .filter((line) => line.startsWith('worktree '))
    .map((line) => relative(root, resolve(line.slice('worktree '.length))).replaceAll('\\', '/'))
    .filter((path) => path !== repository.path),
);

const lines = [
  'The Musetric workspace at the start of this session:',
  `- ${describeHeadquarters()}`,
  ...cloned.filter((repository) => repository.path !== 'headquarters').map((repository) => `- ${describe(repository.path)}`),
  ...worktrees.map((path) => `- ${describe(path)}`),
  "Work happens in worktrees, as headquarters/practices/git.md says. A checkout off main or with changes, and every worktree listed, is someone's work in progress: leave it as it is.",
];
if (process.argv.includes('--instructions')) {
  const instructions = join(headquarters, 'AGENTS.md');
  lines.push('', `Instructions from ${instructions}:`, '', readFileSync(instructions, 'utf8').trim());
}
console.log(lines.join('\n'));
