# One environment everywhere

A developer's machine, CI, the release builds and the product's own runtime
aim at the same environment, so that nothing works in one of them and breaks
in another.

- **The same tools at the same versions.** Each tool has one pin, in the
  repository that uses it: `.node-version`, `packageManager`,
  `rust-toolchain.toml`, a lockfile, or the version a CI workflow installs.
  Local setup, CI and the release builds read that one pin; a version
  written in two places is a drift waiting to happen.
- **Installed the same way.** A tool that CI installs as a standalone binary
  is a standalone binary on a developer's machine too, not a package
  manager's look-alike; a tool that comes from the lockfile is used from the
  lockfile everywhere.
- **A tool shared by repositories is written once.** It lives in musetric and
  is published to npm as a `@musetric/` package; the other repositories take
  it as a dependency at a pinned version. A script copied into a second
  repository drifts from the first.
- **Run the same way.** CI runs the repository's own scripts, or the exact
  commands they hold, so that a local run and a CI run are one command.
- **Checked against the pins.** `scripts/doctor.mjs` of headquarters reads the
  pins from the repositories and reports where a machine differs.
- **A difference that cannot be removed is named and covered.** CI has no GPU
  and no phones, and the product runs on its users' devices and browsers:
  what only those environments can show is checked there, by a script run by
  hand at the moments its protocol names.
