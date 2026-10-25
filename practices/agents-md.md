# AGENTS.md

What a repository's `AGENTS.md` is, and what it is not. The same holds for a
`CLAUDE.md` or any other instruction file an agent loads by itself.

## What it is

- **Loaded whole into every session** of every agent working in that
  repository. Every line costs attention on every task, whether the task
  needs it or not.
- **A map**: what the repository is, where its parts are, and which page to
  read before which kind of work.
- **The few rules that hold for nearly every change** in that repository and
  that no tool enforces.
- **How to finish**: the commands to run before a change is done.

## What it is not

- **Not the place for explanations**: reasons, history and examples go to the
  page the rule points to.
- **Not the place for the rules of one area**: what holds only for one
  package, one kind of file or one step goes next to it, into its readme or a
  page the map points to.
- **Not a copy of what a tool enforces**: a rule that a linter, the formatter,
  the type checker, CI or a hook checks is taught by that tool's message.
- **Not a store of facts that drift**: versions, counts and file lists, beyond
  the top-level map of the repository, are read from their source or
  generated.
- **Not the organization's rules**: they are in headquarters, and a
  repository's `AGENTS.md` links to them instead of repeating them.
- **Not anyone's personal preferences.**

## Size

Around 100 lines. When it grows past that, something moves out into a page
the map points to; it is not squeezed into denser lines.

The test for a line: would nearly every task in this repository go wrong
without it? If not, it belongs in the page for its area, and the map points
there. A rule that must hold without exception becomes a check instead.
