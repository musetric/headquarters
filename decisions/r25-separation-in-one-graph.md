# R-25. The separation core runs as one graph, not in stages

**Decided** 2026-09-20.

## Decision

The vocal separation core runs as one graph. The staged path, the core cut
into many subgraphs so that the phone stays responsive between them, is not
shipped.

## Why

Splitting the heavy projections into rows when the core is exported bought
the responsiveness for about 2 percent of the time, with an output identical
to the bit. The stages left tails of seconds that the phone still froze for,
and they cost about 700 MB in the model's repository.

## Where it applies

- [musetric/musetric#930](https://github.com/musetric/musetric/pull/930) and
  [musetric/lab#86](https://github.com/musetric/lab/pull/86).
- The export recipe of the core in musetric/lab, `scripts/onnx/roformer`.
