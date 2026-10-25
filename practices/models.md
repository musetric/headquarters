# Models

How the product's neural networks are chosen, replaced and published.

## Choosing and replacing a model

- **Licence first, checked on the weights.** Before a model is chosen, its
  provenance is checked against candidate parents (per-tensor cosine of the
  weights), not taken from the label on its card: a permissive label on a
  fine-tune does not grant the rights of its parent.
- **A replacement must not lose quality.** A faster model replaces the
  current one only when both checks pass: it is not worse by ear, and its
  accuracy against real references is close to the current one's. For vocal
  separation that is the vocals SDR on the MUSDB18-HQ test set within 1 dB.
  Speed targets are ideals, approached model by model with a measurement
  each; a faster but worse model is not shipped to release sooner.
- **The owner's ear decides.** Metrics find the places to listen to; they
  are not the verdict. Differences are shown as A/B excerpts with timestamps,
  and fullness of the vocals weighs heavily.
- **One graph for every device.** A model ships as exactly one file for all
  devices; a defect or a speed gap of one GPU is not solved with a second
  graph chosen by adapter. A device-specific runtime option in code is a
  separate question for the owner.

## Repositories on Hugging Face

- **Named by source and architecture, not by purpose**:
  `musetric/<author>-<architecture>-<model>-onnx`, with the author whenever
  another model shares the name. One model per repository; a different model
  goes to a new repository, and the old one stays for the builds that pin it.
- **No version number in our file names**: `duality_core_t1100.onnx`, not
  `duality_v1_core_t1100.onnx`; an upstream file name is quoted as it is.
- **A new repository's history starts with the owner's single root commit**,
  not the commit Hugging Face generates.
- **Published through git** from the clones in the workspace's `models/`:
  fetch, put the staged files in place, commit, push, then compare the
  served size and hash of each file with the local ones. Only with the
  owner's go.

## Pins

- **A pin in `packages/server/src/analysis/models.rs` is always the head of
  the model repository's `main`.** Any later commit, even a card-only fix,
  moves the pin too, so card fixes go into the model's commit before it is
  pinned. A pin change of Whisper downloads all of it again, about 780 MB,
  because its cache is kept per revision.
