# Environment and resources

An agent works on whatever environment it has right now: a laptop, a
workstation, a server, a cloud machine, with or without phones attached.
None of it is assumed; every task starts from what is actually there, and
every resource is shared with other people and agents.

## Know the environment

- **Find out before the task, do not assume.** What the machine has: the
  system, the GPUs and their memory, the RAM and the disk, the devices
  attached (phones, tablets), the accounts and the quotas. A document, a
  memory or a previous session describes a past state; hardware is replaced,
  devices are unplugged, quotas run out.
- **Match the task's requirements to the environment at once.** The
  requirements come from the task or its procedure: a check on Android and on
  an iPhone, a GPU of a given class for a training, a quota for a cloud run.
  When something required is missing, say so before starting, name what can
  be done with what is there, and wait. A laptop GPU is enough to build the
  product and work on its interface; it is not enough to train a speech
  model, and a task that needs that stops at the first check, not after hours
  of runs that cannot succeed.

## Use what is there, in proportion

- **Scale the work to the resources.** A small model on a large GPU may run
  with large batches and several runs at once; a small GPU runs one model at
  a time. Either way the run stays inside a budget measured in its first
  minutes: memory, clocks, temperature and throttling are watched while it
  runs, and the run shrinks or stops before it overflows memory or throttles
  the device.
- **Memory is the first thing to watch** on the machine where the work runs:
  the RAM, the GPU memory, and on a phone the memory of the page's process.
  Measure a task's peak in its first minutes, keep room for the system and for
  the work of others, and shrink a run before it reaches the limit, not after
  it fails.
- **A shortfall of GPU memory must fail, not slow down.** Some drivers move
  what does not fit into shared system memory without a word, and the run
  goes on many times slower. Set the driver to fail instead, and treat a
  sudden slowdown as a memory problem until it is shown to be something else.
- **A phone runs one model inference at a time.** Mobile GPUs lose the device
  under two; this changes only if the product itself requires it.
- **A measured device runs nothing else.** Timing runs of an old and a new
  variant alternate in one session (A-B-A-B), so background load hits both.
  A measurement's protocol, its time budget included, is in the issue that
  defines it.
- **Paid or quota-limited compute** (rented machines, cloud notebooks) is used
  only when the task or the person directing the work allows that run; a
  permission does not carry over to the next run.

## Share with others

- **Never assume a resource is free.** Check right before using it and keep
  checking: an idle GPU or phone may be the gap between two runs of another
  agent, and the start of a run does not prove the next minute is free.
- **A busy resource is normal.** Someone else is using it. Never stop, kill or
  preempt a process this agent did not start. When the resources are not
  enough or are taken, return to the person directing the work with what
  occupies them, and wait.
- **Do not hold more than the task needs, or longer.** One GPU must not block
  every other agent: release models and memory as soon as a run ends, keep
  runs bounded, and do not keep a device occupied while idle. A run that
  starves others or throttles the device is as much a failure as one that
  crashes.
- **Confirm the end, do not guess it.** The next run starts after the previous
  one's completion is confirmed by its notification or its output; a process
  list is no proof, since launchers run the model in a child process. A long
  run confirms which execution provider actually came up, because a silent
  fallback to the CPU changes the whole memory picture.
- **A stopped task may leave its processes running.** After a background
  task is stopped, interrupted or refused while it drives a device or plays
  sound, list the exact leaf processes it started and end those; never match
  by a pattern that can also hit a wrapper's command line, which carries the
  whole command of the task.

## Where the work writes

- **What the work writes on a machine stays in the workspace.** Every file a
  task creates or changes lives under the workspace root, the folder the
  repositories are cloned into: in a repository when it belongs there, and
  otherwise in a folder of its own in the workspace root that no repository
  tracks, such as `tmp/<work>/`. That covers drafts, plans, notes and
  journals, experiment data, labels and runs, downloaded datasets and models,
  and the scripts and logs of a run. Nothing of the work goes to the root of a
  drive, the home folder or another place of the machine, where nobody looks
  for it. A session's own scratch space dies with the session, so what the
  work will need again goes into the workspace.
- **The environment is not the work.** Toolchains and runtimes such as
  Python, uv, Node.js and Yarn, package caches such as those of npm and pip,
  drivers, and the settings of the system and of the agents live wherever the
  machine's setup puts them; headquarters does not regulate them.
- **The rule is about files, not about where work happens.** A tool or a
  service is used the way it is meant to be: a design in Claude Design, a run
  on a rented machine, a model on Hugging Face and an issue on GitHub stay
  where they belong, and a tool's own cache or temporary files are the tool's
  business. Only when the work itself writes a file to the machine does that
  file go into the workspace.

## Data on the devices

- **A probe never writes into a user's data.** A probe that records on a
  device records into a temporary recording and removes it afterwards; before
  touching the storage, it lists what is there, so that a slip can be undone.
- **Timings that depend on a device's audio path are taken only after the
  app's calibration on that setup**; an uncalibrated delay means nothing.
