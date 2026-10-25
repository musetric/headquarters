# The tracker

How issues of `musetric/musetric` are kept. Every text here is public, so
[public-texts.md](public-texts.md) applies, and the owner sees each issue and
comment before it is posted.

## Forms, types and labels

- **Every issue uses a form** from `.github/ISSUE_TEMPLATE` of
  `musetric/musetric`: blank issues are disabled, and a workflow flags an
  issue without a type. Read the form on `origin/main` before writing; an
  issue created through the API follows its form's sections as `### `
  headings, in the form's order, and gets its type on creation. The forms
  are general: any type may be about anything, and a field's description
  never narrows it to one topic.
- **The type is the form.** The organization's types are Epic, History,
  Hypotheses, Improvement, Feature and Bug; one chosen change is an
  Improvement, several candidates are Hypotheses, and a problem with a method
  and a state but no proposal is Hypotheses too.
- **A label is what the issue is about**: exactly one essence,
  `correctness` or `performance`, and at most one area, such as
  `separation`, `transcription`, `rhythm`, `chords`, `fft` or `spectrogram`.
  An epic has the essence only. Areas follow the processing steps, not the
  models, and are named like the commit scopes; a new area is created with its
  first issue. Platforms and GPUs are never labels.
- **Titles.** An epic states its goal with "must". A bug or a set of
  hypotheses states the symptom, not its cause. A History names what it
  tracks, without "history" in the title, since the type says it. A title
  names the step, not the model, where the model may change.

## What goes where

- **The first measurement is in the body.** A History's Start and the
  Baseline of Hypotheses or of an Improvement are measured before the issue
  is created; nothing that belongs to an issue's creation is posted as a
  comment.
- **A History gets one comment per change that moves what it tracks**, posted
  when the pull request opens: what changed, where it was measured (the
  commit hash), the issue's full tables, then the comparison with the base in
  prose. One comment holds one pull request's values in one table; an older
  value is fixed by editing the comment that owns it.
- **A fix that changes neither speed nor the model's output gets no new
  measurement session and no History comment**: the numbers that found the
  defect and an unchanged output are enough.
- **One hypothesis is one comment** in the Hypotheses issue,
  `**Hn. Name** — status`, then Idea, Check, Found and Merge, edited in place
  as it moves. The statuses are the form's words only. Numbering is local to
  the issue; elsewhere a hypothesis is `#952 H3`.
- **Every issue about the speed, freezes or memory of inference is a
  sub-issue of #946.**

## Measurements

- **The realtime factor is the first row** of every measurement table, per
  track, with the overlap counted; every text states the window, the step and
  the overlap.
- **One glossary per study.** Variant names, metrics and conditions are fixed
  when a study starts and kept to its end; a new variant gets a name in the
  same scheme. Every table states its conditions, and two conditions are
  never mixed in one comparison.
- **Every list of changes names the model each one affects**, and for shared
  code how it affects them.
