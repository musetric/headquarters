# R-34. A song keeps several recordings, one of them active

**Decided** 2026-10-08.

## Decision

A song can keep several named recordings, each with its own undo and redo.
Exactly one of them is active: it plays, it is shown, and new takes go into
it. A recording can be deleted, but never the last one.

## Why

Parts, tempos and tries are practised separately, without one overwriting
another.

## Where it applies

- [musetric/musetric#1032](https://github.com/musetric/musetric/pull/1032).
