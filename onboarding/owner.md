# Setting up the owner's machine

For the owner of the organization: an admin of `musetric` on GitHub and on
Hugging Face. At the end, the machine builds, runs and changes every
repository of the chosen profiles, its commits are signed, pushes work, and
`doctor.mjs` reports no failures.

A coding agent runs this procedure. It does every step that needs no account
and no secret on its own, and stops for the steps marked **Owner**: signing
in, approving an administrator prompt, installing a driver. Every step can be
run again; check first, skip what is already done.

The procedure is written for Windows 11. The toolchain of each repository is
described in that repository; this file only puts the machine in the state
those descriptions expect, and never repeats a version a repository pins.

## 1. Before the agent

**Owner**, in a terminal:

1. Install Git: `winget install --id Git.Git -e`.
2. Install Claude Code: `irm https://claude.ai/install.ps1 | iex`, then run
   `claude` once and sign in.
3. Create the workspace root, for example `D:\musetric`, open a terminal in
   it, run `claude` and send:

   > Set up this machine for Musetric: clone
   > https://github.com/musetric/headquarters.git into this folder and follow
   > headquarters/onboarding/owner.md.

Cloning needs no sign-in: every repository of the organization is public.

## 2. Agree on the plan

Ask the owner, and repeat the answers in the final report:

- the profiles of [workspace.json](../workspace.json): `core` always,
  `toolkit` on a machine with an NVIDIA GPU, `android` to build the app for
  the phones, `models` to publish model revisions;
- the machine's name, used as the title of its key on GitHub and Hugging
  Face;
- the workspace root: the folder the agent was started in, unless the owner
  names another.

## 3. Tools

Install with `winget install --id <id> -e`:

| Tool | Profile | winget id | Notes |
| --- | --- | --- | --- |
| GitHub CLI | core | `GitHub.cli` | |
| nvm for Windows | core | `CoreyButler.NVMforWindows` | Node itself comes in step 4 |
| rustup | core | `Rustlang.Rustup` | each package's `rust-toolchain.toml` installs its toolchain on the first `cargo` command |
| Visual Studio Build Tools 2022 | core | `Microsoft.VisualStudio.2022.BuildTools` | pass `--override "--quiet --wait --norestart --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"`; it brings MSVC, CMake and Ninja; **Owner** approves the administrator prompt |
| uv | toolkit | `astral-sh.uv` | |
| NVIDIA driver | toolkit | — | **Owner** installs it from the NVIDIA App or nvidia.com |
| JDK 21 | android | `EclipseAdoptium.Temurin.21.JDK` | |
| Android Studio | android | `Google.AndroidStudio` | **Owner** installs the SDK and the NDK through its SDK Manager |

A tool installed during the session may be missing from `PATH` until a new
shell starts: restart the agent's shell, or the agent, before checking it.
Edge ships with Windows, so the server always has a browser to run the models
in.

## 4. Node

The product pins Node in `.node-version`. Read the pin from
`https://raw.githubusercontent.com/musetric/musetric/main/.node-version`, then
`nvm install <pin>` and `nvm use <pin>`; **Owner** approves the administrator
prompt of `nvm use`. Node 25 and later ship without corepack: install it with
`npm install -g corepack@latest --force`, then run `corepack enable`. Yarn
then comes in the version each repository's `packageManager` names.

## 5. Accounts and keys

One SSH key per machine signs in to GitHub and Hugging Face and signs
commits, so a lost machine costs one key, revoked on both sites.

1. If `~/.ssh/id_ed25519` does not exist, create it:
   `ssh-keygen -t ed25519 -C "<owner's email> <machine>" -f ~/.ssh/id_ed25519 -N ""`.
2. **Owner**, in a separate terminal:
   `gh auth login --hostname github.com --git-protocol ssh --web`, upload the
   key when gh offers to, and finish in the browser. Then
   `gh auth refresh --hostname github.com --scopes admin:ssh_signing_key`.
3. Register the same key for signing:
   `gh ssh-key add ~/.ssh/id_ed25519.pub --type signing --title "<machine>"`.
4. Sign the commits of the workspace, and only of the workspace. Write
   `~/.config/git/musetric.gitconfig`:

   ```ini
   [user]
     name = <owner's name>
     email = <owner's email>
     signingkey = ~/.ssh/id_ed25519.pub
   [gpg]
     format = ssh
   [commit]
     gpgsign = true
   ```

   and include it for the workspace root:
   `git config --global "includeIf.gitdir/i:D:/musetric/.path" "~/.config/git/musetric.gitconfig"`
   (use the real root). The file stays local and is never taken from a
   repository: a git config can run programs.
5. **Owner**, profile `models`: add `~/.ssh/id_ed25519.pub` at
   <https://huggingface.co/settings/keys>.

## 6. Clone the workspace

`node headquarters/scripts/clone.mjs --profiles <profiles>` clones every
repository of the profiles next to `headquarters` and writes the root's
`AGENTS.md`, which points every agent started in the root to
[AGENTS.md](../AGENTS.md) of this repository. Model repositories are cloned
without their LFS files: publishing a revision needs only the pointers. The
script also moves the first, HTTPS, clone of `headquarters` to SSH.

## 7. Each repository's own setup

Follow the development section of each cloned repository's readme. Known
points:

- `musetric`: `yarn` installs the dependencies. The server compiles libopus,
  so CMake must be on `PATH`: add the Build Tools' `CMake\bin` folder named in
  that readme to the user `PATH`.
- `landing`: `npm ci`.
- `musetric-toolkit`: `uv sync`; it downloads the CUDA build of torch, several
  gigabytes.
- `android`: set the user variables `ANDROID_HOME`, `NDK_HOME`,
  `ANDROID_NDK_HOME` (the same NDK as `NDK_HOME`) and `JAVA_HOME`, and put the
  Build Tools' `Ninja` folder on `PATH`, as `musetric/packages/app/readme.md`
  § Toolchain requires.

## 8. Check

1. `node headquarters/scripts/doctor.mjs --profiles <profiles>` until it
   reports no failures.
2. In `musetric`: `yarn check:ts`, then `cargo build --locked --bin musetric-server`
   in `packages/server`.
3. In `landing`: `npm run build:project`.
4. Profile `toolkit`: in `musetric-toolkit`,
   `uv run python -c "import torch; print(torch.cuda.is_available())"` prints
   `True`.
5. `gh api user/ssh_signing_keys --jq '.[].title'` lists the machine's name:
   without the key there, GitHub refuses to merge the pull requests made on
   this machine, because `main` of every repository requires verified
   signatures.

## 9. Report

Report to the owner per profile: what passed, what failed and why, and
which **Owner** steps are left. Do not report what the checks already show
as passing in more detail than one line.

## Not covered yet

The test phones and their browsers, the measurement stands, the data of the
model experiments, macOS and iOS, release signing for the stores, and Codex
or OpenCode on the machine.
