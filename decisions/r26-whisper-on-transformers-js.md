# R-26. Transcription stays on transformers.js

**Decided** 2026-09-20.

## Decision

Transcription keeps `@huggingface/transformers` (transformers.js) on top of
onnxruntime-web. It is not rewritten onto onnxruntime-web directly, as the
other models are, neither now nor as a plan.

## Why

The library holds the tokenizer, the log-mel, the generation loop with the
merged decoder and the word times from the alignment heads: the code that
reached today's quality. A rewrite would put that quality at stake, and the
corpus metric cannot tell a regression smaller than its noise, so one could
pass unseen.

The price is accepted knowingly: the library's layout of the model cache,
reaching into its internals, intercepting its session runs for the pacer of
[R-24](r24-own-webgpu-device.md), and a pinned version of the library.

## Where it applies

- `packages/ai/src/runtime/whisper/whisperRuntime.ts`; the version is pinned
  in the catalog of musetric's `.yarnrc.yml`.
