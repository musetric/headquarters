# Models

How the product's neural networks are chosen, replaced and published.

## Choosing and replacing a model

- **Licence first, checked on the weights.** Before a model is chosen, its
  provenance is checked against candidate parents (per-tensor cosine of the
  weights), not taken from the label on its card: a permissive label on a
  fine-tune does not grant the rights of its parent.
- **The licence of weights comes from what they were made of**: the weights
  they start from and the data they learn from, not the code that trained
  them. A student distilled from a model keeps that model's licence, learns
  only from openly licensed audio, and lists the tracks it learned from.
- **Shape first, training second.** A new model's shape is exported and
  timed on the devices before it is trained; only a shape that fits the time
  and the memory budget is trained.
- **A replacement must not lose quality.** A faster model replaces the
  current one only when both checks pass: it is not worse by ear, and its
  accuracy against real references is close to the current one's. For vocal
  separation that is the vocals SDR on the MUSDB18-HQ test set within 1 dB;
  for transcription, the word error rate and the share of lost lines on the
  open set of songs with checked lyrics of
  [musetric/musetric#1045](https://github.com/musetric/musetric/pull/1045).
  Speed targets are ideals, approached model by model with a measurement
  each; a faster but worse model is not shipped to release sooner.
- **The owner's ear decides.** Metrics find the places to listen to; they
  are not the verdict. Differences are shown as A/B excerpts with timestamps,
  and fullness of the vocals weighs heavily.
- **Candidates are ranked on held-out data.** A score computed on training
  tracks, such as a table scored on the train split of MUSDB18, ranks
  nothing; candidates are compared on a held-out test set.
- **The graph is the network only.** Signal processing the runtime already
  has, such as the STFT, the CQT or a mel filterbank, runs in the runtime
  from a shipped plan or filterbank and is not baked into the model's graph.

## Repositories on Hugging Face

- **Named by source and architecture, not by purpose**:
  `musetric/<author>-<architecture>-<model>-onnx`, with the author whenever
  another model shares the name. One model per repository; a different model
  goes to a new repository, and the old one stays for the builds that pin it.
- **No version number in our file names**: `duality_core_t1100.onnx`, not
  `duality_v1_core_t1100.onnx`; an upstream file name is quoted as it is.
- **A new repository's history starts with the owner's single root commit**,
  not the commit Hugging Face generates.
- **Text files are served with LF line endings**, so the pinned SHA-256 of a
  JSON file is that of its LF form; a checkout that converts line endings
  hashes another file.
- **A published file can become undownloadable weeks later** when its LFS
  blob was never moved to Xet storage: the revision looks alive, and the CDN
  answers 403. The tree API of the revision shows it, since such a file has
  no `xetHash`; uploading the file again fixes it and moves the pin.
- **Published through git** from the clones in the workspace's `models/`:
  fetch, put the staged files in place, commit, push, then compare the
  served size and hash of each file with the local ones, hashing the
  downloaded file: for a small file the etag Hugging Face serves is its git
  blob hash, not its SHA-256. Only with the owner's go.

## Pins

- **A pin in `packages/server/src/analysis/models.rs` is always the head of
  the model repository's `main`.** Any later commit, even a card-only fix,
  moves the pin too, so card fixes go into the model's commit before it is
  pinned ([musetric/musetric#1117](https://github.com/musetric/musetric/pull/1117)).
