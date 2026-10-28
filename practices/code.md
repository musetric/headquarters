# Code

What applies to the code of every repository.

- **One implementation of each job.** A decoder, an API client, a storage
  layout or the geometry of a model is written once and has one owner. A
  second copy, in the same language or in another, is a reason to stop and
  ask why one cannot serve both: two copies drift apart without an error.
  *Enforced in part*: the duplicate check of musetric finds copies that read
  alike, not a copy in another language.
- **A dependency is used as it is published.** No patch of a dependency: no
  Yarn `patch:` protocol, no edit in `node_modules` or `site-packages`, no edit
  of a built bundle. When a dependency lacks an option or has a defect, the
  way out is code of our own around it, a fix proposed upstream, or a
  question to the owner. A patch found on an older branch is raised with the
  owner, not carried over. *Not enforced yet.*
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
