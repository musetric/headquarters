# R-24. The product owns its WebGPU device and paces its queue

**Decided** 2026-09-17; replaces R-21, which left the freezes of the GPU queue
unsolved rather than change an object that onnxruntime-web owns.

## Decision

The executor creates the WebGPU device itself and gives it to onnxruntime-web,
and the product's pacer limits the work queued on that device, without
patching onnxruntime-web ([practices/code.md](../practices/code.md)).

## Why

A long queue of GPU work froze the phone, and the product can pace that queue
only on a device it owns
([musetric/musetric#894](https://github.com/musetric/musetric/issues/894)).

## Where it applies

- `packages/ai/src/runtime/webgpuDevice.ts` and
  `packages/ai/src/runtime/gpuPacer.ts`.
- [musetric/musetric#897](https://github.com/musetric/musetric/pull/897) and
  [#896](https://github.com/musetric/musetric/pull/896).
