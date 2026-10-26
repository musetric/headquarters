# The release run

How a release of the app is checked before it is published. The installed
app is checked at a release, not on pull requests
([R-12](../decisions/r12-app-checked-at-release.md)); the run of every release
follows this page, and the first is
[musetric/musetric#1100](https://github.com/musetric/musetric/issues/1100).

## Four checks, none replacing another

- **Contracts and durability**: files, the cursors of processing, the
  database, cancelling, recordings.
- **Numerical correctness**: the same inputs and a clear reference.
- **The user's way**: import, processing, playback, recording, retry.
- **The platform**: the installed build, its lifecycle, memory, the GPU, the
  interface and heat.

Passing one says nothing of the others. Small permanent checks guard one
invariant each; a large comparison harness does not come back.

## The passport of a run

Every run records the commits of the app and of the lab and whether they are
a clean `main`, the build profile, the revision of every model, the
onnxruntime version and its options, the system, the WebView, the GPU and its
driver, and the material with the hash of its bytes. A change of code or of a
model during the run starts a new passport.

## Order

- A short piece first; a full song once the short run's results have the
  right structure.
- On a phone, a short run and one full run, apart, with cooling between them;
  devices are not loaded at the same time, and the thermal gate is in
  [devices.md](../environment/devices.md).
- Closing, killing and resuming are run on 60 to 90 s of material: ten
  seconds make two separation units and one checkpoint at the end, so nothing
  is left to resume from.
- Synthetic material checks the transport, not the models.

## What a result must hold

- For every step: its status, phase, the units executed, the cursor saved,
  the wall-clock time and the error.
- Strict invariants: finite numbers, the right shapes, the exact length,
  times within range, and no partial result under `done`.
- Comparisons follow [evidence.md](evidence.md): the tolerance is set per
  output before the run; musical results are compared with a reference, and
  a tempo is never corrected by a multiplier to reach an expected number.
- The interface: the frame gaps and the input delay during every step,
  against a limit fixed before the verdict; without that limit the interface
  gets no final pass.

## Failures on purpose

An upload lost at different offsets, a crash between two writes, a lost
answer to an accepted unit, a late write of a cancelled attempt, a refusal of
the disk, publishing against cleanup, a lost recording file, a second owner of
the storage, a changed model of the same shape: each is reproduced by a small
deterministic check with barriers and temporary data, not by waiting for
chance. The death of the app and the death of its executor are two
experiments: killing the app checks the first; in the second the host stays
alive and only the executor dies.

## Not fooled by the run

- **A step's phase does not prove work.** Before calling a step slow or
  stuck, read the CPU use of the host and of the executor over 20 s; zero on
  both is a stopped step.
- **A live executor is not live work.** An executor that answers pings may
  hold a failed job; look inside the executor's document.
- **A reload is proven by a new document**, its `performance.timeOrigin`
  before and after, not by a key that was sent.
- **A second launch while the first process lives does nothing**: the app
  runs as a single instance and hands it to the first process. Confirm the
  first has exited.

## The result

Every row is pass, fail, not run or blocked, with the reason, a link to its
artifacts and the passport. A platform is accepted by a run of its installed
build, not by having a build target. Large audio and tensor data stay out of
the product repositories.
