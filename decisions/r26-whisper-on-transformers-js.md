# R-26. Transcription stays on transformers.js

**Decided** 2026-09-20.

## Decision

Transcription keeps `@huggingface/transformers` (transformers.js) on top of
onnxruntime-web. It is not rewritten onto onnxruntime-web directly, as the
other models are, neither now nor as a plan.

## Why

The library holds the code that reached today's quality, from the tokenizer
to the word times, and a rewrite could lose some of it below what the corpus
metric can tell. Its price is accepted: the library's cache layout, reaching
into its internals for the pacer of [R-24](r24-own-webgpu-device.md), and a
pinned version.

## Where it applies

- `packages/ai/src/runtime/whisper/whisperRuntime.ts`; the version is pinned
  in the catalog of musetric's `.yarnrc.yml`.
