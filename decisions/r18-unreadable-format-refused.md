# R-18. A format the decoder cannot read is refused with a clear message

**Decided** 2026-09-07.

## Decision

The app accepts the formats its decoder reads
([R-14](r14-media-without-ffmpeg.md)) and no others. A file it cannot read is
refused with a message that says the format is not supported, not with a bare
error.

## Why

A second decoder for the rare formats would cost more than it brings, but a
user must still understand why a file is refused.

## Where it applies

- The import of `packages/server/src/routes/project.rs` and the decoder of
  `packages/server/crates/media/src/decode.rs`.
