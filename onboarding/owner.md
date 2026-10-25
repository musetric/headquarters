# Setting up the owner's machine

For the owner of the organization: an admin of `musetric` on GitHub and on
Hugging Face. At the end, the machine builds, runs and changes every
repository of the chosen profiles, its commits are signed, pushes work, and
`doctor.mjs` reports no failures.

A coding agent on the machine runs this procedure. This file says what must
be true, not how to install it: the agent knows the machine's system and
package manager and picks the way. It stops for the steps marked **Owner**,
the ones that need the owner's account or hands. Every step can be run again;
check first, skip what is already done.

The toolchain of each repository is described in that repository. This file
never repeats a version a repository pins.

## Start

The owner needs git and a signed-in coding agent. In an empty folder, the
workspace root, the owner sends the agent:

> Set up this machine for Musetric: clone
> https://github.com/musetric/headquarters.git into this folder and follow
> headquarters/onboarding/owner.md.

Cloning needs no sign-in: every repository of the organization is public.

## 1. Agree on the plan

Ask the owner, and repeat the answers in the final report:

- the profiles of [workspace.json](../workspace.json): `core` always,
  `toolkit` on a machine with an NVIDIA GPU, `android` to build the app for
  the phones, `models` to publish model revisions;
- the machine's name, used as the title of its key on GitHub and Hugging
  Face;
- the workspace root: the folder the agent was started in, unless the owner
  names another.

## 2. What the machine needs

| Requirement | Profile | Version and details |
| --- | --- | --- |
| GitHub CLI | core | |
| Node and Yarn | core | Node from musetric's `.node-version`, Yarn from `packageManager` through corepack; Node 25 and later ship without corepack |
| Rust through rustup | core | each package's `rust-toolchain.toml` installs its toolchain on the first `cargo` command |
| C and C++ build tools with CMake | core | the server compiles libopus; musetric's readme |
| Chrome, Edge or Chromium | core | the server runs the models in it; musetric's readme |
| uv | toolkit | musetric-toolkit's readme |
| NVIDIA GPU with its driver | toolkit | **Owner** installs the driver if it is missing |
| Android SDK, NDK, JDK 21, Ninja | android | `musetric/packages/app/readme.md` § Toolchain; **Owner** installs the SDK and the NDK if the agent cannot |
| git LFS | models | |

## 3. Accounts and keys

- One SSH key per machine, titled with the machine's name, signs in to GitHub
  and Hugging Face and signs commits. A lost machine then costs one key,
  revoked on both sites.
- **Owner** signs the GitHub CLI in to github.com with the SSH protocol,
  through the browser, and grants it the `admin:ssh_signing_key` scope. The
  key is registered on GitHub for authentication and for signing.
- Commits are signed in the workspace and only there: the user's global git
  config includes, for the workspace root only, a local file that sets
  `user.name`, `user.email`, `user.signingkey` to the key, `gpg.format = ssh`
  and `commit.gpgsign = true`. That file lives outside every repository and is
  never taken from one: a git config can run programs.
- **Owner**, profile `models`: adds the public key at
  <https://huggingface.co/settings/keys>.

## 4. Clone the workspace

`node headquarters/scripts/clone.mjs --profiles <profiles>` clones every
repository of the profiles next to `headquarters` and writes the root's
`AGENTS.md`, which points every agent started in the root to
[AGENTS.md](../AGENTS.md) of this repository. Model repositories are cloned
without their LFS files: publishing a revision needs only the pointers. The
script also moves the first, HTTPS, clone of `headquarters` to SSH.

## 5. Each repository's own setup

Follow the development section of each cloned repository's readme, with the
package manager its lockfile belongs to.

## 6. Check

1. `node headquarters/scripts/doctor.mjs --profiles <profiles>` reports no
   failures.
2. `musetric`: `yarn check:ts`, and `cargo build --locked --bin musetric-server`
   in `packages/server`.
3. `landing`: `npm run build:project`.
4. Profile `toolkit`: in `musetric-toolkit`,
   `uv run python -c "import torch; print(torch.cuda.is_available())"` prints
   `True`.
5. `gh api user/ssh_signing_keys --jq '.[].title'` lists the machine's name:
   without the key there, GitHub refuses to merge the pull requests made on
   this machine, because `main` of every repository requires verified
   signatures.

## 7. Report

Report to the owner per profile: what passed, what failed and why, and which
**Owner** steps are left, one line for each check that passed.

## Not covered yet

The test phones and their browsers, the measurement stands, the data of the
model experiments, iOS builds, release signing for the stores, and Codex or
OpenCode on the machine.
