# R-8. Models run in the web page, never natively

**Decided** 2026-09-07; confirmed 2026-10-26.

## Decision

Every model runs in the executor page, through onnxruntime-web and the
product's own WGSL. There is no native inference on any platform: no Metal,
Core ML, XNNPACK, QNN or native onnxruntime in the app's process.

## Why

A native path is a second implementation of the same math, with defects and a
parity of its own to keep. One implementation is the reason the processing
moved into the page.

The decision was confirmed when the memory limit of the page's process on the
iPhone made a native path the shortest way to fit the models there: the
models have to fit inside the page instead
([musetric/musetric#1088](https://github.com/musetric/musetric/issues/1088)).

## Where it applies

- [environment/platforms.md](../environment/platforms.md) § Where the models
  run.
- Hypothesis H1 of
  [musetric/musetric#1088](https://github.com/musetric/musetric/issues/1088),
  native inference in the app's process, is rejected by this decision.
