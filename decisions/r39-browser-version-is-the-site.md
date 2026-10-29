# R-39. The browser version is the site, built on Musetric's libraries

**Decided** 2026-10-27.

## Decision

What a visitor can do in the browser, with nothing installed, is a feature
of the site, `musetric/landing`. Musetric's packages are published to npm as
libraries of algorithms and inference, without the DOM, and the site builds
its own pages on them. No Rust runs in the browser and nothing is computed
on a server: what the host does for a step and the site needs is done in
TypeScript in the package.

## Why

A visitor should be able to try Musetric before installing it, without a
server that receives the song. The analyses already run in a web page, so
libraries carry them to the site as well
([One way, the same everywhere](../principles.md)).

## Where it applies

- [musetric/musetric#1115](https://github.com/musetric/musetric/issues/1115),
  under the release epic
  [#1099](https://github.com/musetric/musetric/issues/1099).
