# R-3. Phones process only while the app is on screen

**Decided** 2026-09-13.

## Decision

On Android and iOS the app processes a song only while it is on screen. The
screen stays on while processing runs, and there is no background
processing: no foreground service, no background task.

## Why

Android ended the app's process a few minutes after it left the screen, and
iOS gives no background time for work of this kind. One behavior on both
phones is simpler and more honest than two partial ones.

## Where it applies

- The screen is kept on by the frontend's wake lock,
  `packages/frontend/src/app/screenWakeLock.ts`.
- Processing stops when the app leaves the screen since
  [musetric/musetric#862](https://github.com/musetric/musetric/pull/862),
  which also removed the Android foreground service.
