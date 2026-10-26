# Decisions

The decisions of the owner that are in force: what was decided, when and why,
and where it applies. A decision is a requirement, not a description of the
code. The code follows it, and a change that would break it starts with a new
decision, not with the code.

## How a record is kept

- **One record per decision**, `rNN-subject.md`, with the number the owner
  gave it. R-1 to R-32 were made before this folder existed; the ones no
  longer in force are not kept. A decision the owner made without a number
  gets the next free one.
- **A record says** the decision, its date, the reason, and where it applies:
  the code, a practice, the issues that hold the details.
- **A replaced decision is not edited.** The new record says what it
  replaces, and the old record is deleted in the same change.
- **A decision that became a rule** lives in the rule. Its record is the line
  in the table below.

## In force

| Record | Decision |
| --- | --- |
| [R-3](r03-phones-process-on-screen.md) | Phones process only while the app is on screen |
| [R-4](r04-executor-connects-itself.md) | The executor is a hidden page that connects to the host itself |
| [R-6](r06-linux-not-supported-yet.md) | Linux is not supported yet |
| [R-8](r08-models-run-in-the-page.md) | Models run in the web page, never natively |
| [R-9](r09-no-cpu-fallback.md) | A GPU defect is fixed on the GPU, not by a CPU fallback |
| [R-10](r10-host-owns-processing.md) | The host owns the processing |
| [R-12](r12-app-checked-at-release.md) | The installed app is checked at a release, not on pull requests |
| [R-14](r14-media-without-ffmpeg.md) | Audio is decoded and encoded without ffmpeg |
| [R-18](r18-unreadable-format-refused.md) | A format the decoder cannot read is refused with a clear message |
| [R-20](r20-one-inference-at-a-time.md) | One inference at a time |
| [R-22](r22-wrong-result-first.md) | A wrong result goes first |
| [R-24](r24-own-webgpu-device.md) | The product owns its WebGPU device and paces its queue |
| [R-25](r25-separation-in-one-graph.md) | The separation core runs as one graph, not in stages |
| [R-26](r26-whisper-on-transformers-js.md) | Transcription stays on transformers.js |
| [R-28](r28-vocal-model-duality.md) | The vocal model is Duality, with an 11-second window |
| [R-33](r33-one-migration-until-users.md) | One database migration until the app has users |

## Decisions that became rules

| Decision | Where it lives |
| --- | --- |
| R-15: no compatibility kept for an internal protocol before the release | musetric's `AGENTS.md` § Contracts |
| R-17: a silent stem goes to the absolute gate of BS.1770 instead of failing | the test `puts_silence_on_the_absolute_gate_instead_of_failing` of musetric's `packages/server/crates/media/src/loudness.rs` |
| R-19: no patch of a dependency | [practices/code.md](../practices/code.md) |
| R-23: no real material in the implementation | [practices/public-texts.md](../practices/public-texts.md), musetric's `AGENTS.md` § Test Material |
| R-29: model repositories are named by source and architecture | [practices/models.md](../practices/models.md) |
| R-30: the product is free forever, and its members earn by their expertise | [charter.md](../charter.md) |
