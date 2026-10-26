// Checks that this machine is ready to work on the repositories of the chosen
// profiles. Versions come from the pins the repositories declare themselves
// (.node-version, packageManager, rust-toolchain.toml, the versions their CI
// installs), never from this file.
// Exits with 1 when any check fails; a warning does not fail the run.
//
//   node headquarters/scripts/doctor.mjs [--profiles core,lab] [--root <dir>]

import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
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

const isWindows = process.platform === 'win32';
const product = join(root, 'musetric');

// Commands go through the shell on Windows so that .cmd and .ps1 shims
// (yarn, corepack) resolve; arguments must therefore contain no spaces.
const run = (command, args, cwd) => {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', shell: isWindows });
  const out = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();
  return { ok: result.status === 0, out, firstLine: out.split(/\r?\n/)[0] };
};

const pass = (detail) => ({ level: 'ok', detail });
const warn = (detail) => ({ level: 'warn', detail });
const fail = (detail) => ({ level: 'fail', detail });

const readPin = (path, pattern) => {
  if (!existsSync(path)) {
    return undefined;
  }
  const match = readFileSync(path, 'utf8').match(pattern);
  return match ? match[1] : undefined;
};

const nodePin = readPin(join(product, '.node-version'), /^\s*v?(\S+)/);
const corepackPin = readPin(join(product, '.github', 'actions', 'setupYarn', 'action.yml'), /corepack@(\S+)/);
const yarnPin = readPin(join(product, 'package.json'), /"packageManager":\s*"yarn@([^"]+)"/);
const rustPins = [
  ...new Set(
    ['packages/server', 'packages/app']
      .map((folder) => readPin(join(product, folder, 'rust-toolchain.toml'), /channel\s*=\s*"([^"]+)"/))
      .filter((pin) => pin !== undefined),
  ),
];

const baseQuality = join(product, '.github', 'actions', 'baseQuality', 'action.yml');

// A standalone binary CI installs at a pinned version: the same binary at the
// same version on PATH here.
const binaryCheck = (command, variable) => () => {
  const pin = readPin(baseQuality, new RegExp(`${variable}: *v?([^ ]+)$`, 'm'));
  if (pin === undefined) {
    return warn('musetric is not cloned, so the version its CI pins is unknown');
  }
  const result = run(command, ['--version']);
  if (!result.ok) {
    return fail(`${command} is not on PATH: install its standalone release ${pin}`);
  }
  const version = result.firstLine.split(' ').pop().replace(/^v/, '');
  return version === pin ? pass(result.firstLine) : fail(`${command} ${version}, musetric's CI installs ${pin}`);
};

const commandCheck = (command, args) => () => {
  const result = run(command, args);
  return result.ok ? pass(result.firstLine) : fail(`${command} is not installed or not on PATH`);
};

const sshCheck = (host, greeting) => () => {
  const result = run('ssh', ['-T', '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10', `git@${host}`]);
  return result.out.includes(greeting) ? pass(result.firstLine) : fail(`no SSH access to ${host}: ${result.firstLine}`);
};

const vsBuildTools = () => {
  const vswhere = join(process.env['ProgramFiles(x86)'] ?? '', 'Microsoft Visual Studio', 'Installer', 'vswhere.exe');
  if (!existsSync(vswhere)) {
    return undefined;
  }
  const result = spawnSync(
    vswhere,
    ['-products', '*', '-requires', 'Microsoft.VisualStudio.Component.VC.Tools.x86.x64', '-property', 'installationPath'],
    { encoding: 'utf8' },
  );
  const path = (result.stdout ?? '').trim().split(/\r?\n/)[0];
  return path === '' ? undefined : path;
};

const browserPaths = {
  win32: [
    join(process.env.ProgramFiles ?? '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    join(process.env['ProgramFiles(x86)'] ?? '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  ],
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'],
};

const folderCheck = (variable) => () => {
  const value = process.env[variable];
  if (value === undefined || value === '') {
    return fail(`${variable} is not set`);
  }
  return existsSync(value) ? pass(value) : fail(`${variable} points to a missing folder: ${value}`);
};

const checks = [
  { profile: 'core', name: 'git', check: commandCheck('git', ['--version']) },
  {
    profile: 'core',
    name: 'github cli',
    check: () => {
      const result = run('gh', ['auth', 'status', '--hostname', 'github.com']);
      const account = result.out.match(/account (\S+)/);
      return result.ok && account ? pass(`signed in as ${account[1]}`) : fail('gh is missing or not signed in');
    },
  },
  { profile: 'core', name: 'github ssh', check: sshCheck('github.com', 'successfully authenticated') },
  {
    profile: 'core',
    name: 'signed commits',
    check: () => {
      const sign = run('git', ['config', '--get', 'commit.gpgsign'], headquarters).out;
      const key = run('git', ['config', '--get', 'user.signingkey'], headquarters).out;
      const format = run('git', ['config', '--get', 'gpg.format'], headquarters).out || 'openpgp';
      return sign === 'true' && key !== ''
        ? pass(`${format} key ${key.split(/[\\/]/).pop()}`)
        : fail('commits are not signed in the workspace: main requires verified signatures');
    },
  },
  {
    profile: 'core',
    name: 'node',
    check: () => {
      if (nodePin === undefined) {
        return warn('musetric is not cloned, so its Node pin is unknown');
      }
      return process.version === `v${nodePin}`
        ? pass(process.version)
        : fail(`active ${process.version}, musetric pins ${nodePin}`);
    },
  },
  {
    profile: 'core',
    name: 'corepack',
    check: () => {
      if (corepackPin === undefined) {
        return warn('musetric is not cloned, so the corepack its CI installs is unknown');
      }
      const result = run('corepack', ['--version']);
      if (!result.ok) {
        return fail(`corepack is not installed: Node 25 and later ship without it; musetric's CI installs ${corepackPin}`);
      }
      return result.firstLine === corepackPin
        ? pass(result.firstLine)
        : fail(`corepack ${result.firstLine}, musetric's CI installs ${corepackPin}`);
    },
  },
  {
    profile: 'core',
    name: 'yarn',
    check: () => {
      if (yarnPin === undefined) {
        return warn('musetric is not cloned, so its Yarn pin is unknown');
      }
      const result = run('yarn', ['--version'], product);
      if (!result.ok) {
        return fail('yarn does not run in musetric: install corepack and run corepack enable');
      }
      return result.firstLine === yarnPin ? pass(result.firstLine) : fail(`yarn ${result.firstLine}, musetric pins ${yarnPin}`);
    },
  },
  {
    profile: 'core',
    name: 'rust',
    check: () => {
      const rustup = run('rustup', ['--version']);
      if (!rustup.ok) {
        return fail('rustup is not installed');
      }
      const installed = run('rustup', ['toolchain', 'list']).out;
      const missing = rustPins.filter((pin) => !installed.includes(pin));
      return missing.length === 0
        ? pass(`toolchains ${rustPins.join(', ') || 'unknown until musetric is cloned'}`)
        : warn(`toolchain ${missing.join(', ')} installs itself on the first cargo command in that package`);
    },
  },
  {
    profile: 'core',
    name: 'c++ build tools',
    check: () => {
      if (!isWindows) {
        return commandCheck('cc', ['--version'])();
      }
      const path = vsBuildTools();
      return path ? pass(path) : fail('Visual Studio Build Tools with the C++ workload are missing');
    },
  },
  {
    profile: 'core',
    name: 'cmake',
    check: () => {
      const result = run('cmake', ['--version']);
      if (result.ok) {
        return pass(result.firstLine);
      }
      const bundled = isWindows && vsBuildTools();
      return bundled
        ? warn(`not on PATH; the Build Tools ship it in ${join(bundled, 'Common7', 'IDE', 'CommonExtensions', 'Microsoft', 'CMake', 'CMake', 'bin')}`)
        : fail('cmake is missing: the server compiles libopus with it');
    },
  },
  {
    profile: 'core',
    name: 'browser',
    check: () => {
      const found = (browserPaths[process.platform] ?? []).find((path) => existsSync(path));
      return found ? pass(found) : fail('no Chrome, Edge or Chromium for the server to run models in');
    },
  },
  { profile: 'core', name: 'jscpd', check: binaryCheck('jscpd', 'JSCPD_VERSION') },
  {
    profile: 'core',
    name: 'editorconfig-checker',
    check: binaryCheck('editorconfig-checker', 'EDITORCONFIG_CHECKER_VERSION'),
  },
  {
    profile: 'lab',
    name: 'uv',
    check: () => {
      const pin = readPin(join(root, 'lab', 'pyproject.toml'), /required-version = "==([^"]+)"/);
      const result = run('uv', ['--version']);
      if (!result.ok) {
        return fail('uv is not installed');
      }
      const version = result.firstLine.split(' ')[1];
      if (pin === undefined) {
        return warn(`${result.firstLine}; lab is not cloned, so its pin is unknown`);
      }
      return version === pin ? pass(result.firstLine) : fail(`uv ${version}, lab pins ${pin}`);
    },
  },
  {
    profile: 'lab',
    name: 'nvidia gpu',
    check: () => {
      const result = run('nvidia-smi', ['--query-gpu=name,driver_version', '--format=csv,noheader']);
      return result.ok ? pass(result.firstLine) : fail('nvidia-smi does not run: no NVIDIA GPU or driver');
    },
  },
  { profile: 'android', name: 'JAVA_HOME', check: folderCheck('JAVA_HOME') },
  { profile: 'android', name: 'ANDROID_HOME', check: folderCheck('ANDROID_HOME') },
  { profile: 'android', name: 'NDK_HOME', check: folderCheck('NDK_HOME') },
  {
    profile: 'android',
    name: 'ANDROID_NDK_HOME',
    check: () =>
      process.env.ANDROID_NDK_HOME === process.env.NDK_HOME && process.env.NDK_HOME !== undefined
        ? pass('same as NDK_HOME')
        : fail('must point to the same NDK as NDK_HOME: CMake finds the NDK through it'),
  },
  { profile: 'android', name: 'adb', check: commandCheck('adb', ['version']) },
  { profile: 'android', name: 'ninja', check: commandCheck('ninja', ['--version']) },
  { profile: 'models', name: 'git lfs', check: commandCheck('git', ['lfs', 'version']) },
  { profile: 'models', name: 'hugging face ssh', check: sshCheck('hf.co', 'welcome to Hugging Face') },
  {
    profile: 'core',
    name: 'agent configuration',
    check: () => {
      const config = join(headquarters, 'agents', 'claude');
      const settings = join(root, '.claude', 'settings.json');
      if (!existsSync(settings) || readFileSync(settings, 'utf8') !== readFileSync(join(config, 'settings.json'), 'utf8')) {
        return fail('.claude/settings.json of the root is missing or differs from headquarters: run clone.mjs');
      }
      const skills = readdirSync(join(config, 'skills'));
      const unlinked = skills.filter((name) => {
        const link = join(root, '.claude', 'skills', name);
        return !existsSync(link) || realpathSync(link) !== realpathSync(join(config, 'skills', name));
      });
      return unlinked.length === 0
        ? pass(`settings and ${skills.length} skills`)
        : fail(`skills not linked to headquarters: ${unlinked.join(', ')}: run clone.mjs`);
    },
  },
  ...workspace.repositories.map((repository) => ({
    profile: repository.profile,
    name: repository.path,
    check: () => {
      const target = join(root, repository.path);
      if (!existsSync(join(target, '.git'))) {
        return fail(`not cloned into ${target}`);
      }
      const origin = run('git', ['remote', 'get-url', 'origin'], target).out;
      if (origin !== repository.url) {
        return warn(`origin is ${origin}, not ${repository.url}`);
      }
      if (run('git', ['config', '--get', 'branch.autoSetupMerge'], target).out !== 'simple') {
        return warn('branch.autoSetupMerge is not simple: run clone.mjs');
      }
      const ownNodePin = readPin(join(target, '.node-version'), /^\s*v?(\S+)/);
      return ownNodePin === undefined || nodePin === undefined || ownNodePin === nodePin
        ? pass('cloned')
        : warn(`.node-version pins ${ownNodePin}, musetric pins ${nodePin}: one Node everywhere`);
    },
  })),
];

const selected = checks.filter((item) => profiles.includes(item.profile));
const results = selected.map((item) => ({ ...item, ...item.check() }));

for (const profile of profiles) {
  console.log(profile);
  for (const result of results.filter((item) => item.profile === profile)) {
    console.log(`  ${result.level.padEnd(4)}  ${result.name.padEnd(44)}  ${result.detail}`);
  }
}

const failed = results.filter((item) => item.level === 'fail').length;
const warned = results.filter((item) => item.level === 'warn').length;
console.log(`\n${failed} failed, ${warned} warnings`);
process.exit(failed > 0 ? 1 : 0);
