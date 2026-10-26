# R-9. A GPU defect is fixed on the GPU, not by a CPU fallback

**Decided** 2026-09-12.

## Decision

When a model computes wrongly or fails on a GPU, its graph is rewritten so
that it computes correctly there. The product does not ship a CPU or wasm
fallback to get around a GPU defect.

## Why

A fallback hides the defect instead of fixing it, and it runs several times
slower.

## Exception

S-KEY, the small key model, runs on the wasm provider of onnxruntime-web. It
did so before this decision and is the only model that does
(`packages/ai/src/runtime/key/skeyRuntime.ts`).

## Where it applies

- One graph for every device: [practices/models.md](../practices/models.md).
- The defects of GPU platforms the graphs work around:
  [musetric/musetric#975](https://github.com/musetric/musetric/issues/975).
