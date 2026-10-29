# R-8. Models run in the web page, never natively

**Decided** 2026-09-07; confirmed 2026-10-26.

## Decision

Every model runs in the executor page, through onnxruntime-web and the
product's own WGSL. There is no native inference on any platform: no Metal,
Core ML, XNNPACK, QNN or native onnxruntime in the app's process.

## Why

It applies [One way, the same everywhere](../principles.md) to inference.

## Where it applies

- [environment/platforms.md](../environment/platforms.md) § Where the models
  run.
- H1 of [musetric/musetric#1088](https://github.com/musetric/musetric/issues/1088).
