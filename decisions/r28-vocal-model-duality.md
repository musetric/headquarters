# R-28. The vocal model is Duality, with an 11-second window

**Decided** 2026-09-25.

## Decision

Vocals are separated from the instrumental by Mel-Band RoFormer Duality of
Aname (`Aname-Tommy/Mel-Band-Roformer_Duality`, Apache-2.0), with a window of
1100 frames, about 11 seconds.

## Why

The previous model's weights had no clean licence, and of the models that have
one, Duality sounded clearly best to the owner on the same tracks.

## Where it applies

- [musetric/musetric#938](https://github.com/musetric/musetric/pull/938) and
  the model repository `musetric/aname-mel-band-roformer-duality-onnx`.
- The licence is checked on the weights before a model is chosen:
  [practices/models.md](../practices/models.md).
