# R-3. Phones process only while the app is on screen

**Decided** 2026-09-13.

## Decision

On Android and iOS the app processes a song only while it is on screen. The
screen stays on while processing runs, and there is no background
processing: no foreground service, no background task.

## Why

Android may end an app that has left the screen, and iOS gives no background
time for work of this kind, so processing on screen is the one behavior both
phones allow ([One way, the same everywhere](../principles.md)).

## Where it applies

- `packages/frontend/src/app/screenWakeLock.ts`.
- [musetric/musetric#862](https://github.com/musetric/musetric/pull/862).
