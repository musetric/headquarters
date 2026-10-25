# Musetric Headquarters

This repository is the entry point to the Musetric organization. It holds
what no single repository of the product owns: how to set up a machine and
the workspace, and, as it grows, the context the repositories share.

## Why it exists, and what belongs here

Headquarters gives every person and every agent, on any machine, the same
understanding of the organization: who we are, how work is done, and how the
pieces of the product fit together. It holds lasting, general knowledge, and
it stays true when a machine breaks, a phone updates or an issue closes.

Where the source code exists, it is the truth about how the product behaves.
But nobody looks for code they do not know exists, and much of what matters
never was code: why something exists, the use cases, requirements and intent
behind it, and the values it serves. Headquarters is the entry point that
says what there is, where it is and why, so that everyone knows where to
look. It does not document every issue or every file; the details are in the
source and in the issues. The whole truth is all of it together: how a button
behaves in the code is not understood until it is clear why it behaves so.

It holds:

- who the organization is and what it stands for: the [charter](charter.md);
- how work is done in every repository: the [practices](practices/readme.md);
- the general picture of the product and where it runs: its platforms, its
  environment and how the repositories fit together;
- how a machine and the workspace are set up: [onboarding](onboarding/owner.md),
  [workspace.json](workspace.json) and the [scripts](scripts/);
- the agents' configuration shared by the organization.

It does not hold:

- one person's machine, hardware, accounts, purchases or plans; an agent
  learns them from the environment at hand, and a person's own instructions
  stay with that person;
- concrete problems, defects, measurements, hypotheses, tasks and their
  status: they are issues in the repository they concern;
- what a repository owns: its code rules, its toolchain and the versions it
  pins stay in that repository, and this one only links to them or reads
  them;
- the details of one device, one GPU or one browser version: they belong to
  the issue of that problem;
- how to install a tool: the requirement is stated, and the way to meet it is
  left to whoever sets the machine up;
- material that may not be published, such as real users' data or tracks
  without an open licence;
- raw experiments, their data and their models: they stay in the lab.

The test for a new text: if it would have to change because one machine
changed, one device updated or one issue moved, it belongs somewhere else.

## Charter

[charter.md](charter.md) says who the organization is and what it never
does: the product stays free and open, no money comes with control over it,
and members earn from their work, not from access to the product. It binds
every member and every agent; a task that conflicts with it stops and goes to
the owner.

## The product

Musetric is one application for every platform: Windows, macOS, Linux,
Android and iOS. A Tauri shell runs the Rust host and shows the React
interface in the platform's WebView, and the models run on WebGPU in a web
page, the same way everywhere. How each part works is in the source and the
readmes of musetric/musetric.

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

## Practices

The owner's rules for every repository live in [practices/](practices/readme.md).
Read the page before the action it covers:

- [practices/resources.md](practices/resources.md) before any task: what the
  environment has, what the task needs, and how to share it with others;
- [practices/git.md](practices/git.md) before creating a branch, committing,
  pushing, or opening or updating a pull request;
- [practices/public-texts.md](practices/public-texts.md) before writing
  anything that becomes public;
- [practices/tracker.md](practices/tracker.md) before creating or commenting
  on an issue, or measuring for one;
- [practices/working-with-the-owner.md](practices/working-with-the-owner.md)
  before acting on a request;
- [practices/models.md](practices/models.md) before choosing, replacing,
  publishing or pinning a model;
- [practices/experiments.md](practices/experiments.md) before proposing or
  starting research or a training.

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
