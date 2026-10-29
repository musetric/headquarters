# R-4. The executor is a hidden page that connects to the host itself

**Decided** 2026-09-13; the hidden page on every platform since 2026-09-20.

## Decision

The executor, the web page that runs the models, connects to the Rust host by
itself and takes its work from it. Only the application creates the page: on
every platform it is a hidden WebView of the app, and a desktop server started
on its own opens it in a headless browser.

## Why

A reload of the interface must not drop the running step or load its model
again. It applies [Nothing of the user's is lost](../principles.md) and
[One way, the same everywhere](../principles.md).

## Where it applies

- [musetric/musetric#859](https://github.com/musetric/musetric/pull/859),
  [#860](https://github.com/musetric/musetric/pull/860) and
  [#926](https://github.com/musetric/musetric/pull/926).
- `ExecutorViewPlugin` in `packages/app`.
