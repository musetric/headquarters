# Musetric Headquarters

The entry point to the Musetric organization: what it is, how work is done
in every repository, and how the repositories fit together. This file is a
map; the knowledge is in the pages it points to.

## Always

- The [charter](charter.md) binds every member and every agent; a task that
  conflicts with it stops and goes to the owner.
- A contradiction found in headquarters, or between it and an issue, the
  source or reality, is resolved before the task goes on.
- Before adding to headquarters, read [about.md](about.md): what belongs here
  and what goes elsewhere.

## Map

| Read | Before |
| --- | --- |
| [about.md](about.md) | adding anything to headquarters; it says why it exists and where the truth is |
| [product.md](product.md) | any work on the product: what it is and where it runs |
| [decisions/](decisions/readme.md) | changing how the product works: a decision in force may already rule on it |
| [practices/resources.md](practices/resources.md) | any task: what the environment has, what the task needs, how to share it |
| [practices/git.md](practices/git.md) | a branch, a commit, a push or a pull request |
| [practices/public-texts.md](practices/public-texts.md) | anything that becomes public |
| [practices/tracker.md](practices/tracker.md) | an issue, a comment on one, or a measurement for one |
| [practices/working-with-the-owner.md](practices/working-with-the-owner.md) | acting on a request |
| [practices/code.md](practices/code.md) | writing code or tests, or adding or upgrading a dependency |
| [practices/models.md](practices/models.md) | choosing, replacing, publishing or pinning a model |
| [practices/evidence.md](practices/evidence.md) | claiming anything as proven |
| [practices/experiments.md](practices/experiments.md) | research or a training |
| [practices/checks.md](practices/checks.md) | adding a rule anywhere, or changing what CI checks |
| [practices/environments.md](practices/environments.md) | adding or changing a tool, a version or a build environment |
| [practices/agents-md.md](practices/agents-md.md) | writing an `AGENTS.md` in any repository |
| [environment/](environment/readme.md) | work that depends on a platform or a test device |
| [onboarding/owner.md](onboarding/owner.md) | setting up a machine |

## Workspace

Every repository of the organization is cloned next to this one, in the
workspace root. The list is [workspace.json](workspace.json),
[scripts/clone.mjs](scripts/clone.mjs) clones it, and
[scripts/doctor.mjs](scripts/doctor.mjs) checks the machine against it. Each
repository has its own `AGENTS.md`; read it before changing that repository.

## Rules for this repository

- It is public: no secrets, and nothing that
  [public-texts.md](practices/public-texts.md) keeps out.
- Scripts follow the code style of musetric's `AGENTS.md`.
- A version a repository pins is read from it, never copied here.

Before finishing, run `npm run check` after `npm ci`, the check CI runs on
every pull request: English letters only and links through
`@musetric/checks`, then file names, `workspace.json` and the scripts through
`scripts/check.mjs`.
