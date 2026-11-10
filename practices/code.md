# Code

What applies to the code of every repository. A repository's own rules,
such as the style of its language and its scripts, stay in its `AGENTS.md`.

- **A file holds one domain**, as
  [one essence in one place](design.md#one-essence-in-one-place) asks. Files
  are domain-specific and self-contained: no catch-all files such as `types`
  or `utils`; an entity's types and functions stay together, and a broadly
  reusable sub-entity gets a domain file of its own. Several small entities
  in one file are not interleaved: each stays grouped, the more foundational
  one first.
- **An invalid value is never coerced into a valid default**, such as a
  count clamped to zero or a fallback for a required value.
- **A changed contract changes everywhere at once**, without fallbacks kept
  for compatibility.
- **A dependency is used as it is published.** No patch of a dependency: no
  Yarn `patch:` protocol, no edit in `node_modules` or `site-packages`, no edit
  of a built bundle. A patch found on an older branch is raised with the
  owner, not carried over. *Not enforced yet.*
- **A defect of a dependency or a tool is solved in our repository first.**
  A released version that already fixes it is taken; otherwise code of our
  own goes around it, and such a workaround gets an issue of technical debt,
  so that it is removed once the defect is gone. When our repository cannot
  solve it, the owner is asked whether to patch the dependency in our
  repository or to contribute a fix to its project, and neither starts before
  the answer. Cloning, reading and running another project's code to
  understand the defect needs no answer; the clone goes to `deps/`
  ([resources.md](resources.md)). *Not enforced yet.*
- **No comments in code**, in any language: what code does is said by its
  names and types, and why it is so by its pull request, its issue and the
  commit message. Only a tool directive, such as `eslint-disable` or `noqa`,
  and `@see`, `@todo` or `@fixme` in a script stay; third-party code keeps
  its own. *Enforced* by `musetric-checks comments` of `@musetric/checks`.
- **File names start in lower case** in every repository, such as
  `readme.md` and `license.md`, except the names tools look for, such as
  `AGENTS.md`, `CLAUDE.md` and `SKILL.md`. Headquarters checks it in
  `scripts/check.mjs`; *not enforced yet* in the other repositories.
- **Tests follow complexity and importance.** The effort put into tests
  matches how hard the code is and how much depends on it: an algorithm such
  as the FFT, the spectrogram or a step of signal processing has unit tests
  and a benchmark. Code that moves fields from one shape to another, and what
  the type system already guarantees, has none.
- **A mock does not test the boundary it replaces.** Where the code depends
  on how a library constructs or owns an object, the test uses the real
  library: a mock that returned its argument once hid a `Tensor` created
  without `new`.
