# R-25. The separation core runs as one graph, not in stages

**Decided** 2026-09-20.

## Decision

The vocal separation core runs as one graph. It is not cut into subgraphs
that run in stages.

## Why

The heavy projections split into rows when the core is exported keep the
phone responsive with an identical output, and the stages did not
([musetric/musetric#957](https://github.com/musetric/musetric/issues/957) H7).

## Where it applies

- [musetric/musetric#930](https://github.com/musetric/musetric/pull/930) and
  [musetric/lab#86](https://github.com/musetric/lab/pull/86).
- The export recipe of the core in musetric/lab, `scripts/onnx/roformer`.
