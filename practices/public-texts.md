# Public texts

Everything in the organization's repositories and trackers is public:
commits, pull requests, issues and their comments, readmes, model cards.
These rules apply to all of it.

- **English only, in every file.** No letter outside the English alphabet
  appears anywhere in a repository; other languages stay in the
  conversation. A name is written in English letters (Weiss, Gomez,
  Mueller), and notation in words (delta, not the Greek letter). The
  exceptions are files where another language is part of what they mean:
  multilingual data and its tests, a copy of a license, third-party code,
  translated values; each is listed in `checks.english.except` of the
  repository's `package.json`. *Enforced* by `musetric-checks english` of
  `@musetric/checks`.
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
- **Not retold from the history.** What a commit, a pull request or an issue
  already says, such as why a change was made, how a defect was found or what
  a measurement showed, is not copied into a readme or another markdown file
  of a repository: `git log -S` on the code finds the change that explains
  it, and its description links the issues. Only two kinds of such text are
  written again: the core of a readme, what a reader must know about the
  product or the package before anything else, and the wider understanding
  of the product that belongs to headquarters by [about.md](../about.md).
  Before writing a text of either kind, search the history for it.
- **A readme is short.** It introduces its directory: what it is, how it is
  run or used, and the few rules a change to it must keep, one line each,
  with links. It is not a record of defects, measurements or the reasons for
  a change, and neither is a code comment: those stay in the pull requests
  and issues. A detail that has no home there yet, such as a comment that is
  its only record, is posted on its pull request or issue before it is cut.
- **Nobody's own machines, orders, prices or accounts.** A public text names
  what the work needs, such as the hardware a training requires, never what
  a person owns, buys or pays.
- **A report to another project's tracker is a public text too**, such as
  one to Chromium or onnxruntime: the owner approves and files it, and our
  issue of the defect links it.
