# Experiments

How research and training are run. What the environment allows is in
[resources.md](resources.md).

- **Nothing is tried a third time without a new reason.** Before proposing a
  speed or quality idea, search the epic's list of what was tried, the
  issues and the pull requests (`gh issue list --search`,
  `gh pr list --search`). An idea that already failed is proposed again only
  with what has changed since, named.
- **The task sets the size of a run**: how long a training lasts, how many
  runs and on what data. When the task does not say, ask; when a bigger run
  looks worth it, propose it in words and wait.
- **A long run starts only after its load is proven efficient** on the
  hardware it will use: utilization and power near what the hardware can
  sustain, the time per step explained. Short configurations are benchmarked
  first; a run that underloads its hardware is stopped and fixed.
- **A training saves its weights every few minutes**, and a separate process
  scores them, so a run stopped or starved of memory between two evaluations
  loses nothing.
- **A recipe stops at its plateau.** Once the learning rate has reached its
  minimum and two consecutive snapshots score the same against true
  references, more hours go into another recipe or another shape, not into
  the same one.
- **Listening verdicts are data.** Whenever the owner or another listener
  describes what is heard, record it at once and in full: the verbatim text
  and its fields (is there a voice, what leaks, who is better, the class), as
  labels for the dataset.
- **Experiments live outside the repositories**, in a private experiments
  folder of the machine that runs them: their data, runs and models never go
  into a repository, `musetric/lab` included, which keeps only the code an
  experiment turns into. Every track or model there has its licence and source
  recorded; training uses only openly licensed material.
