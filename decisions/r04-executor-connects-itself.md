# R-4. The executor is a hidden page that connects to the host itself

**Decided** 2026-09-13; the hidden page on every platform since 2026-09-20.

## Decision

The executor, the web page that runs the models, connects to the Rust host by
itself and takes its work from it. The application creates the page and
nobody else does: on every platform it is a hidden WebView of the app, and a
desktop server started on its own opens it in a headless browser. No page
relays the work between them, and no server is started for one step.

## Why

While the interface owned the executor, reloading the interface dropped the
running step and paid for loading its model again. One kind of executor on
every platform also leaves one behavior to test.

## Where it applies

- The host holds one executor and opens a session per step:
  [musetric/musetric#859](https://github.com/musetric/musetric/pull/859),
  [#860](https://github.com/musetric/musetric/pull/860).
- A hidden WebView of the app on every platform:
  [#926](https://github.com/musetric/musetric/pull/926), with
  `ExecutorViewPlugin` in `packages/app`.
