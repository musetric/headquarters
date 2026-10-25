# Checks

Quality is guaranteed by checks, not by anyone remembering a rule.

- **Whatever a program can verify is a check of the repository**, run by CI
  on every pull request and required for the merge: formatting, lint, types,
  tests, duplicated code, editor settings, unused code, dependency audits,
  links, titles, signatures. No rule of that kind depends on a contributor,
  a person or an agent, following it by heart.
- **A new rule starts with one question: can a program check it?** If it can,
  the rule becomes a check, such as a lint rule, a CI job or a hook, and the
  check's message says how to fix what it finds. The rule then leaves the
  documents: the check is its one home. A rule that stays in text is one that
  no deterministic check can judge yet.
- **Local runs and CI run the same checks**, at the same versions, through the
  repository's own scripts, so that a failure shows before the push. A check
  that only CI runs is a gap to close.
- **A check that needs what CI does not have**, such as a GPU or a phone, is a
  script run by hand at the moments its protocol names, as the parity run is;
  it does not turn into a manual checklist.
- **Only what no deterministic check can judge is reviewed by an agent or a
  person**, by the practices of headquarters: how a result sounds, whether an
  interface matches its mockup, whether a public text is accurate and clear,
  whether a change solves the whole problem.
