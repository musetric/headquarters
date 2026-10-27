# R-22. A wrong result goes first

**Decided** 2026-09-15; held as a principle since 2026-10-26.

## Decision

A known error of computation in inference, a result that differs from its
reference, is fixed before work on speed, responsiveness or features.

## Why

A wrong result is worse than a slow one. The user sees that a result is slow,
but not that it is wrong.

## Where it applies

- The issues labelled `correctness` in
  [musetric/musetric](https://github.com/musetric/musetric/issues?q=label%3Acorrectness).
- The parity check, musetric's `measure:parity`.
