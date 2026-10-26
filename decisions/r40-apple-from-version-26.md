# R-40. Apple systems are supported from version 26

**Decided** 2026-10-27.

## Decision

The app supports macOS and iOS from version 26 on, and its builds refuse to
install on an older system.

## Why

The models run on WebGPU in the app's WebView
([R-8](r08-models-run-in-the-page.md)), and WKWebView has WebGPU from
version 26. On an older system the app would install and then fail to
process a song.

## Where it applies

- `minimumSystemVersion` in musetric's
  `packages/app/src-tauri/tauri.macos.conf.json` and `tauri.ios.conf.json`.
