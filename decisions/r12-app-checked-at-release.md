# R-12. The installed app is checked at a release, not on pull requests

**Decided** 2026-08-05, confirmed 2026-09-07; restated 2026-10-26.

## Decision

Pull requests do not build the app, no automated test installs a build, and
CI carries neither a large acceptance harness nor a corpus of music. The
installed app is checked by a release run on every supported platform at each
release ([musetric/musetric#1100](https://github.com/musetric/musetric/issues/1100)),
and a check that needs a GPU or a phone is a script run by hand at the moments
its protocol names.

## Why

Building and installing the app for every platform on every pull request
costs more than it finds. What only an installed build shows is found by the
release run and by the scripts run on the devices.

## Where it applies

- `.github/workflows/appBuild.yml`.
- [practices/checks.md](../practices/checks.md) and
  [practices/release.md](../practices/release.md).
