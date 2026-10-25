# Public texts

Everything in the organization's repositories and trackers is public:
commits, pull requests, issues and their comments, readmes, model cards.
These rules apply to all of it.

- **English only, in every file.** No letter outside the English alphabet
  appears anywhere in a repository, except in the values of its translation
  files; other languages stay in the conversation. *Enforced* in
  headquarters by `scripts/check.mjs`; *not enforced yet* in the other
  repositories.
- **Shown before it is published.** Before an issue or a comment is created,
  or a published text is edited, the owner sees the exact final text and
  approves it; a summary or a local draft is not enough. GitHub keeps the
  edit history, and its notifications have already sent the first version.
- **Checked before it is shown**: every number against its source (a
  journal, the stand's code, the git history, an issue), every wording for
  precision (what was measured, on which device, at which version), and every
  input for privacy. What the check found is reported, even when the verdict
  does not change.
- **No real material.** musetric's `AGENTS.md` § Test Material is the rule:
  synthetic signals and openly licensed tracks may be named and quoted;
  nothing about other audio, not even a detail nobody can check, such as its
  duration.
- **Commit hashes, not branch names.** A measurement or a check names the
  commit it was taken on: "on main" stops being reproducible within a week. A
  pull request does not name the hash of its own branch.
- **No list of the standard checks** (types, lint, format, tests) in a commit
  or a pull request: CI runs them on every change. A "Verified" section names
  only what CI does not check: parity of results, measurements on hardware,
  behaviour on devices.
- **One front of information.** When the numbers of a piece of work change,
  every text that carries them, such as pull request descriptions, readmes,
  model cards and issue comments, is edited in place rather than followed by
  a correction.
- **One home.** Once a text is published, the draft it came from is cut down
  to a link to it, so that no second copy drifts.
