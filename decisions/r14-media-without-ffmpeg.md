# R-14. Audio is decoded and encoded without ffmpeg

**Decided** 2026-08.

## Decision

The host decodes and encodes audio with Rust crates and its own code. ffmpeg
is neither shipped nor called.

## Why

It applies [One way, the same everywhere](../principles.md) to media.

## Where it applies

- `packages/server/crates/media`.
