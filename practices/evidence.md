# Evidence

How a claim is proven: in an issue, a pull request, a measurement or a
decision. A wrong conclusion that looks proven costs more than an open
question.

- **Every claim says what kind it is**: found in the code (an execution path
  read), reproduced (an experiment with its input and result), from a journal
  (an earlier run, not repeated), a hypothesis (it needs an experiment that
  tells it apart), or a decision (a requirement of the owner). "Checked"
  without saying what was checked proves nothing.
- **Both sides of a comparison read the same bytes.** A comparison names its
  input by its hash, type, shape and layout; two runs on different inputs
  compare nothing.
- **A comparator is tested before it is trusted.** It must fail on negative
  controls: NaN, infinity, a wrong shape, a shortened output, a permutation
  and one changed element. Equal sums, minimums and maximums prove neither
  equality nor determinism.
- **The tolerance is set before the experiment**, per output and type, not
  chosen after seeing the result, and not one threshold for everything.
- **Prove the work ran before trusting a good result.** A run that silently
  stopped can look like a success: a frozen page reports smooth frames, and a
  check that saw no error saw nothing. Before and after, show that the
  computation was running.
- **A failed probe fails its run.** A probe whose model throws, or that never
  reports done, exits with an error; otherwise the wrapper around it counts it
  as a success.
- **Repeatability is checked on full outputs**, over warm runs in one session
  and over new sessions, not on a few numbers or on aggregates.
- **Equal on the CPU is not equal on the GPU.** A graph rewrite that matches
  the original on the CPU provider is checked again on each GPU provider and
  shape it will run with.
- **A minimal reproduction proves its kernel, not the model.** After a kernel
  is fixed for one shape, every model that uses it is checked again, and one
  defect found is not taken to explain every symptom seen at the same time.
- **Time around a GPU call is not its GPU time.** A kernel's time comes from
  GPU timestamps; the longest frame is not the longest submission, and a
  stable heap or no long tasks do not rule out a blocked thread.
- **A median does not cancel the tails.** A change that improves the median
  can still break a few cases badly; the worst cases are reported next to it.
- **A difference smaller than the noise is no difference.** The noise of a
  metric is measured, by a bootstrap over tracks or by varying the
  normalization, and a difference below it is reported as none.
- **A reference is checked before a score against it is chased.** Where
  independent runs agree against the reference, the reference is wrong, and a
  gain smaller than its own error rate may only fit its mistakes.
- **A gap is judged against the margin it can change.** A numeric gap between
  two implementations is compared with the margin of the decision it feeds,
  such as the gap between a classifier's first and second choice, not with
  zero.
- **Rebuild before blaming a change.** Before concluding that a change breaks
  the numbers, rebuild the unchanged artifact with the current toolchain: a
  loss the rebuild shows as well belongs to the toolchain.
- **Absence is a claim too.** A file, a script or a use said to be missing is
  confirmed with `git ls-files` or `git grep`, not with one search tool.
- **A partial gain is called partial.** A gain bought with quality,
  responsiveness or memory says what it cost.
- **Lost artifacts make an experiment unrepeatable**, not confirmed: its
  result stays a journal entry.
