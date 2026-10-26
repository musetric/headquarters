# R-6. Linux is not supported yet

**Decided** 2026-09-13; confirmed 2026-10-26.

## Decision

Linux is not a supported platform for now. The app is built for Linux, but it
is not offered or tested as a platform until its executor can run the models
there.

## Why

On Linux the app's WebView is WebKitGTK, which has no WebGPU the product can
rely on, and the models run on WebGPU in that page
([R-8](r08-models-run-in-the-page.md)). A desktop server can open its executor
in a headless Chrome or Edge, but the app itself cannot run its models.

## Where it applies

- [product.md](../product.md) names the supported platforms.
