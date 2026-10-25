# Experiments

How research and training are run.

- **Nothing is tried a third time without a new reason.** Before proposing a
  speed or quality idea, search the study's list of what was tried, the
  issues and the pull requests (`gh issue list --search`,
  `gh pr list --search`). An idea that already failed is proposed again only
  with what has changed since, named.
- **A training runs as long as the owner said**, 20 minutes by default, also
  for a shape never trained before. When a longer run looks worth it, propose
  it in words and wait.
- **Runs happen on the owner's machine by default.** A cloud or Kaggle run
  happens only when the owner asks for that run; a permission for one night
  or one wave does not carry over to the next.
- **A long run starts only after its load is proven efficient**: power near
  the limit, high utilization, the time per step explained. Short
  configurations are benchmarked first; a run that underloads its GPUs is
  stopped.
- **The owner's listening verdicts are data.** Whenever the owner listens and
  describes what is heard, record it at once and in full: the verbatim text
  and its fields (is there a voice, what leaks, who is better, the class), as
  labels for the dataset.
- **Experiments live in the lab**, outside the product repositories, and
  every track or model there has its licence and source recorded; training
  uses only openly licensed material.
