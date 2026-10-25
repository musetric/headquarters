# Runs on devices

How an agent runs models and measurements on the owner's computers and test
phones. The product's own rule, one inference at a time in a project, is a
product decision; this page is about the agents' runs.

## One model per device

- **One model in memory and running at a time on a device**, then the next,
  inside one script too: compute and save one model's outputs, release it,
  then load the next. Different devices may run at the same time, each with
  its own model; a computer that only serves pages to the phones does not
  count as running a model.
- **Several models on one device only as a planned run**, stated to the owner
  before it starts: a memory budget computed in advance (weights, optimizer,
  activations, runtime context, headroom), the real peak measured in the
  first minutes, clocks, temperature, power, throttling and memory logged
  during the run, and a stop or a smaller run on throttling or overflow.
- **Before every run**, the free memory and the GPU's load show the device
  idle; otherwise another process works, and the run waits for the owner's
  go. A long run confirms which execution provider actually came up: a silent
  fallback to the CPU changes the whole memory picture.
- **The next run starts only after the previous one's completion is
  confirmed** by its notification. A process list is no proof: launchers run
  the model in a child process.

## Other agents

- **While other sessions are active, ask before each device session.** An
  empty process list and an idle phone may be the gap between two runs of
  another agent, and two inferences on one device spoil both measurements.
  Meanwhile, only work that leaves the device alone: no GPU, no phones, no
  heavy builds that skew another agent's timings.

## Measurements

- **A measured device runs nothing else**: no training, no other GPU load.
  Before a timing run, a few samples of the GPU's load confirm it; if the owner
  runs a heavy application, ask to close it. Accuracy runs are not affected.
  Old and new alternate in one session (A-B-A-B), so background load hits
  both.
- **20 minutes per device for a whole measurement**, every load and pause
  included. On a slow device a load does less work (fewer runs, chunks or
  windows), while the number and the order of the loads stay; no waiting for
  a phone to cool down. The estimate is told to the owner before the start.
- **Recording latency and timing are measured and published only after the
  app's calibration on each setup**; an uncalibrated delay means nothing.
- **A probe that records on the owner's devices records into a temporary
  recording** and removes it afterwards; it never records into the active
  one. Before touching the storage, list the active recording's pieces and
  keep their blob ids, so that a slip can be undone.
