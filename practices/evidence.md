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
- **A median does not cancel the tails.** A change that improves the median
  can still break a few cases badly; the worst cases are reported next to it.
- **A partial gain is called partial.** A gain bought with quality,
  responsiveness or memory says what it cost.
- **Lost artifacts make an experiment unrepeatable**, not confirmed: its
  result stays a journal entry.
