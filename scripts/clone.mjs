import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from 'node:fs';
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

const setUpstreamRule = (target) => git(['-C', target, 'config', 'branch.autoSetupMerge', 'simple']);

const syncRepository = (repository) => {
  const target = join(root, repository.path);
  if (!existsSync(join(target, '.git'))) {
    mkdirSync(dirname(target), { recursive: true });
    const env = repository.profile === 'models' ? { GIT_LFS_SKIP_SMUDGE: '1' } : {};
    const result = git(['clone', repository.url, target], env);
    if (result.status !== 0) {
      return `clone failed: ${result.stderr.trim()}`;
    }
    setUpstreamRule(target);
    return 'cloned';
  }
  setUpstreamRule(target);
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

const agents = join(headquarters, 'agents');
const layout = JSON.parse(readFileSync(join(agents, 'layout.json'), 'utf8'));

const copyAgentFile = ({ from, to }) => {
  const target = join(root, to);
  const source = readFileSync(join(agents, from), 'utf8');
  if (!existsSync(target)) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, source);
    return 'written';
  }
  return readFileSync(target, 'utf8') === source ? 'present' : 'present, differs from headquarters';
};

const isPresent = (path) => {
  try {
    lstatSync(path);
    return true;
  } catch {
    return false;
  }
};

const linkSkill = (folder, name) => {
  const source = join(agents, 'skills', name);
  const target = join(root, folder, name);
  if (!isPresent(target)) {
    mkdirSync(dirname(target), { recursive: true });
    symlinkSync(source, target, 'junction');
    return 'linked';
  }
  if (!existsSync(target)) {
    return 'present, but a broken link: remove it and rerun';
  }
  return realpathSync(target) === realpathSync(source) ? 'present' : 'present, but not a link to headquarters';
};

for (const repository of workspace.repositories.filter((item) => profiles.includes(item.profile))) {
  console.log(`${repository.path}: ${syncRepository(repository)}`);
}
console.log(`AGENTS.md: ${writeRootInstructions()}`);
for (const file of layout.files) {
  console.log(`${file.to}: ${copyAgentFile(file)}`);
}
for (const folder of layout.skills) {
  for (const name of readdirSync(join(agents, 'skills'))) {
    console.log(`${folder}/${name}: ${linkSkill(folder, name)}`);
  }
}
