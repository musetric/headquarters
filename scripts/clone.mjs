// Clones the repositories of the chosen profiles into the workspace root and
// writes the root's AGENTS.md and the agents' configuration of
// agents/claude: a copy of its settings.json and a link to each of its skills
// in the root's .claude. Safe to rerun: an existing clone is only checked,
// an HTTPS origin of the right repository is switched to the SSH URL, and a
// root file that differs from the generated one is reported, not overwritten.
//
//   node headquarters/scripts/clone.mjs [--profiles core,lab] [--root <dir>]

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const headquarters = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspace = JSON.parse(readFileSync(join(headquarters, 'workspace.json'), 'utf8'));

const readOption = (name, fallback) => {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
};

const root = resolve(readOption('root', join(headquarters, '..')));
const profiles = readOption('profiles', 'core').split(',');
const unknownProfiles = profiles.filter((profile) => !(profile in workspace.profiles));
if (unknownProfiles.length > 0) {
  console.error(`Unknown profiles: ${unknownProfiles.join(', ')}. Known: ${Object.keys(workspace.profiles).join(', ')}`);
  process.exit(1);
}

const git = (args, env) =>
  spawnSync('git', args, { encoding: 'utf8', env: { ...process.env, ...env } });

const httpsUrl = (sshUrl) => sshUrl.replace(/^git@([^:]+):/, 'https://$1/').replace(/\.git$/, '');

const syncRepository = (repository) => {
  const target = join(root, repository.path);
  if (!existsSync(join(target, '.git'))) {
    mkdirSync(dirname(target), { recursive: true });
    // Model repositories keep their weights in LFS; a clone for publishing
    // needs only the pointers, so the gigabytes stay on Hugging Face.
    const env = repository.profile === 'models' ? { GIT_LFS_SKIP_SMUDGE: '1' } : {};
    const result = git(['clone', repository.url, target], env);
    return result.status === 0 ? 'cloned' : `clone failed: ${result.stderr.trim()}`;
  }
  const origin = git(['-C', target, 'remote', 'get-url', 'origin']).stdout.trim();
  if (origin === repository.url) {
    return 'present';
  }
  if (origin.replace(/\.git$/, '') === httpsUrl(repository.url)) {
    git(['-C', target, 'remote', 'set-url', 'origin', repository.url]);
    return 'present, origin switched to SSH';
  }
  return `present, but origin is ${origin}, not ${repository.url}`;
};

const rootInstructions = [
  '# Musetric workspace',
  '',
  'Every repository of the Musetric organization is cloned into this folder.',
  'Start with `headquarters/AGENTS.md`: it describes the workspace and points to',
  'the rules of each repository.',
  '',
  '@headquarters/AGENTS.md',
  '',
].join('\n');

const writeRootInstructions = () => {
  const target = join(root, 'AGENTS.md');
  if (!existsSync(target)) {
    writeFileSync(target, rootInstructions);
    return 'written';
  }
  return readFileSync(target, 'utf8') === rootInstructions ? 'present' : 'present, differs from the generated one';
};

const agentConfig = join(headquarters, 'agents', 'claude');

const writeAgentSettings = () => {
  const target = join(root, '.claude', 'settings.json');
  const source = readFileSync(join(agentConfig, 'settings.json'), 'utf8');
  if (!existsSync(target)) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, source);
    return 'written';
  }
  return readFileSync(target, 'utf8') === source ? 'present' : 'present, differs from headquarters';
};

// A junction needs no rights on Windows; elsewhere the type is ignored and a
// directory symlink is made.
const linkSkill = (name) => {
  const source = join(agentConfig, 'skills', name);
  const target = join(root, '.claude', 'skills', name);
  if (!existsSync(target)) {
    mkdirSync(dirname(target), { recursive: true });
    symlinkSync(source, target, 'junction');
    return 'linked';
  }
  return realpathSync(target) === realpathSync(source) ? 'present' : 'present, but not a link to headquarters';
};

for (const repository of workspace.repositories.filter((item) => profiles.includes(item.profile))) {
  console.log(`${repository.path}: ${syncRepository(repository)}`);
}
console.log(`AGENTS.md: ${writeRootInstructions()}`);
console.log(`.claude/settings.json: ${writeAgentSettings()}`);
for (const name of readdirSync(join(agentConfig, 'skills'))) {
  console.log(`.claude/skills/${name}: ${linkSkill(name)}`);
}
