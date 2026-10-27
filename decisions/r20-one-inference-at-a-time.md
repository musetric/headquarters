# R-20. One inference at a time

**Decided** 2026-09-14; a load beside a run allowed 2026-10-27.

## Decision

Exactly one neural network runs at any moment. One project is processed, one
step of it, one model of that step, and one run of that model at a time. Two
networks never run together: not two models, not two runs of one model, not
a run on the GPU next to one on the CPU.

Loading a model is not a run of it. The files of the next model may be
fetched and its session created while another model computes; it starts
computing only when that run has ended.

## Why

Processing must not overload the user's hardware: the phone or the computer
stays usable while it works.

## Where it applies

- The Web Lock `musetric-executor` of
  `packages/ai/src/service/browserExecutor.ts`:
  [musetric/musetric#872](https://github.com/musetric/musetric/pull/872).
