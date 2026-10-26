# R-24. The product owns its WebGPU device and paces its queue

**Decided** 2026-09-17; replaces R-21, which left the freezes of the GPU queue
unsolved rather than change an object that onnxruntime-web owns.

## Decision

The executor creates the WebGPU device itself and gives it to onnxruntime-web
through the provider's options. The product's pacer then limits the work
queued on its own device, without patching onnxruntime-web
([practices/code.md](../practices/code.md)).

## Why

A long queue of GPU work froze the phone: the system's own drawing waited
seconds for the GPU. On its own device the product paces its own object, and
on the phones the wait fell from seconds to a fraction of a second, at the
cost of 3 to 14 percent of the time of a chunk.

## Where it applies

- `packages/ai/src/runtime/webgpuDevice.ts` and
  `packages/ai/src/runtime/gpuPacer.ts`.
- [musetric/musetric#897](https://github.com/musetric/musetric/pull/897),
  [#896](https://github.com/musetric/musetric/pull/896), and the measurements
  in [#894](https://github.com/musetric/musetric/issues/894).
