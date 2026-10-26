# Decisions

The decisions of the owner that are in force: what was decided, when and why,
and where it applies. A decision is a requirement, not a description of the
code. The code follows it, and a change that would break it starts with a new
decision, not with the code.

## How a record is kept

- **One record per decision**, `rNN-subject.md`, with the number the owner
  gave it. R-1 to R-32 were made before this folder existed; the ones no
  longer in force are not kept.
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
| [R-8](r08-models-run-in-the-page.md) | Models run in the web page, never natively |
| [R-9](r09-no-cpu-fallback.md) | A GPU defect is fixed on the GPU, not by a CPU fallback |
| [R-20](r20-one-inference-at-a-time.md) | One inference at a time |
| [R-24](r24-own-webgpu-device.md) | The product owns its WebGPU device and paces its queue |
| [R-26](r26-whisper-on-transformers-js.md) | Transcription stays on transformers.js |

## Decisions that became rules

| Decision | Where it lives |
| --- | --- |
| R-15: no compatibility kept for an internal protocol before the release | musetric's `AGENTS.md` § Contracts |
| R-19: no patch of a dependency | [practices/code.md](../practices/code.md) |
| R-23: no real material in the implementation | [practices/public-texts.md](../practices/public-texts.md), musetric's `AGENTS.md` § Test Material |
| R-29: model repositories are named by source and architecture | [practices/models.md](../practices/models.md) |
| R-30: the product is free forever, and its members earn by their expertise | [charter.md](../charter.md) |
