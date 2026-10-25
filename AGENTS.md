# Musetric Headquarters

This repository is the entry point to the Musetric organization. It holds
what no single repository of the product owns: how to set up a machine and
the workspace, and, as it grows, the context the repositories share.

## Workspace

Every repository of the organization is cloned into one folder, the
workspace root, next to this repository:

| Path | Repository | What it is |
| --- | --- | --- |
| `headquarters` | musetric/headquarters | this repository |
| `musetric` | musetric/musetric | the product: Yarn monorepo, Rust host, Tauri app |
| `landing` | musetric/landing | the website |
| `musetric-toolkit` | musetric/musetric-toolkit | Python reference implementation, model export, training |
| `models/<name>` | huggingface.co/musetric/`<name>` | the published model repositories |

[workspace.json](workspace.json) is the list and its profiles.
[scripts/clone.mjs](scripts/clone.mjs) clones it and
[scripts/doctor.mjs](scripts/doctor.mjs) checks the machine against it.

Each repository has its own `AGENTS.md` with its rules. Read it before
changing that repository; this file does not repeat it.

## Setting up a machine

When asked to set up a machine for Musetric, follow
[onboarding/owner.md](onboarding/owner.md). It is written for the owner of the
organization; no other role is described yet.

## Rules for this repository

- It is public: no secrets, accounts' tokens or private material. The rules
  of musetric's `AGENTS.md` § Test Material apply here too.
- English, lowercase file names.
- Changes reach `main` only through pull requests. Titles follow
  [.github/prTitle.config.yml](.github/prTitle.config.yml): 70 characters at
  most, scope required.
- Scripts use Node's built-in modules only, one file each, run with `node`,
  and follow the code style of musetric's `AGENTS.md`.
- A version pinned by a repository is read from that repository, never
  copied here.
