# R-38. The export is the mix, key and tempo you hear

**Decided** 2026-10-16.

## Decision

An exported file carries everything the user hears: the mix, the key and the
tempo, which can be changed in the export the same way as in the player. The
host stretches the audio with its own Rust port of Signalsmith Stretch, not
with the C++ library through a binding.

## Why

A file must sound like the session it comes from. The port keeps the host
free of unsafe code and of a C++ toolchain on every target.

## Where it applies

- [musetric/musetric#1053](https://github.com/musetric/musetric/pull/1053) and
  `packages/server/crates/stretch`.
