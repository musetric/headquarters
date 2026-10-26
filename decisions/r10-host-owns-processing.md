# R-10. The host owns the processing

**Decided** 2026-09-07.

## Decision

- The Rust host owns the loop over the units of a step: it plans them, hands
  the executor one unit at a time and keeps what comes back.
- Data moves over HTTP; commands and progress move over a WebSocket.
- A step stores a checkpoint every few units and resumes from it after any
  interruption.
- Progress counts only the work that produces results.
- Separation is two steps, vocals from the instrumental and then lead from
  backing; the vocal stem between them stays internal.

## Why

Processing must survive a reload, a crash or a closed app without losing
finished work, and its progress must not lie. The host is the one part that
outlives all of them.

## Where it applies

- `packages/server`: its readme § Processing steps, and the units and
  checkpoints of `src/analysis/stage_attempt.rs`.
