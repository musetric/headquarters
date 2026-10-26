# R-14. Audio is decoded and encoded without ffmpeg

**Decided** 2026-08.

## Decision

The host decodes and encodes audio with Rust crates and its own code:
Symphonia decodes, flacenc writes FLAC, rusty_aac writes AAC, and the product
writes fragmented MP4 itself. ffmpeg is neither shipped nor called.

## Why

One implementation of the media code on every platform, without an external
program to find, ship or keep compatible per platform.

## Where it applies

- `packages/server/crates/media`.
